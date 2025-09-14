import { supabase } from './supabase';

export interface BulkContentResult {
  content: Record<string, string>;
  error?: string;
}

// Enhanced circuit breaker with per-request tracking
const requestTracker = new Map<string, { attempts: number; lastAttempt: number; blocked: boolean }>();
const MAX_ATTEMPTS_PER_REQUEST = 3;
const CIRCUIT_BREAKER_RESET_TIME = 60000; // 1 minute
const REQUEST_COOLDOWN = 5000; // 5 seconds between retries for same request

// Active request deduplication
const activeRequests = new Map<string, Promise<BulkContentResult>>();

/**
 * FIXED: Bulk fetch with proper retry limits, deduplication, and circuit breaker
 */
export const bulkFetchContent = async (names: string[]): Promise<BulkContentResult> => {
  if (names.length === 0) {
    return { content: {} };
  }

  // Create unique key for this request
  const requestKey = names.sort().join(',');
  
  // Check if identical request is already in progress
  if (activeRequests.has(requestKey)) {
    console.log('🔄 REUSING ACTIVE REQUEST:', requestKey);
    return activeRequests.get(requestKey)!;
  }

  // Check circuit breaker for this specific request
  const tracker = requestTracker.get(requestKey);
  const now = Date.now();
  
  if (tracker) {
    // Reset if enough time has passed
    if (now - tracker.lastAttempt > CIRCUIT_BREAKER_RESET_TIME) {
      tracker.attempts = 0;
      tracker.blocked = false;
    }
    
    // Block if too many attempts
    if (tracker.attempts >= MAX_ATTEMPTS_PER_REQUEST) {
      if (!tracker.blocked) {
        console.warn(`🚫 CIRCUIT BREAKER ACTIVATED for request: ${requestKey}`);
        tracker.blocked = true;
      }
      
      const fallbackContent: Record<string, string> = {};
      names.forEach(name => {
        fallbackContent[name] = getFallbackContent(name);
      });
      return { content: fallbackContent, error: 'Circuit breaker active - using fallback content' };
    }
    
    // Enforce cooldown between retries
    if (now - tracker.lastAttempt < REQUEST_COOLDOWN) {
      console.log(`⏳ REQUEST COOLDOWN: ${Math.ceil((REQUEST_COOLDOWN - (now - tracker.lastAttempt)) / 1000)}s remaining`);
      const fallbackContent: Record<string, string> = {};
      names.forEach(name => {
        fallbackContent[name] = getFallbackContent(name);
      });
      return { content: fallbackContent, error: 'Request in cooldown - using fallback content' };
    }
  }

  // Create and track the request
  const requestPromise = performBulkFetch(names, requestKey);
  activeRequests.set(requestKey, requestPromise);

  try {
    const result = await requestPromise;
    return result;
  } finally {
    // Clean up active request
    activeRequests.delete(requestKey);
  }
};

/**
 * Internal fetch implementation with proper error handling
 */
const performBulkFetch = async (names: string[], requestKey: string): Promise<BulkContentResult> => {
  // Initialize or update tracker
  const tracker = requestTracker.get(requestKey) || { attempts: 0, lastAttempt: 0, blocked: false };
  tracker.attempts++;
  tracker.lastAttempt = Date.now();
  requestTracker.set(requestKey, tracker);

  console.log(`🔄 BULK FETCH (attempt ${tracker.attempts}/${MAX_ATTEMPTS_PER_REQUEST}):`, names);

  try {
    // Create AbortController with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort('Request timeout');
    }, 8000); // 8 second timeout

    const { data, error: fetchError } = await supabase
      .from('sections')
      .select('name, content')
      .in('name', names)
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (fetchError) {
      console.error('❌ SUPABASE ERROR:', fetchError);
      throw new Error(`Database error: ${fetchError.message}`);
    }

    // SUCCESS: Reset tracker
    requestTracker.delete(requestKey);

    // Create content map
    const contentMap: Record<string, string> = {};
    names.forEach(name => {
      const found = data?.find((item: any) => item.name === name);
      contentMap[name] = found?.content || getFallbackContent(name);
    });

    console.log('✅ BULK FETCH SUCCESS:', Object.keys(contentMap));
    return { content: contentMap };

  } catch (err: any) {
    console.error(`❌ BULK FETCH ERROR (attempt ${tracker.attempts}):`, err.message);
    
    // Don't retry on certain errors
    const nonRetryableErrors = ['JWT', 'auth', 'permission', 'unauthorized'];
    const isNonRetryable = nonRetryableErrors.some(keyword => 
      err.message.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (isNonRetryable) {
      console.warn('🚫 NON-RETRYABLE ERROR - blocking further attempts');
      tracker.attempts = MAX_ATTEMPTS_PER_REQUEST; // Block further attempts
      tracker.blocked = true;
      requestTracker.set(requestKey, tracker);
    }
    
    // Return fallback content instead of throwing
    const fallbackContent: Record<string, string> = {};
    names.forEach(name => {
      fallbackContent[name] = getFallbackContent(name);
    });
    
    return { 
      content: fallbackContent,
      error: `Failed to load content: ${err.message}`
    };
  }
};

