
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { fromZonedTime, format } from 'date-fns-tz'
const timeZone = 'Asia/Tokyo';
export async function GET(request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user;
    // const currentDate = new Date().toISOString()
    const startOfTodayJST = fromZonedTime(new Date().setHours(0, 0, 0, 0), timeZone);
    const endOfTodayJST = fromZonedTime(new Date().setHours(23, 59, 59, 999), timeZone);

    const { data, error } = await supabase
      .from('posts')
      .select(`
        timestamp_begin,
      `)
      .order('timestamp_begin', { ascending: true })
      .gte('timestamp_begin', startOfTodayJST.toISOString()) // 日本時間の今日の開始
      .lte('timestamp_begin', endOfTodayJST.toISOString()) // 日本時間の今日の終了    
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
          // username: post.profiles?.name,
          me: user?.id === post.user_id,
        }})
      return NextResponse.json(posts)  
    }
    return NextResponse.error()
}
