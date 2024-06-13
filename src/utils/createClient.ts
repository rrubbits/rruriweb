import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
// import { createServerC}
import { createClient as _createClient } from '@supabase/supabase-js'

import { cookies } from 'next/headers'

export function createClient() {
  return  _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
export function createServerClient() {
  const cookieStore = cookies()
  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
// 'use server'
// import { createServerComponentClient as _createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { cache } from 'react'
// import { Database } from '@/lib/database.types'
// // import { Database } from '../types/supabase';

// export const createServerComponentClient = (() => {
//   const cookieStore = cookies();
//   let client = _createServerComponentClient<Database>({ cookies: () => cookieStore });
//   // const { data, error } = 
//   client.from('posts').select()//, profiles!inner(name)')
//   return client
// });
// // cache(