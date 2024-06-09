import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { deletePost, trashPost } from '../_actions/post'
import type { Database } from '@/lib/database.types'
import PostItem from './PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
// import { getTenseOfDate } from '@/utils/date'
import { Posts } from '../_actions/post'

import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import PostsSection from './PostsSection'
import CollapsablePostsSection from './PostsCollapsableSection'

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

interface GroupedPostListProps {
  groupedPosts: {
    [key: string]: Posts[]
  }
  // onClick: (uuid: string) => void
}

const GroupedPostList = ({groupedPosts}: GroupedPostListProps) => {
  return (
      <div className="flex-1 overflow-y-scroll">
        <div className="overflow-hidden">
          {
              Object.keys(groupedPosts).map((key) => {
                return sectionInfos[key].collapsable ?
                  <CollapsablePostsSection key={key} 
                    // collapsable={sectionInfos[key].collapsable}
                    title={sectionInfos[key].title}
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
                  styles={sectionInfos[key].styles}
                  numberOfItems={groupedPosts[key].length}>
                    <ul className="">
                      {(groupedPosts[key] ?? []).map((post) => (
                        <PostItem key={post.id} post={post} deletePost={deletePost}/>
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