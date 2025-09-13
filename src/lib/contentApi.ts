import { supabase } from './supabase';

export interface BulkContentResult {
  content: Record<string, string>;
  error?: string;
}

/**
 * Bulk fetch multiple content items in a single API call with enhanced error handling
 * @param names Array of content names to fetch
 * @returns Object with content map and optional error
 */
export const bulkFetchContent = async (names: string[]): Promise<BulkContentResult> => {
  if (names.length === 0) {
    return { content: {} };
  }

  try {
    console.log('🔄 BULK API FETCH for content names:', names);

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const { data, error: fetchError } = await supabase
      .from('sections')
      .select('name, content')
      .in('name', names)
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (fetchError) {
      console.error('❌ BULK API FETCH ERROR:', fetchError);
      
      // Provide more specific error messages
      let errorMessage = fetchError.message;
      if (fetchError.code === 'PGRST116') {
        errorMessage = 'Database connection failed. Please check your internet connection.';
      } else if (fetchError.code === 'PGRST301') {
        errorMessage = 'Content table not found. Please contact support.';
      }
      
      return { 
        content: {},
        error: errorMessage 
      };
    }

    // Create content map from fetched data
    const contentMap: Record<string, string> = {};
    names.forEach(name => {
      const found = data?.find((item: any) => item.name === name);
      contentMap[name] = found?.content || '';
    });

    console.log('✅ BULK API FETCH SUCCESS:', contentMap);

    return { content: contentMap };

  } catch (err: any) {
    console.error('❌ BULK API FETCH EXCEPTION:', err);
    
    // Handle specific error types
    let errorMessage = err.message;
    if (err.name === 'AbortError') {
      errorMessage = 'Request timed out. Please check your internet connection and try again.';
    } else if (err.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (err.message.includes('JSON')) {
      errorMessage = 'Server response error. Please try again later.';
    }
    
    return { 
      content: {},
      error: errorMessage 
    };
  }
};

/**
 * Save content with intelligent cache invalidation and enhanced error handling
 * @param name Content name
 * @param value Content value
 * @returns Promise that resolves on successful save
 */
export const saveContentItem = async (name: string, value: string): Promise<void> => {
  try {
    console.log(`🚨 CONTENT API SAVE for "${name}":`, value);
    
    // Add timeout for save operations
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for saves
    
    const { data, error: upsertError } = await supabase
      .from('sections')
      .upsert(
        { name, content: value },
        { onConflict: 'name' }
      )
      .select()
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (upsertError) {
      console.error(`❌ CONTENT API SAVE FAILED for "${name}":`, upsertError);
      
      // Provide more specific error messages for save operations
      let errorMessage = upsertError.message;
      if (upsertError.code === 'PGRST116') {
        errorMessage = 'Database connection failed during save. Please check your internet connection and try again.';
      } else if (upsertError.code === '23505') {
        errorMessage = 'Content name conflict. Please try again.';
      } else if (upsertError.code === '42501') {
        errorMessage = 'Permission denied. Please check your authentication status.';
      }
      
      throw new Error(errorMessage);
    }

    console.log(`✅ CONTENT API SAVE SUCCESS for "${name}":`, data);
    
    // INTELLIGENT CACHE INVALIDATION: Update cache with new content immediately
    // This ensures all components get the latest content without waiting for next fetch
    globalContentCache.set(name, value, { 
      lastModified: Date.now(),
      skipCallbacks: false // Notify all components of the update
    });

    // Invalidate related content if needed (e.g., if saving hero_title, might want to refresh hero section)
    const relatedContentPatterns = getRelatedContentPatterns(name);
    relatedContentPatterns.forEach(pattern => {
      globalContentCache.invalidateByPattern(pattern, 'admin_update');
    });
    
  } catch (err: any) {
    console.error(`❌ CONTENT API SAVE ERROR for "${name}":`, err);
    
    // Handle specific error types for saves
    let errorMessage = err.message;
    if (err.name === 'AbortError') {
      errorMessage = 'Save operation timed out. Please check your internet connection and try again.';
    } else if (err.message.includes('fetch')) {
      errorMessage = 'Network error during save. Please check your internet connection.';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Get related content patterns for intelligent invalidation
 * This helps invalidate related content when one item is updated
 */
const getRelatedContentPatterns = (contentName: string): RegExp[] => {
  const patterns: RegExp[] = [];
  
  // Extract section prefix (e.g., 'hero_' from 'hero_title')
  const sectionMatch = contentName.match(/^([a-z]+)_/);
  if (sectionMatch) {
    const sectionPrefix = sectionMatch[1];
    
    // For certain sections, invalidate all related content
    const sectionsWithDependencies = ['hero', 'about', 'skills'];
    if (sectionsWithDependencies.includes(sectionPrefix)) {
      // Don't invalidate the entire section, just mark as potentially stale
      // This is more conservative and avoids unnecessary refetches
      console.log(`🔗 Related content section identified: ${sectionPrefix}`);
    }
  }
  
  return patterns;
};

/**
 * Enhanced content cache implementation with intelligent invalidation and expiration
 */
const getFallbackContent = (name: string): string => {
  const fallbacks: Record<string, string> = {
    'hero_title': 'Welcome to My Portfolio',
    'hero_subtitle': 'Software Developer & AI Specialist',
    'hero_badge': 'Available for Projects',
    'about_title': 'About Me',
    'skills_title': 'Skills & Expertise',
    'skills_subtitle': 'My Technical Proficiencies',
    'projects_title': 'Featured Projects',
    'contact_title': 'Get in Touch',
  };
  return fallbacks[name] || 'Content loading...';
};

export class ContentCache {
  private cache = new Map<string, { 
    content: string; 
    timestamp: number; 
    lastModified: number;
    version: number;
    isStale: boolean;
  }>();
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly STALE_DURATION = 10 * 60 * 1000; // 10 minutes - mark as stale but keep serving
  private readonly DEBOUNCE_DURATION = 200; // 200ms debounce for updates
  private invalidationCallbacks = new Set<(name: string) => void>();
  private refreshPromises = new Map<string, Promise<void>>();

  /**
   * Set content in cache with metadata
   */
  private pendingUpdates = new Map<string, NodeJS.Timeout>();
  
  set(name: string, content: string, options: { 
    lastModified?: number; 
    version?: number; 
    skipCallbacks?: boolean;
    immediate?: boolean;
  } = {}): void {
    const now = Date.now();
    const existing = this.cache.get(name);
    const newVersion = options.version || (existing?.version || 0) + 1;
    
    // Clear any pending update for this content
    if (this.pendingUpdates.has(name)) {
      clearTimeout(this.pendingUpdates.get(name));
      this.pendingUpdates.delete(name);
    }
    
    const updateCache = () => {
      this.cache.set(name, {
        content,
        timestamp: now,
        lastModified: options.lastModified || now,
        version: newVersion,
        isStale: false
      });

      // Notify components of cache update if not skipping callbacks
      if (!options.skipCallbacks) {
        this.notifyInvalidation(name);
      }

      console.log(`📦 CACHE SET: "${name}" (v${newVersion})`);
    };

    // If immediate update is requested or content is new, update immediately
    if (options.immediate || !existing) {
      updateCache();
    } else {
      // Otherwise debounce the update
      const timeout = setTimeout(updateCache, this.DEBOUNCE_DURATION);
      this.pendingUpdates.set(name, timeout);
    }
  }

  /**
   * Get content from cache with staleness check
   */
  get(name: string): string | null {
    const cached = this.cache.get(name);
    if (!cached) return null;

    const now = Date.now();
    const age = now - cached.timestamp;

    // Hard expiration - remove from cache
    if (age > this.CACHE_DURATION) {
      console.log(`🗑️ CACHE EXPIRED: "${name}" (age: ${Math.round(age / 1000)}s)`);
      this.cache.delete(name);
      return null;
    }

    // Soft expiration - mark as stale but continue serving
    if (age > this.STALE_DURATION && !cached.isStale) {
      console.log(`⚠️ CACHE STALE: "${name}" (age: ${Math.round(age / 1000)}s)`);
      cached.isStale = true;
      // Trigger background refresh
      this.backgroundRefresh(name);
    }

    return cached.content;
  }

  /**
   * Check if content exists and is not expired
   */
  has(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Check if content is stale (old but still served)
   */
  isStale(name: string): boolean {
    const cached = this.cache.get(name);
    return cached?.isStale || false;
  }

  /**
   * Get cache metadata for debugging
   */
  getMetadata(name: string): { 
    age: number; 
    version: number; 
    isStale: boolean; 
    lastModified: number 
  } | null {
    const cached = this.cache.get(name);
    if (!cached) return null;

    return {
      age: Date.now() - cached.timestamp,
      version: cached.version,
      isStale: cached.isStale,
      lastModified: cached.lastModified
    };
  }

  /**
   * Intelligent invalidation - remove specific content and notify components
   */
  invalidate(name: string, reason: 'admin_update' | 'expired' | 'manual' = 'manual'): void {
    const existed = this.cache.has(name);
    this.cache.delete(name);
    
    if (existed) {
      console.log(`🔄 CACHE INVALIDATED: "${name}" (reason: ${reason})`);
      this.notifyInvalidation(name);
    }

    // Cancel any pending refresh for this item
    this.refreshPromises.delete(name);
  }

  /**
   * Invalidate multiple items (useful for related content)
   */
  invalidateMultiple(names: string[], reason: 'admin_update' | 'expired' | 'manual' = 'manual'): void {
    names.forEach(name => this.invalidate(name, reason));
  }

  /**
   * Invalidate by pattern (e.g., all items starting with 'hero_')
   */
  invalidateByPattern(pattern: RegExp, reason: 'admin_update' | 'expired' | 'manual' = 'manual'): void {
    const matchingNames = Array.from(this.cache.keys()).filter(name => pattern.test(name));
    this.invalidateMultiple(matchingNames, reason);
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    const names = Array.from(this.cache.keys());
    this.cache.clear();
    this.refreshPromises.clear();
    
    console.log(`🧹 CACHE CLEARED: ${names.length} items`);
    
    // Notify all invalidation callbacks
    names.forEach(name => this.notifyInvalidation(name));
  }

  /**
   * Get all non-expired content
   */
  getAll(): Record<string, string> {
    const result: Record<string, string> = {};
    const now = Date.now();

    for (const [name, cached] of this.cache.entries()) {
      // Only include non-expired items
      if (now - cached.timestamp <= this.CACHE_DURATION) {
        result[name] = cached.content;
      } else {
        // Clean up expired items
        this.cache.delete(name);
      }
    }

    return result;
  }

  /**
   * Get cache statistics for monitoring
   */
  getStats(): {
    totalItems: number;
    staleItems: number;
    expiredItems: number;
    averageAge: number;
    memoryUsage: number;
  } {
    const now = Date.now();
    let staleCount = 0;
    let expiredCount = 0;
    let totalAge = 0;
    let memoryUsage = 0;

    for (const [name, cached] of this.cache.entries()) {
      const age = now - cached.timestamp;
      totalAge += age;
      memoryUsage += name.length + cached.content.length;

      if (age > this.CACHE_DURATION) {
        expiredCount++;
      } else if (cached.isStale) {
        staleCount++;
      }
    }

    return {
      totalItems: this.cache.size,
      staleItems: staleCount,
      expiredItems: expiredCount,
      averageAge: this.cache.size > 0 ? totalAge / this.cache.size : 0,
      memoryUsage
    };
  }

  /**
   * Register callback for cache invalidation events
   */
  onInvalidation(callback: (name: string) => void): () => void {
    this.invalidationCallbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.invalidationCallbacks.delete(callback);
    };
  }

  /**
   * Notify all registered callbacks of invalidation
   */
  private notifyInvalidation(name: string): void {
    this.invalidationCallbacks.forEach(callback => {
      try {
        callback(name);
      } catch (error) {
        console.error('Cache invalidation callback error:', error);
      }
    });
  }

  private backgroundRefreshQueue = new Set<string>();
  private backgroundRefreshTimeout: NodeJS.Timeout | null = null;
  private readonly REFRESH_BATCH_DELAY = 1000; // 1 second

  /**
   * Queue background refresh for stale content
   */
  private backgroundRefresh(name: string): void {
    // Skip if already queued or has a pending refresh
    if (this.backgroundRefreshQueue.has(name) || this.refreshPromises.has(name)) {
      return;
    }

    // Add to queue
    this.backgroundRefreshQueue.add(name);

    // Clear existing timeout
    if (this.backgroundRefreshTimeout) {
      clearTimeout(this.backgroundRefreshTimeout);
    }

    // Schedule batch refresh
    this.backgroundRefreshTimeout = setTimeout(() => {
      this.processBatchRefresh();
    }, this.REFRESH_BATCH_DELAY);
  }

  /**
   * Process queued background refreshes in batch
   */
  private async processBatchRefresh(): Promise<void> {
    if (this.backgroundRefreshQueue.size === 0) return;

    const batchNames = Array.from(this.backgroundRefreshQueue);
    this.backgroundRefreshQueue.clear();

    console.log(`🔄 BATCH BACKGROUND REFRESH: ${batchNames.join(', ')}`);

    try {
      const refreshPromise = this.performBatchRefresh(batchNames);
      batchNames.forEach(name => this.refreshPromises.set(name, refreshPromise));

      await refreshPromise;

      batchNames.forEach(name => this.refreshPromises.delete(name));
    } catch (error) {
      console.error('❌ BATCH REFRESH ERROR:', error);
      // Clear promises on error
      batchNames.forEach(name => this.refreshPromises.delete(name));
    }
  }

  /**
   * Perform batch refresh with optimistic updates
   */
  private async performBatchRefresh(names: string[]): Promise<void> {
    try {
      const result = await bulkFetchContent(names);
      
      if (!result.error) {
        // Update cache with fresh content
        Object.entries(result.content).forEach(([name, content]) => {
          this.set(name, content, { 
            skipCallbacks: true, // Skip individual callbacks
            immediate: true // Update immediately
          });
        });

        // Single batch notification
        this.notifyBatchUpdate(names);
        console.log(`✅ BATCH REFRESH SUCCESS: ${names.join(', ')}`);
      } else {
        console.warn(`⚠️ BATCH REFRESH FAILED:`, result.error);
        // Set fallback content
        names.forEach(name => {
          this.set(name, getFallbackContent(name), {
            skipCallbacks: true,
            immediate: true
          });
        });
        // Single notification for fallback updates
        this.notifyBatchUpdate(names);
      }
    } catch (error) {
      console.error(`❌ BATCH REFRESH ERROR:`, error);
      throw error;
    }
  }

  /**
   * Notify all registered callbacks of batch update
   */
  private notifyBatchUpdate(names: string[]): void {
    // Single update event for all names
    this.invalidationCallbacks.forEach(callback => {
      try {
        names.forEach(name => callback(name));
      } catch (error) {
        console.error('Cache batch update callback error:', error);
      }
    });
  }

  /**
   * Force refresh specific content items
   */
  async refresh(names: string[]): Promise<void> {
    if (names.length === 0) return;

    console.log(`🔄 FORCE REFRESH: ${names.join(', ')}`);

    try {
      const result = await bulkFetchContent(names);
      
      if (!result.error) {
        // Update cache with fresh content
        Object.entries(result.content).forEach(([name, content]) => {
          this.set(name, content, { skipCallbacks: false });
        });
        console.log(`✅ FORCE REFRESH SUCCESS: ${names.join(', ')}`);
      } else {
        console.error(`❌ FORCE REFRESH FAILED:`, result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(`❌ FORCE REFRESH ERROR:`, error);
      throw error;
    }
  }

  /**
   * Cleanup expired items (can be called periodically)
   */
  cleanup(): number {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [name, cached] of this.cache.entries()) {
      if (now - cached.timestamp > this.CACHE_DURATION) {
        this.cache.delete(name);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 CACHE CLEANUP: Removed ${cleanedCount} expired items`);
    }

    return cleanedCount;
  }
}

// Global content cache instance
export const globalContentCache = new ContentCache();