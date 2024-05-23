// "use client"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/../lib/database.types'
import { cookies } from 'next/headers';
import CreatePost from './components/CreatePost';
import PostList from '../components/PostList';
export default async function Home() {
    const supabase = createServerComponentClient<Database>({
        cookies,
      })
    
      // セッションの取得
      const {
        data: { session }, error: sessionError
      } = await supabase.auth.getSession()
      const { data: user, error } = await supabase.auth.getUser();
      return (
    <div className="items-center">
        { session && <CreatePost /> }
        <PostList/>
    </div>
  );
}