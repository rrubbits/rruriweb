export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Login from '@/app/auth/_components/login'
import type { Database } from '@/lib/database.types'
// ログインページ
const LoginPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session }, error: sessionError
  } = await supabase.auth.getSession()
  const { data: user, error } = await supabase.auth.getUser();
  console.log("/login > session", session, sessionError, user, error)

  // 認証している場合、リダイレクト
  if (session) {
    redirect('/admin')
  }

  return <Login />
}

export default LoginPage