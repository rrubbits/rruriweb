"use client"
// import dayjs from "dayjs";
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { deletePost, trashPost } from '../_actions/post'
import type { Database } from '@/../lib/database.types'
import PostItem from './PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { getTenseOfDate } from '@/utils/date'
import { Posts } from '../_actions/post'

const PostList = () => {
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

  // const [posts, setPosts] = useState<Posts[]>([])
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const res = await fetch('/api/posts')
  //     if (!res.ok) {
  //       throw new Error('Failed to fetch data')
  //     }
  //     const posts = await res.json() as Posts[]
  //     setPosts(posts)
  //   }
  //   getPosts()
  // }, [])
  // useEffect(() => {
  // }, [posts])
    return (
      <div className="w-full max-w-4xl">
        {/* <h1 className="mb-12">Posts {posts?.length} </h1> */}
          {/* {Object.keys(groupedPosts).map((date) => ( */}
          {Object.keys(groupedPosts).length > 2 &&
            <div className="overflow-hidden">
              <div key={"Past"} className="bg-slate-200 rounded-md my-2 opacity-50">
                <button className="flex items-center w-full mb-4" onClick={() => setShowPast(!showPast)}>
                  <h2 className="font-bold text-xl text-blue-600 p-2 flex items-center w-full">
                      <span className="pr-4">
                        {`過去のイベント `}
                      </span>
                      <span className="w-5">
                        {showPast ? <ChevronDownIcon/> : <ChevronRightIcon/>}
                      </span>
                      <span className="ml-auto text-sm">
                      {!isLoading && `${groupedPosts['Past'].length}件`}
                      </span>
                  </h2>
                </button>
                {showPast &&
                  <ul className="">
                    {groupedPosts['Past'].map((post) => (
                      <PostItem key={post.id} post={post} deletePost={deletePost} />
                    ))}
                  </ul>
                }
              </div>
              <div key={"Today"} className="bg-slate-200 rounded-md my-2">
                <h2 className="mb-4 font-bold text-xl p-2 flex">
                    <span>
                      {`今日のイベント `}
                    </span>
                    <span className="ml-auto text-sm">
                      {!isLoading && `${groupedPosts['Today'].length}件`}
                    </span>
                </h2>
                <ul>
                  {groupedPosts['Today'].map((post) => (
                    <PostItem key={post.id} post={post} deletePost={deletePost} />
                  ))}
                </ul>
              </div>
              <div key={"Future"} className="bg-slate-200 rounded-md my-2">
                <h2 className="mb-4 font-bold text-xl p-2 flex items-center">
                    <span>
                      {`これからのイベント `}
                    </span>
                    <span className="ml-auto text-sm">
                      {!isLoading && `${groupedPosts['Future'].length}件`}
                    </span>
                </h2>
                <ul>
                  {groupedPosts['Future'].map((post) => (
                    <PostItem key={post.id} post={post} deletePost={deletePost} />
                  ))}
                </ul>
              </div>
            </div>
          }
      </div>
    )
  }

  export default PostList