

export const dynamic = 'force-dynamic'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user;
    // const currentDate = new Date().toISOString()
    const { data, error } = await supabase
      .from('posts')
      .select(`
        title,
        timestamp_begin,
        ticket_url,
        location,
        content,
        profiles(name)
      `)
      .is('deleted_at', null)  
      // .gt('timestamp_begin', currentDate)
      .order('timestamp_begin', { ascending: true })
      // .range(0, 10)  
  
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
