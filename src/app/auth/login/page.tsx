
export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Login from '@/app/auth/_components/login'
import type { Database } from '@/lib/database.types'
import { createServerClient } from '@/utils/supabase/server'
import { getUser } from '@/app/_functions/auth'
// ログインページ
const LoginPage = async () => {
  const user = await getUser()
  if (user) {
    redirect('/admin')
  }

  return <Login />
}

export default LoginPage