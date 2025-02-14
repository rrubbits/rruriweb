
export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Logout from '@/app/auth/_components/logout'
import type { Database } from '@/lib/database.types'

// ログアウトページ
const LogoutPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return <Logout />
}

export default LogoutPage