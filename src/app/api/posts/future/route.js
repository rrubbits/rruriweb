
export const revalidate = 60
export const dynamic = 'force-dynamic'

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { addDays } from 'date-fns'
import { startOfDayInTimeZone, timeZone_tokyo as timeZone } from '@/utils/date'
export async function GET(request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user;
    const endOfTodayJST = addDays(startOfDayInTimeZone(new Date(), timeZone), 1)

    const { data, error } = await supabase
      .from('posts')
      .select(`
        timestamp_begin,
      `)
      .order('timestamp_begin', { ascending: true })
      .gt('timestamp_begin', endOfTodayJST.toISOString()) // 日本時間の今日の終了    
      .select(`
      title,
      timestamp_begin,
      ticket_url,
      location,
      content,
      uuid,
      profiles(name)
    `)
      .is('deleted_at', null)  
  
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
          // username: post.profiles?.name,
          me: user?.id === post.user_id,
        }})
      return NextResponse.json(posts)  
    }
    return NextResponse.error()
}
