
import { isSameDay, differenceInCalendarDays } from 'date-fns';
import { toDate, toZonedTime } from 'date-fns-tz';
import { timeZone_tokyo } from '@/utils/date';
import { Posts } from '@/app/_functions/post';

export type PostsCalendarSectionTypes = 'past'|'today'|'future'
export type CalendarEvent = {
  title: string
  start: Date
  end: Date
  type: string
  uuid: string
}
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
    console.log("[groupPostsByDate] post.uuid", post.uuid)
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
