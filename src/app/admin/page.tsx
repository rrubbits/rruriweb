'use client'

import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/../lib/database.types'
// import { cookies } from 'next/headers';
import CreatePost from './_components/CreatePost';
import PostList from '../_components/PostList';
import { revalidatePath } from 'next/cache';
export default async function Home() {
  // const supabase = createServerComponentClient<Database>({
  //     cookies,
  //   })
  const supabase = createClientComponentClient<Database>();
  // セッションの取得 
  const {
    data: { session }, error: sessionError
  } = await supabase.auth.getSession()
  const { data: user, error } = await supabase.auth.getUser();
  return (
    <div className="items-center">
        { session && <CreatePost/> }
        <PostList/>
    </div>
  );
}