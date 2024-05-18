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
              <div className="flex flex-row bg-slate-300 items-center">
                  <div className="text-2xl font-bold text-slate-700 px-2">{formatDate(post.timestamp_begin)}</div>
                  <div className="text-md font-bold text-slate-700 pr-4">{timeStringFrom(post.timestamp_begin)}</div>

                  <div className="text-2xl font-bold">{post.title}</div>
                  <div className="flex-grow">
                  </div>
                  {/* {me &&
                    (<button className="mx-6 text-red-500" onClick={()=>{deletePost(post.id)}}>
                      Delete
                    </button>) 

                  } */}
                  <div className="ml-auto text-blue-500">
                    [{post.username} {me}]
                  </div>
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
