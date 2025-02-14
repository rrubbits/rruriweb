// 'use client'
import Link from 'next/link'
// import useStore from '@/store'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation = ({
  // session,
  profile,
}: {
  // session: Session | null
  profile: ProfileType | null
}) => {
  // const { setUser } = useStore()
  // let userProfile = {
  //   id: profile ? profile.id : '',
  //   email: profile ? profile.email : '',
  //   name: profile ? profile.name : '',
  //   introduce: profile ? profile.introduce : '',
  //   avatar_url: profile ? profile.avatar_url : '',
  // }
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
       {profile ? (
            <div className="flex items-center space-x-5 px-8">
              <Link href="/settings/profile">
                <div className='text-white'>PROFILE</div>
                {/* { user && user.email} */}
                { profile && <div>
                    <div className='text-gray-400'>
                      {profile.email}
                    </div>
                    <div className='text-gray-400'>
                      {profile.name}
                    </div>
                  </div> }
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
