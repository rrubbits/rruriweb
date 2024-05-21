// "use client"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
import type { Database } from '@/../lib/database.types'
import PostList from '../components/PostList'
// import supabase from '@/lib/supabase'

// interface PostDto {
//   id: string
//   createdAt: string
//   // user_id: string
//   title: string
//   content: string
//   timestamp_begin: string
//   timestamp_end: string
// }
type Posts = Database['public']['Tables']['posts']['Row']

const Schedule = async () => {
  return (
    <div className="w-full">
      <PostList/>
    </div>
  )
}

export default Schedule