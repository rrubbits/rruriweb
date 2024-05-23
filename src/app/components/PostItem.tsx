"use client"
import type { Database } from '@/../lib/database.types'
import { getUser, trashPost } from '../admin/services/supabase'
import { dateStringFrom, timeStringFrom } from '@/utils/date'

type Posts = Database['public']['Tables']['posts']['Row']
interface PostItemProps { 
    post: any
    deletePost?: (_: string) => Promise<any>
}

const PostItem = ({ post, deletePost }: PostItemProps) => {
    let me = post.me
    // console.log("[PostItem] - ", me)
    // if(me) {
        return (
            <li className="flex flex-col p-2 items-stretch">
              <div className="flex flex-col bg-slate-300 items-stretch">
                <div className="flex flex-row items-center">
                    <span className="text-md font-bold text-slate-700 px-1">{dateStringFrom(post.timestamp_begin)}</span>
                    <span className="text-sm font-bold text-slate-700 pr-4">{timeStringFrom(post.timestamp_begin)}</span>
                    {/* <span className="flex-grow"></span> */}
                    <span className="ml-auto text-sm text-blue-500">
                    [{post.username} {me}]
                    </span>
                </div>
                  <div className="text-lg font-bold w-auto px-7">{post.title}</div>
                  {/* {post.username} */}
              {/* </div> */}
              </div>
              <div className="text-sm text-blue-500">
                  <a href={post.ticket_url} target="_blank" rel="noopener noreferrer">
                      {post.ticket_url}
                  </a>
              </div>
              <p className="box-border pl-10 mt-2 line-clamp-1">
                {post.content}
                  {/* <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
              </p>
            </li>
          )
    // }
    // else {
    //     return <div></div>
    // }
  }
  export default PostItem
