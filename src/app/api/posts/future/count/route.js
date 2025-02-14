

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

    const { count, data, error } = await supabase
      .from('posts')
      .select(`timestamp_begin`, { count: 'exact', head: true })
      // .order('timestamp_begin', { ascending: true })
      .gt('timestamp_begin', endOfTodayJST.toISOString()) // 日本時間の今日の終了    
      .is('deleted_at', null)  
      // .select('*', { count: 'exact', head: true })
  
    console.log("[GET] ", count, data)

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.error()
    }
    if(count != undefined) {
      // console.log("[GET] ", user)
      // let posts = data.map((post) => {
      //   // console.log("[post] ", post, post.profiles?.name, user?.id === post.user_id)
      //     return {
      //     ...post,
      //     // username: post.profiles?.name,
      //     me: user?.id === post.user_id,
      //   }})
      return NextResponse.json({count: count})  
    }
    return NextResponse.error()
}