// Helper function for fallback content - comprehensive fallbacks to prevent any loading text
const getFallbackContent = (name: string): string => {
  const fallbacks: Record<string, string> = {
    // Hero section
    'hero_title': 'Hey, Divy here! 👋 Finance Meets Tech',
    'hero_subtitle': 'BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems.',
    'hero_badge': 'Finance + AI Professional',
    'hero_cta_text': 'Let\'s Solve Problems Together',
    'hero_floating_badge': 'AI',
    'hero_scroll_text': 'Discover More',
    'profile_photo': 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800',

    // About section
    'about_title': 'Where Business Meets Innovation',
    'about_subtitle': 'The intersection of business intelligence and machine learning is where I thrive.',
    'about_content': 'My journey began in the world of commerce, where I developed a deep appreciation for analytical rigor and strategic thinking. The BCom (Hons) foundation taught me to see patterns in data, understand market dynamics, and most importantly—translate complex insights into actionable business decisions.',
    'about_journey_title': 'My Journey',

    // Skills section
    'skills_title': 'Core',
    'skills_subtitle': 'Expertise',
    'skills_ai_title': 'AI & Machine Learning',
    'skills_business_title': 'Business Analytics',
    'skills_technical_title': 'Technical Stack',
    'skills_differentiator_title': 'What Sets Me Apart',
    'skills_differentiator_subtitle': 'The rare combination of deep technical expertise and business strategic thinking',

    // Individual skills
    'skill_ai_1': 'Machine Learning',
    'skill_ai_2': 'Deep Learning',
    'skill_ai_3': 'Natural Language Processing',
    'skill_ai_4': 'Computer Vision',
    'skill_ai_5': 'MLOps',
    'skill_business_1': 'Financial Modeling',
    'skill_business_2': 'Business Intelligence',
    'skill_business_3': 'Decision Optimization',
    'skill_business_4': 'Market Analysis',
    'skill_business_5': 'Strategic Planning',
    'skill_technical_1': 'Python',
    'skill_technical_2': 'TensorFlow/PyTorch',
    'skill_technical_3': 'SQL/NoSQL',
    'skill_technical_4': 'Cloud Platforms',
    'skill_technical_5': 'Data Visualization',

    // Projects section
    'cta_section_title': 'Ready to Contribute to Your Team',
    'cta_section_content': 'These projects represent my journey of learning and growth. I\'m excited to bring this enthusiasm, fresh perspective, and unique combination of business and technical skills to solve real-world challenges.',

    // Contact section
    'contact_title': 'Let\'s Build the Future Together',
    'contact_subtitle': 'Ready to transform your business with AI? Let\'s discuss how we can create solutions that drive real impact.',
    'contact_content': 'Whether you\'re looking to implement AI solutions, need strategic guidance on digital transformation, or want to explore collaboration opportunities, I\'m here to help turn your vision into reality.',
    'contact_section_title': 'Get in Touch',
    'contact_email': 'your.email@example.com',
    'contact_phone': '+1 (555) 123-4567',
    'contact_location': 'Your City, Country',
    'contact_social_title': 'Connect With Me',
    'contact_linkedin_url': 'https://linkedin.com/in/yourprofile',
    'contact_github_url': 'https://github.com/yourprofile',
    'contact_twitter_url': 'https://twitter.com/yourprofile',
    'contact_form_title': 'Start a Conversation',
    'contact_name_label': 'Full Name *',
    'contact_email_label': 'Email Address *',
    'contact_company_label': 'Company/Organization',
    'contact_message_label': 'Project Details *',
    'contact_button_text': 'Send Message',
    'contact_footer_text': 'I typically respond within 24 hours',

    // Certifications
    'certifications_title': 'Certificates & Continuous Learning'
  };
  
  // Return fallback or a generic professional message - never show "loading"
  return fallbacks[name] || 'Professional content';
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