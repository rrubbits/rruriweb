// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
// import type { Database } from '@/lib/database.types'
// import PostList from '../_components/GroupedPostList'
// import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, isSameDay } from 'date-fns';
import { Posts, getPosts } from '../_functions/post';
import PostsCalendar, { CalendarEvent, PostsCalendarSectionTypes } from '../_components/PostsCalendar'
import GroupedPostList from '../_components/GroupedPostList';
import { toDate, toZonedTime } from 'date-fns-tz';
import { timeZone_tokyo } from '@/utils/date';

// type Posts = Database['public']['Tables']['posts']['Row']
function differenceInCalendarDaysInTimeZone(date1: Date, date2: Date, timeZone: string) {
  const tzDate1 = toZonedTime(date1, timeZone)
  const tzDate2 = toZonedTime(date2, timeZone)
  return differenceInCalendarDays(tzDate1, tzDate2)
}
function getTenseOfDate(date: Date, now: Date, unit: 'day'): PostsCalendarSectionTypes {
  if (differenceInCalendarDaysInTimeZone(date, now, timeZone_tokyo) == 0) {
      return 'today';
  } else if (differenceInCalendarDaysInTimeZone(date, now, timeZone_tokyo) < 0) {
      return 'past';
  } else {
      return 'future';
  }
}
export function groupPostsByDate(posts: Posts[], groupKeys: PostsCalendarSectionTypes[]):  {
  [key: string]: Posts[]
} {
  // console.log('[groupPostsByDate] posts', posts)
  console.log('[groupPostsByDate] groupKeys', groupKeys)
  const groups: { [key: string]: Posts[] } = groupKeys.reduce<{[key: string]: Posts[]}>((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
  console.log('[groupPostsByDate] groups', groups)
  const currentDate = new Date()
  posts.forEach(post => {
    const postDate = new Date(post.timestamp_begin!) // timestamp_begin을 사용하여 포스트 날짜 가져오기
    let groupKey = getTenseOfDate(postDate, currentDate, 'day')
    if(groupKeys.includes(groupKey)) {
      // if (!groups[groupKey]) {
      //   groups[groupKey] = []
      // }
      groups[groupKey].push(post)  
    }
  })
  return groups
}
export function eventsForGroupedPosts(groupedPosts: { [key: string]: Posts[] }): CalendarEvent[] {
  const pastEvents = groupedPosts['past']?.map<CalendarEvent>(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'past',
      uuid: post.uuid
    })
  )
  const todayEvents = groupedPosts['today']?.map<CalendarEvent>(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'today',
      uuid: post.uuid
    })
  )
  const futureEvents = groupedPosts['future']?.map<CalendarEvent>(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'future',
      uuid: post.uuid
    })
  )
  const events = pastEvents?.concat(todayEvents ?? []).concat(futureEvents ?? [])
  return events
}

const Schedule = async () => {
  const data = await getPosts()
  const groupedPosts = groupPostsByDate(data, ['past', 'today', 'future'])
  const events = eventsForGroupedPosts(groupedPosts)
  return (
    <div className="flex flex-col items-center min-h-[100vh] pb-4">
      <PostsCalendar events={events}>
        <GroupedPostList groupedPosts={groupedPosts}/>
      </PostsCalendar>
    </div>
  )
}

export default Schedule