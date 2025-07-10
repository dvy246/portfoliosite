import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔧 Supabase Configuration:')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? 'Present ✅' : 'Missing ❌')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// CRITICAL: Test connection and database access
export const testSupabaseConnection = async () => {
  try {
    console.log('🚀 CRITICAL TEST: Testing Supabase connection...')
    
    // Test 1: Check if we can read from sections table
    console.log('📖 Test 1: Reading from sections table...')
    const { data: readData, error: readError } = await supabase
      .from('sections')
      .select('name, content')
      .limit(5)
    
    if (readError) {
      console.error('❌ READ FAILED:', readError)
      return false
    }
    
    console.log('✅ READ SUCCESS:', readData)
    
    // Test 2: Try to insert/upsert test data
    console.log('💾 Test 2: Testing upsert operation...')
    const testName = 'critical_test_' + Date.now()
    const testContent = 'Critical test at ' + new Date().toISOString()
    
    const { data: upsertData, error: upsertError } = await supabase
      .from('sections')
      .upsert(
        { name: testName, content: testContent },
        { onConflict: 'name' }
      )
      .select()
    
    if (upsertError) {
      console.error('❌ UPSERT FAILED:', upsertError)
      console.error('❌ Error details:', {
        message: upsertError.message,
        details: upsertError.details,
        hint: upsertError.hint,
        code: upsertError.code
      })
      return false
    }
    
    console.log('✅ UPSERT SUCCESS:', upsertData)
    
    // Test 3: Verify the data was actually saved
    console.log('🔍 Test 3: Verifying data was saved...')
    const { data: verifyData, error: verifyError } = await supabase
      .from('sections')
      .select('content')
      .eq('name', testName)
      .single()
    
    if (verifyError) {
      console.error('❌ VERIFICATION FAILED:', verifyError)
      return false
    }
    
    if (verifyData.content === testContent) {
      console.log('🎉 VERIFICATION SUCCESS: Data was saved correctly!')
      console.log('🎉 ALL TESTS PASSED - Database is working!')
      return true
    } else {
      console.error('❌ VERIFICATION FAILED: Data mismatch')
      console.error('Expected:', testContent)
      console.error('Got:', verifyData.content)
      return false
    }
    
  } catch (err) {
    console.error('❌ CRITICAL ERROR:', err)
    return false
  }
}

// CRITICAL: Direct save function for testing
export const directSaveTest = async (name: string, content: string) => {
  try {
    console.log(`🚨 DIRECT SAVE TEST for "${name}":`, content)
    
    const { data, error } = await supabase
      .from('sections')
      .upsert(
        { name, content },
        { onConflict: 'name' }
      )
      .select()
    
    if (error) {
      console.error('❌ DIRECT SAVE FAILED:', error)
      throw error
    }
    
    console.log('✅ DIRECT SAVE SUCCESS:', data)
    return data
  } catch (err) {
    console.error('❌ DIRECT SAVE ERROR:', err)
    throw err
  }
}