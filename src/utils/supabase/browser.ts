import { createServerClient as _createServerClient, createBrowserClient as _createBrowserClient, type CookieOptions } from '@supabase/ssr'
// import { createServerC}export function createBrowserClient() {
  export function createBrowserClient() {
    return _createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}