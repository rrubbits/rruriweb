
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { deletePost, trashPost } from '../_functions/post'
import type { Database } from '@/lib/database.types'
import PostItem from './PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
// import { getTenseOfDate } from '@/utils/date'
import { Posts } from '../_functions/post'


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
import PostsSectionHeader from './PostsSectionHeader'

interface PostsSectionProps {
  // collapsable?: boolean
  // isCollapsed: boolean
  // posts: Posts[] | undefined
  key: string
  numberOfItems: number | undefined
  title: string
  // onClickItem: ((uuid: string) => void) | undefined
  // onClick: () => void
  styles?: {root?:string, h2?:string}
  children?: React.ReactNode; // children prop 추가
}

const PostsSection = ({key, numberOfItems, title, styles, children}: PostsSectionProps) => {
  return <div key={key} className={"bg-slate-200 rounded-md my-2 " + styles?.root}>
  {/* // "bg-slate-200 rounded-md my-2 opacity-50" */}
  {/* <button className="flex items-center w-full mb-4" onClick={() => setIsCollapsed(p => !p)}> */}
    <PostsSectionHeader title={title} numberOfItems={numberOfItems} styles={styles}/>
  {/* </button> */}
  {children}
</div>
}

export default PostsSection