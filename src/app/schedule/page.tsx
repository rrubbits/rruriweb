

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
import type { Database } from '@/lib/database.types'
import PostList from '../_components/GroupedPostList'
import { useRouter } from 'next/navigation'
import PostsCalendar from '../_components/PostsCalendar'

type Posts = Database['public']['Tables']['posts']['Row']

const Schedule = () => {
  // const router = useRouter()
  return (
    <div className="flex flex-col items-center">
      <PostsCalendar />
    </div>
  )
}

export default Schedule