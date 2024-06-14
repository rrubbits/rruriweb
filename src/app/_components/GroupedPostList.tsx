import 'server-only'
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
// import { Posts, deletePost, trashPost } from '../_actions/post'
import { Posts } from '../_functions/post'
import { deletePost, trashPost } from '../_actions/posts'
// import type { Database } from '@/lib/database.types'
import PostItem from './PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
// import { getTenseOfDate } from '@/utils/date'

import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import PostsSection from './PostsSection'
import CollapsablePostsSection from './PostsCollapsableSection'
import { isoStringFromDate, localedDateStringFrom, timeZone_tokyo } from '@/utils/date'
interface SectionInfo {
  title: string
  subtitle?: string | (() => string)
  collapsable?: boolean
  styles?:{root?:string, h2?:string}
  numberOfItems?: number
}
const sectionInfos: {[key:string]: SectionInfo} = {
  past: {
    title:  '過去のイベント',
    subtitle: () => { return '~' + localedDateStringFrom(isoStringFromDate(new Date()), { timeZone: timeZone_tokyo, includesYear: true }) },
    collapsable: true,
    styles: {root:"opacity-50", h2:"text-blue-600"}
  },
  today: {
    title: '今日のイベント',
    subtitle: () => { return localedDateStringFrom(isoStringFromDate(new Date()), { timeZone: timeZone_tokyo, includesYear: true }) },
    collapsable: false,
    // styles: {root:"", h2:"text-blue-600"}
  },
  future: {
    title: 'これからのイベント',
    collapsable: false,
    // styles: {root:"", h2:"text-blue-600"}
  }
}

interface GroupedPostListProps {
  groupedPosts: {
    [key: string]: Posts[]
  }
  // onClick: (uuid: string) => void
}

const GroupedPostList = ({groupedPosts}: GroupedPostListProps) => {
  return (
      <div className="flex-1">
        <div className="overflow-hidden">
          {
              Object.keys(groupedPosts).map((key) => {
                let _subtitle = sectionInfos[key].subtitle
                let subtitle = typeof(_subtitle) == 'function' ? _subtitle() : _subtitle
                return sectionInfos[key].collapsable ?
                  <CollapsablePostsSection key={key} 
                    // collapsable={sectionInfos[key].collapsable}
                    title={sectionInfos[key].title}
                    subtitle={subtitle}
                    styles={sectionInfos[key].styles}
                    numberOfItems={groupedPosts[key].length}>
                    <ul className="">
                      {(groupedPosts[key] ?? []).map((post) => (
                        <PostItem key={post.id} post={post} deletePost={deletePost}/>
                      ))}
                    </ul>
                  </CollapsablePostsSection>
                  : <PostsSection key={key} 
                  // collapsable={sectionInfos[key].collapsable}
                  title={sectionInfos[key].title}
                  subtitle={subtitle}
                  styles={sectionInfos[key].styles}
                  numberOfItems={groupedPosts[key].length}>
                    <ul className="">
                      {(groupedPosts[key] ?? []).map((post) => (
                        <PostItem key={post.uuid} post={post} deletePost={deletePost}/>
                      ))}
                    </ul>
                </PostsSection>
              })
          }
        </div>
      </div>
  )
}
export default GroupedPostList