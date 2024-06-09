// "use client"
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

interface PostsSectionHeaderProps {
  numberOfItems: number | undefined
  title: string
  styles?: {root?:string, h2?:string}
  icons?: React.ReactNode;
  children?: React.ReactNode; // children prop 추가
}
// collapsable = false, 
const PostsSectionHeader = ({icons, numberOfItems, title, styles}: PostsSectionHeaderProps) => {
  return <h2 className={"font-bold text-x p-2 flex items-center w-full " + styles?.h2}>
      <span className="pr-4">
        {title}
      </span>
      {/* <div className="w-5"> */}
       { icons && icons }
      {/* </div> */}
    <span className="ml-auto text-sm">
      {numberOfItems && `${numberOfItems!}件`}
    </span>
  </h2>
}
export default PostsSectionHeader