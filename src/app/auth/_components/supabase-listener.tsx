import 'server-only'
// 'use server'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import Navigation from './Navigation'
// import type { Database } from '@/lib/database.types'
import { getUser, getUserProfile } from '@/app/_functions/auth'
import { createServerClient } from '@/utils/supabase/server'

// type ProfileType = Database['public']['Tables']['profiles']['Row']

// 認証状態の監視
const SupabaseListener = async () => {
  const supabase = createServerClient()
  // セッションの取得
  const user = await getUser()
  let profile = await getUserProfile()
  // const {
  //   data: { session }, error
  // } = await supabase.auth.getSession()
  // console.log("[SuperbaseListener] ", session, error)
  if(!user) {
    console.error("[SuperbaseListener]!user")
  }
  // プロフィールの取得
  if(user) {
    const { data: currentProfile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    console.log("[Profiles] ", currentProfile, error)
    profile = currentProfile

  // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== user.email) {
      // メールアドレスを更新
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: user.email })
        .match({ id: user.id })
        .select('*')
        .single()

      profile = updatedProfile
    }
  }
  // session={session} 
  return <Navigation profile={profile} />
}

export default SupabaseListener