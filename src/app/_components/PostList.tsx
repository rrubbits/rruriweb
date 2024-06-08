"use client"
// import dayjs from "dayjs";
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { deletePost, trashPost } from '../_actions/post'
import type { Database } from '@/lib/database.types'
import PostItem from './PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { getTenseOfDate } from '@/utils/date'
import { Posts } from '../_actions/post'


import { Calendar, Culture, DateLocalizer, DateRange, Formats, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
import dated from 'date-fns' 
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
 


// import { useRoute}
// import supabase from '@/lib/supabase'

// interface PostDto {
//   id: string
//   createdAt: string
//   // user_id: string
//   title: string
//   content: string
//   timestamp_begin: string
//   timestamp_end: string
// }\
// const events = [
//   {
//     'title': 'All Day Event very long title',
//     'allDay': true,
//     'start': new Date(2024, 3, 0),
//     'end': new Date(2024, 3, 1)
//   },
//   {
//     'title': 'Long Event',
//     'start': new Date(2024, 3, 7),
//     'end': new Date(2024, 3, 10)
//   },

//   {
//     'title': 'DTS STARTS',
//     'start': new Date(2024, 2, 13, 0, 0, 0),
//     'end': new Date(2024, 2, 20, 0, 0, 0)
//   },

//   {
//     'title': 'DTS ENDS',
//     'start': new Date(2016, 10, 6, 0, 0, 0),
//     'end': new Date(2016, 10, 13, 0, 0, 0)
//   },

//   {
//     'title': 'Some Event',
//     'start': new Date(2015, 3, 9, 0, 0, 0),
//     'end': new Date(2015, 3, 9, 0, 0, 0)
//   },
//   {
//     'title': 'Conference',
//     'start': new Date(2015, 3, 11),
//     'end': new Date(2015, 3, 13),
//     desc: 'Big conference for important people'
//   },
//   {
//     'title': 'Meeting',
//     'start': new Date(2015, 3, 12, 10, 30, 0, 0),
//     'end': new Date(2015, 3, 12, 12, 30, 0, 0),
//     desc: 'Pre-meeting meeting, to prepare for the meeting'
//   },
//   {
//     'title': 'Lunch',
//     'start': new Date(2015, 3, 12, 12, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 13, 0, 0, 0),
//     desc: 'Power lunch'
//   },
//   {
//     'title': 'Meeting',
//     'start': new Date(2015, 3, 12, 14, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 15, 0, 0, 0)
//   },
//   {
//     'title': 'Happy Hour',
//     'start': new Date(2015, 3, 12, 17, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 17, 30, 0, 0),
//     desc: 'Most important meal of the day'
//   },
//   {
//     'title': 'Dinner',
//     'start': new Date(2015, 3, 12, 20, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 21, 0, 0, 0)
//   },
//   {
//     'title': 'Birthday Party',
//     'start': new Date(2015, 3, 13, 7, 0, 0),
//     'end': new Date(2015, 3, 13, 10, 30, 0)
//   },
//   {
//     'title': 'Birthday Party 2',
//     'start': new Date(2015, 3, 13, 7, 0, 0),
//     'end': new Date(2015, 3, 13, 10, 30, 0)
//   },
//   {
//     'title': 'Birthday Party 3',
//     'start': new Date(2015, 3, 13, 7, 0, 0),
//     'end': new Date(2015, 3, 13, 10, 30, 0)
//   },
//   {
//     'title': 'Late Night Event',
//     'start': new Date(2015, 3, 17, 19, 30, 0),
//     'end': new Date(2015, 3, 18, 2, 0, 0)
//   },
//   {
//     'title': 'Multi-day Event',
//     'start': new Date(2015, 3, 20, 19, 30, 0),
//     'end': new Date(2015, 3, 22, 2, 0, 0)
//   }
// ]


const PostList = ({onClick}: {onClick: (uuid: string) => void}) => {
  // const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [groupedPosts, setGroupedPosts] = useState<{ [key: string]: Posts[] }>({})
  const [showPast, setShowPast] = useState<boolean>(false)

  useEffect(() => {
    const groupPostsByDate = (posts: Posts[]) => {
      const groups: { [key: string]: Posts[] } = { 'Past': [], 'Today': [], 'Future': []}
      const currentDate = new Date()

      posts.forEach(post => {
        const postDate = new Date(post.timestamp_begin!) // timestamp_begin을 사용하여 포스트 날짜 가져오기
        let groupKey = getTenseOfDate(postDate, currentDate, 'day')
        if (!groups[groupKey]) {
          groups[groupKey] = []
        }
        groups[groupKey].push(post)
      })
      setGroupedPosts(groups)
    }
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      // setPosts(data);
      groupPostsByDate(data)
      setIsLoading(false);
    }
    setIsLoading(true)
    fetchPosts();
  }, []);
  const pastEvents = groupedPosts['Past']?.map(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'past',
      uuid: post.uuid
    })
  )
  const todayEvents = groupedPosts['Today']?.map(post =>
    ({
      title: post.title,
      start: new Date(post.timestamp_begin!),
      end: new Date(post.timestamp_end ?? post.timestamp_begin!),
      type: 'today',
      uuid: post.uuid

    })
  )
  const futureEvents = groupedPosts['Future']?.map(post =>
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
    <div className="w-full h-[90vh] flex flex-col max-w-4xl">
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
      <div className="flex-1 overflow-y-scroll">
        {/* <h1 className="mb-12">Posts {posts?.length} </h1> */}
          {/* {Object.keys(groupedPosts).map((date) => ( */}
          {Object.keys(groupedPosts).length > 2 &&
            <div className="overflow-hidden">
              <PostsSection collapsable={true} posts={groupedPosts['Past']}  title={'過去のイベント'} onClick={onClick} styles={{root:"opacity-50", h2:"text-blue-600"}}/>
              <PostsSection posts={groupedPosts['Today']}  title={`今日のイベント `} onClick={onClick}/>
              <PostsSection posts={groupedPosts['Future']}  title={`これからのイベント `} onClick={onClick}/>
            </div>
          }
      </div>
    </div>
  )
}
  interface PostsSectionProps {
    posts: Posts[] | undefined
    title: string
    onClick: ((uuid: string) => void) | undefined
    collapsable?: boolean
    styles?: {root?:string, h2?:string}
  }
  const PostsSection = ({collapsable = false, posts, title, onClick, styles}: PostsSectionProps) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsable ? true : false)

    return <div key={"Past"} className={"bg-slate-200 rounded-md my-2 " + styles?.root}>
    {/* // "bg-slate-200 rounded-md my-2 opacity-50" */}
    <button className="flex items-center w-full mb-4" onClick={collapsable ? (() => setIsCollapsed(!isCollapsed)) : () => {}}>
      <h2 className={"font-bold text-x p-2 flex items-center w-full " + styles?.h2}>
          <span className="pr-4">
            {title}
          </span>
          {
            collapsable && 
            <span className="w-5">
              {!isCollapsed ? <ChevronDownIcon/> : <ChevronRightIcon/>}
            </span>
          }
          <span className="ml-auto text-sm">
          {posts && `${posts!.length}件`}
          </span>
      </h2>
    </button>
    {!isCollapsed &&
      <ul className="">
        {(posts ?? []).map((post) => (
          <PostItem key={post.id} post={post} deletePost={deletePost} onClick={onClick}/>
        ))}
      </ul>
    }
  </div>
}

  export default PostList