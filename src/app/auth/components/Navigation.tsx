// 'use client'
import Link from 'next/link'
// import useStore from '@/store'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/../lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation = ({
  session,
  profile,
}: {
  session: Session | null
  profile: ProfileType | null
}) => {
  // const { setUser } = useStore()
  let user = {
    id: session ? session.user.id : '',
    email: session ? session.user.email! : '',
    name: session && profile ? profile.name : '',
    introduce: session && profile ? profile.introduce : '',
    avatar_url: session && profile ? profile.avatar_url : '',
  }
  // 状態管理にユーザー情報を保存
  // useEffect(() => {
    // setUser({
    //   id: session ? session.user.id : '',
    //   email: session ? session.user.email! : '',
    //   name: session && profile ? profile.name : '',
    //   introduce: session && profile ? profile.introduce : '',
    //   avatar_url: session && profile ? profile.avatar_url : '',
    // })
  // }, [session, setUser, profile])
  // console.log('user profile', session, profile)
  return (
    <div className="py-5 container flex flex-row-reverse items-center justify-between bg-slate-800">
    {/* <Link href="/" className="font-bold text-xl cursor-pointer">
      FullStackChannel
    </Link> */}
    <div className="text-sm font-bold">
       {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div className='text-white'>PROFILE2</div>
                { user && user.email}
                { profile && <div>{profile.email} - {profile.name}</div> }
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5 text-white">
              <Link className="text-white" href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}

    </div>
  </div>
  )
}

export default Navigation
