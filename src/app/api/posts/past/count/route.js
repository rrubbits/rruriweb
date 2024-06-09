
export const revalidate = 60
export const dynamic = 'force-dynamic'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { startOfDayInTimeZone, timeZone_tokyo as timeZone } from '@/utils/date'
export async function GET(request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user;
    console.log("[GET] ", request.nextUrl.searchParams)
    // const currentDate = new Date().toISOString()
    const startOfTodayJST = startOfDayInTimeZone(new Date(), timeZone)
    // const endOfTodayJST = addDays(startOfTodayJST, 1)
    // const startOfTodayJST = fromZonedTime(new Date().setHours(0, 0, 0, 0), timeZone);
    // const endOfTodayJST = fromZonedTime(new Date().setHours(23, 59, 59, 999), timeZone);

    const { count, error } = await supabase
      .from('posts')
      .select('timestamp_begin', { count: 'exact', head: true })
      // .order('timestamp_begin', { ascending: false })
      .lt('timestamp_begin', startOfTodayJST.toISOString()) // 日本時間の今日の終了    
      .is('deleted_at', null)  
  
      if (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.error()
      }
      if(count != undefined) {
        return NextResponse.json({count: count})  
      }
      return NextResponse.error()
}
