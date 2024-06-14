"use client"
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import PostsSectionHeader from './PostsSectionHeader'

interface CollapsablePostsSectionProps {
  key: string
  collapsable?: boolean
  // isCollapsed: boolean
  // posts: Posts[] | undefined
  numberOfItems: number | undefined
  title: string
  subtitle?: string | (() => string)
  // onClickItem: ((uuid: string) => void) | undefined
  // onClick: () => void
  styles?: {root?:string, h2?:string}
  children?: React.ReactNode; // children prop 추가
}

const CollapsablePostsSection = ({key, numberOfItems, title, subtitle, styles, children}: CollapsablePostsSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  return <div key={key} className={"bg-slate-200 rounded-md my-2 " + styles?.root}>
  {/* // "bg-slate-200 rounded-md my-2 opacity-50" */}
  <button className="flex items-center w-full mb-4" onClick={() => setIsCollapsed(p => !p)}>
    <PostsSectionHeader title={title} numberOfItems={numberOfItems} styles={styles} icons={
      <div className="w-5">
        {isCollapsed ? <ChevronRightIcon/> : <ChevronDownIcon/>}
      </div>
    }/>

  </button>
  {!isCollapsed && children}
</div>
}

export default CollapsablePostsSection