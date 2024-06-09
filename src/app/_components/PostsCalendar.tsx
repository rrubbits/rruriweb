"use client"
// import dayjs from "dayjs";
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { deletePost, trashPost } from '../_actions/post'
import type { Database } from '@/lib/database.types'
import PostItem from './PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
// import { getTenseOfDate } from '@/utils/date'
import { Posts } from '../_actions/post'


import { Calendar, Culture, DateLocalizer, DateRange, Formats, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import dated, { isSameDay } from 'date-fns' 
// import styles from "./schedule.module.css"
// import "./schedule.module.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
import { format, parse, startOfWeek, getDay } from 'date-fns'
import moment from 'moment';
import 'moment/locale/ja';
// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
// import ja from 'date-fns/locale/ja'
import { ja } from 'date-fns/locale'
import CalendarToolbar from '@/app/_components/CalendarToolbar'
// import { ja } from "date-fns/locale"
// const locales = {
//   ja
//   // "ja": require("date-fns/locale/ja")
// }

// const localizer = {
//   format: (date, formatStr) => format(date, formatStr, { locale: ja }),
//   parse: (date, formatStr) => parse(date, formatStr, new Date(), { locale: ja }),
//   startOfWeek: () => startOfWeek(new Date(), { locale: ja }),
//   getDay: (date) => getDay(date),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })
// import globalize from "globalize";
const localizer = momentLocalizer(moment)
const formats: Formats = {
  dateFormat: 'D',
  dayFormat: 'D(ddd)',
  monthHeaderFormat: 'YYYY年M月',
  dayHeaderFormat: 'M月D日(ddd)',
  dayRangeHeaderFormat: (range: DateRange, culture?: Culture, localizer?: DateLocalizer) => `${format(range.start, 'M月d日(eee)', { locale: ja })} ~ ${format(range.end, 'M月d日(eee)', { locale: ja })} `,
}
 
type PostsCalendarSectionTypes = 'past'|'today'|'future'
interface PostsCalendarOptions { 
  sections?: PostsCalendarSectionTypes[]
  showCalendar?: boolean
}
interface PostsCalendarProps {
  options?: PostsCalendarOptions
  onClick: (uuid: string) => void

}
import { isSameDay, differenceInCalendarDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz'
import PostsSection from './PostsSection'

function getTenseOfDate(date: Date, now: Date, unit: 'day'): PostsCalendarSectionTypes {
  // console.log("[getTenseOfDate] date, now", date, now, differenceInCalendarDays(date, now))
  if (isSameDay(date, now)) {
      return 'today';
  } else if (differenceInCalendarDays(date, now) < 0) {
      return 'past';
  } else {
      return 'future';
  }
}
function groupPostsByDate(posts: Posts[], groupKeys: PostsCalendarSectionTypes[]):  {
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

const sectionInfos: {[key:string]:{title: string, collapsable?: boolean, styles?:{root?:string, h2?:string}}} = {
  past: {
    title:  '過去のイベント',
    collapsable: true,
    styles: {root:"opacity-50", h2:"text-blue-600"}
  },
  today: {
    title: '今日のイベント',
    collapsable: false,
    // styles: {root:"", h2:"text-blue-600"}
  },
  future: {
    title: 'これからのイベント',
    collapsable: false,
    // styles: {root:"", h2:"text-blue-600"}
  }
}
const PostsCalendar = ({onClick, options}: PostsCalendarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [groupedPosts, setGroupedPosts] = useState<{ [key: string]: Posts[] }>({})
  const [showPast, setShowPast] = useState<boolean>(false)
  const sectionKeys = options?.sections ?? ['past', 'today', 'future']

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setGroupedPosts(groupPostsByDate(data, options?.sections ?? ['past', 'today', 'future']))
      setIsLoading(false);
    }
    setIsLoading(true)
    fetchPosts();
  }, [options?.sections]);
  const pastEvents = groupedPosts['past']?.map(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'past',
      uuid: post.uuid
    })
  )
  const todayEvents = groupedPosts['today']?.map(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'today',
      uuid: post.uuid

    })
  )
  const futureEvents = groupedPosts['future']?.map(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'future',
      uuid: post.uuid
    })
  )
  const events = pastEvents?.concat(todayEvents ?? []).concat(futureEvents ?? [])
  // console.log("[PostList] events", events)
  return (
  <div className="w-full flex flex-col max-w-4xl">
    {/* h-[90vh] */}
      {options?.showCalendar && 
        <div className="flex-1 h-[500px] min-h-[300px] bg-gray-100">
          <Calendar
            localizer={localizer}
            events={events}
            components={{toolbar: CalendarToolbar}}
            startAccessor="start"
            endAccessor="end"
            // defaultDate={new Date(2024, 3, 1)}
            formats={formats}
            eventPropGetter={({ type }) => {
              switch (type) {
                case 'past':
                  return {className: 'opacity-50', style: {fontSize: 10, padding: 0}};
                case 'today':
                  return {style: {backgroundColor: 'red', fontSize: 10, padding: 0 }}//className: 'bg-black'};
                case 'future':
                  return {style: {fontSize: 10, padding: 0}};
                      // case 'schedule':
                //   return {style:{backgroundColor:'skyblue'}};
              }
              return {};
            }}
            onSelectEvent={(event) => {
              onClick(event.uuid);
              // refs[uuid].scrollIntoView()
            }}
          />
        </div>
      }
      <div className="flex-1 overflow-y-scroll">
            <div className="overflow-hidden">
              {
                  sectionKeys.map((key) => {
                    return (
                      <PostsSection key={key} collapsable={sectionInfos[key].collapsable} posts={groupedPosts[key]}  title={sectionInfos[key].title} onClick={onClick} styles={sectionInfos[key].styles}/>
                    )
                  })
              }
            </div>
      </div>
    </div>
  )
}


  export default PostsCalendar