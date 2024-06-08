"use client"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
import type { Database } from '@/lib/database.types'
import PostList from '../_components/PostList'
import { useRouter } from 'next/navigation'

type Posts = Database['public']['Tables']['posts']['Row']

const Schedule = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center">
      <PostList onClick={(uuid) => {
        router.push(`/schedule/post/${uuid}`)
      }}/>
    </div>
  )
}

export default Schedule