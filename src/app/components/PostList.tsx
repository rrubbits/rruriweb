"use client"
import dayjs from "dayjs";
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import { deletePost } from './postActions'
import type { Database } from '@/../lib/database.types'
import PostItem from '../components/PostItem'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
type Posts = Database['public']['Tables']['posts']['Row']

const PostList = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    }
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
  const [groupedPosts, setGroupedPosts] = useState<{ [key: string]: Posts[] }>({})
  const [showPast, setShowPast] = useState<boolean>(false)

  useEffect(() => {
    const groupPostsByDate = () => {
      const groups: { [key: string]: Posts[] } = { 'Past': [], 'Today': [], 'Future': []}
      const currentDate = new Date()

      posts.forEach(post => {
        const postDate = new Date(post.timestamp_begin!) // timestamp_begin을 사용하여 포스트 날짜 가져오기
        let groupKey = ''
        if (dayjs(postDate).isSame(currentDate, 'day')
        ) {
          groupKey = 'Today'
        } else if (dayjs(postDate).isBefore(currentDate, 'day')) {
          groupKey = 'Past'
        } else {
          groupKey = 'Future'
        }
        if (!groups[groupKey]) {
          groups[groupKey] = []
        }
        groups[groupKey].push(post)
      })
      setGroupedPosts(groups)
    }
    groupPostsByDate()
  }, [posts])
    return (
      <div className="w-full">
        {/* <h1 className="mb-12">Posts {posts?.length} </h1> */}
          {/* {Object.keys(groupedPosts).map((date) => ( */}
          {Object.keys(groupedPosts).length > 2 &&
            <div className="overflow-hidden">
              <div key={"Past"} className="bg-slate-200 rounded-md my-2 opacity-50">
                <h2 className="mb-4 font-bold text-xl text-blue-600 p-2">
                  <button className="flex items-center" onClick={() => setShowPast(!showPast)}>
                    <span className="pr-4">
                      {" 過去のイベント"}
                    </span>
                    <span className="w-5">
                      {showPast ? <ChevronDownIcon/> : <ChevronRightIcon/>}
                    </span>
                  </button>
                </h2>
                {showPast &&
                  <ul className="">
                    {groupedPosts['Past'].map((post) => (
                      <PostItem key={post.id} post={post} deletePost={deletePost} />
                    ))}
                  </ul>
                }
              </div>
              <div key={"Today"} className="bg-slate-200 rounded-md my-2">
                <h2 className="mb-4 font-bold text-xl p-2">
                  {/* <button onClick={() => setShowPast(!showPast)}> */}
                  {/* <span style={{ fontSize: '0.5m', marginRight: '0.5em' }}>{showPast ? "▼" : "▶"}</span> */}
                    {/* {showPast ? "▼" : "▶"} */}
                    {" 今日のイベント"}
                  {/* </button> */}
                </h2>
                {/* {showPast && */}
                <ul>
                  {groupedPosts['Today'].map((post) => (
                    <PostItem key={post.id} post={post} deletePost={deletePost} />
                  ))}
                </ul>
                {/* } */}
              </div>
              <div key={"Future"} className="bg-slate-200 rounded-md my-2">
                <h2 className="mb-4 font-bold text-xl p-2">
                  {/* <button onClick={() => setShowPast(!showPast)}> */}
                  {/* <span style={{ fontSize: '0.5m', marginRight: '0.5em' }}>{showPast ? "▼" : "▶"}</span> */}
                    {/* {showPast ? "▼" : "▶"} */}
                    {" これからのイベント"}
                  {/* </button> */}
                </h2>
                {/* {showPast && */}
                <ul>
                  {groupedPosts['Future'].map((post) => (
                    <PostItem key={post.id} post={post} deletePost={deletePost} />
                  ))}
                </ul>
                {/* } */}
              </div>
            </div>
          }
          {/* ))} */}
          {/* <ul>
            {posts?.map((post) => (
              <PostItem key={post.id} post={post} deletePost={deletePost}/>
            ))}
          </ul> */}
      </div>
    )
  }

  export default PostList