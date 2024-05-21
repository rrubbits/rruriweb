"use client"
import type { Database } from '@/../lib/database.types'
import { getUser, trashPost } from '../admin/services/supabase'

function formatDate(dateString: string): string {
    const date = new Date(dateString+"Z");
    console.log("[formatDate] - ", dateString, date)
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric',   weekday: 'short', timeZone: "Asia/Tokyo"};
    return date.toLocaleDateString("ja-JP", options);
}
function timeStringFrom(dateString: string): string {
    const date = new Date(dateString+"Z");
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: "Asia/Tokyo"};
    return date.toLocaleTimeString("ja-JP", options);
}

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
                    <span className="text-md font-bold text-slate-700 px-1">{formatDate(post.timestamp_begin)}</span>
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
              <div className="box-border p-4 pl-10">
                  <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
            </li>
          )
    // }
    // else {
    //     return <div></div>
    // }
  }
  export default PostItem
