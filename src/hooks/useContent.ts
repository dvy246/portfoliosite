import { useState, useEffect } from 'react';
import { supabase, directSaveTest } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ContentData {
  [key: string]: string;
}

export const useContent = (name: string) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [name]);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`🔄 FETCHING content for: "${name}"`);

      const { data, error: fetchError } = await supabase
        .from('sections')
        .select('content')
        .eq('name', name)
        .maybeSingle();

      if (fetchError) {
        console.error(`❌ FETCH ERROR for "${name}":`, fetchError);
        setContent('');
      } else {
        const contentValue = data?.content || '';
        console.log(`✅ FETCHED content for "${name}":`, contentValue);
        setContent(contentValue);
      }
    } catch (err: any) {
      console.error(`❌ FETCH EXCEPTION for "${name}":`, err);
      setError(err.message);
      setContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (newContent: string) => {
    try {
      setError(null);
      console.log(`🚨 CRITICAL SAVE ATTEMPT for "${name}":`, newContent);
      
      // Method 1: Try direct save test first
      console.log('🔥 Method 1: Using direct save test...');
      try {
        await directSaveTest(name, newContent);
        console.log('✅ Direct save test PASSED');
      } catch (directError) {
        console.error('❌ Direct save test FAILED:', directError);
        throw directError;
      }
      
      // Method 2: Standard upsert
      console.log('🔥 Method 2: Using standard upsert...');
      const { data, error: upsertError } = await supabase
        .from('sections')
        .upsert(
          { name, content: newContent },
          { onConflict: 'name' }
        )
        .select();

      if (upsertError) {
        console.error(`❌ UPSERT FAILED for "${name}":`, upsertError);
        console.error('❌ Error details:', {
          message: upsertError.message,
          details: upsertError.details,
          hint: upsertError.hint,
          code: upsertError.code
        });
        throw upsertError;
      }

      console.log(`✅ UPSERT SUCCESS for "${name}":`, data);
      
      // Update local state
      setContent(newContent);
      
      // Method 3: Verify the save worked
      console.log('🔍 Method 3: Verifying save...');
      setTimeout(async () => {
        try {
          const { data: verifyData, error: verifyError } = await supabase
            .from('sections')
            .select('content')
            .eq('name', name)
            .single();
          
          if (verifyError) {
            console.error(`❌ VERIFICATION FAILED for "${name}":`, verifyError);
          } else if (verifyData.content === newContent) {
            console.log(`🎉 VERIFICATION SUCCESS for "${name}": Data persisted correctly!`);
            toast.success(`✅ Saved and verified: ${name}`);
          } else {
            console.error(`❌ VERIFICATION MISMATCH for "${name}"`);
            console.error('Expected:', newContent);
            console.error('Got:', verifyData.content);
            toast.error(`❌ Save verification failed for: ${name}`);
          }
        } catch (verifyErr) {
          console.error(`❌ VERIFICATION ERROR for "${name}":`, verifyErr);
        }
      }, 1000);
      
    } catch (err: any) {
      console.error(`❌ SAVE FAILED for "${name}":`, err);
      setError(err.message);
      toast.error(`❌ Failed to save "${name}": ${err.message}`);
      
      // Don't revert - keep the new content in UI to show what user tried to save
      setContent(newContent);
    }
  };

  return {
    content,
    saveContent,
    isLoading,
    error
  };
};

// Hook for managing multiple content sections
export const useContentSections = (sectionNames: string[]) => {
  const [content, setContent] = useState<ContentData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllContent();
  }, [sectionNames]);

  const fetchAllContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 BULK FETCH for sections:', sectionNames);

      const { data, error: fetchError } = await supabase
        .from('sections')
        .select('name, content')
        .in('name', sectionNames);

      if (fetchError) {
        console.error('❌ BULK FETCH ERROR:', fetchError);
        const fallbackContent: ContentData = {};
        sectionNames.forEach(name => {
          fallbackContent[name] = '';
        });
        setContent(fallbackContent);
      } else {
        const contentMap: ContentData = {};
        sectionNames.forEach(name => {
          const found = data?.find(item => item.name === name);
          contentMap[name] = found?.content || '';
        });
        console.log('✅ BULK FETCH SUCCESS:', contentMap);
        setContent(contentMap);
      }
    } catch (err: any) {
      console.error('❌ BULK FETCH EXCEPTION:', err);
      setError(err.message);
      
      const fallbackContent: ContentData = {};
      sectionNames.forEach(name => {
        fallbackContent[name] = '';
      });
      setContent(fallbackContent);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (name: string, newContent: string) => {
    try {
      setError(null);
      console.log(`🚨 BULK SAVE for "${name}":`, newContent);
      
      // Use the same critical save logic
      const { data, error: upsertError } = await supabase
        .from('sections')
        .upsert(
          { name, content: newContent },
          { onConflict: 'name' }
        )
        .select();

      if (upsertError) {
        console.error(`❌ BULK SAVE FAILED for "${name}":`, upsertError);
        throw upsertError;
      }

      console.log(`✅ BULK SAVE SUCCESS for "${name}":`, data);
      
      // Update local state
      setContent(prev => ({
        ...prev,
        [name]: newContent
      }));
      
      toast.success(`✅ Saved: ${name}`);
      
    } catch (err: any) {
      console.error(`❌ BULK SAVE ERROR for "${name}":`, err);
      setError(err.message);
      toast.error(`❌ Failed to save "${name}": ${err.message}`);
      
      // Update local state anyway to show what user tried to save
      setContent(prev => ({
        ...prev,
        [name]: newContent
      }));
    }
  };

  return {
    content,
    saveContent,
    isLoading,
    error
  };
};