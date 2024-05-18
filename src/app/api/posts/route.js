
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user;

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles(name)
      `)
      .is('deleted_at', null)  
      .order('timestamp_begin', { ascending: true });
  
    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.error()
    }
    if(data) {
      console.log("[GET] ", user)
      let posts = data.map((post) => {
        // console.log("[post] ", post, post.profiles?.name, user?.id === post.user_id)
          return {
          ...post,
          username: post.profiles?.name,
          me: user?.id === post.user_id,
        }})

      return NextResponse.json(posts)  
    }
    return NextResponse.error()
}
