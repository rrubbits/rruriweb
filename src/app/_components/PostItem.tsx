import type { Database } from '@/lib/database.types'
import { Posts } from '../_functions/post'
import { localedDateStringFrom, timeStringFrom } from '@/utils/date'
import PostNavigateButton from './PostNavigateButton'

// type Posts = Database['public']['Tables']['posts']['Row']
interface PostItemProps { 
    post: Posts
    deletePost?: (uuid: string) => Promise<any>
    // onClick?: (uuid: string) => void
}

const PostItem = ({ post, deletePost }: PostItemProps) => {
    // let me = post.me
    // console.log("[PostItem] - ", post)
    // if(me) {
        return (
            <li className="flex flex-col p-2 items-stretch">
              <div className="flex flex-col bg-slate-300 items-stretch">
                <div className="flex flex-row items-center">
                    <span className="text-md font-bold text-slate-700 px-1">{localedDateStringFrom(post.timestamp_begin!)}</span>
                    <span className="text-sm font-bold text-slate-700 pr-4">{timeStringFrom(post.timestamp_begin!)}</span>
                    {/* <span className="flex-grow"></span> */}
                    <a className="inline-flex pr-4 justify-start" href={`https://www.google.com/maps/search/?api=1&query=${post.location}`} target="_blank">
                        <span className="text-sm font-bold text-blue-600 truncate">
                            {post.location}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><path fill="#3ddab4" d="M17.425,34.114c1.296,1.621,2.616,3.658,3.306,4.889c0.841,1.6,1.19,2.681,1.816,4.616 C22.913,44.679,23.261,45,23.993,45c0.8,0,1.166-0.54,1.446-1.381c0.585-1.816,1.036-3.197,1.751-4.513 c2.756-5.197,7.248-8.89,9.779-13.95c0,0,1.665-3.091,1.665-7.419c0-4.035-1.641-6.838-1.641-6.838l-19.557,23.25L17.425,34.114z"/><path fill="#f5bc00" d="M10.792,24.609c1.576,3.59,4.582,6.736,6.633,9.505l10.873-12.89c0,0-1.535,2.01-4.308,2.01 c-3.091,0-5.607-2.462-5.607-5.573c0-2.14,1.275-3.624,1.275-3.624c-8.001,1.19-7.556,3.128-8.89,10.565L10.792,24.609z"/><path fill="#6c19ff" d="M28.435,3.674c3.624,1.166,6.701,3.624,8.548,7.214l-8.684,10.36c0,0,1.275-1.491,1.275-3.624 c0-3.176-2.681-5.573-5.573-5.573c-2.746,0-4.308,1.986-4.308,1.986c0.667-1.518,7.556-9.847,8.753-10.36L28.435,3.674z"/><path fill="#2100c4" d="M12.775,8.231C14.936,5.66,18.724,3,23.956,3C26.482,3,28.4,3.67,28.4,3.67l-8.719,10.36 c-0.588-0.319-6.325-4.787-6.907-5.812V8.231z"/><path fill="#f55376" d="M10.792,24.609c0,0-1.426-2.831-1.426-6.907c0-3.864,1.511-7.248,3.419-9.437l6.907,5.812 l-8.89,10.531H10.792z"/></svg>
                    </a>
                    <span className="ml-auto text-sm text-slate-500">
                    by <span className="font-bold">{post.profiles?.name ?? ""} {}</span>
                    </span>
                </div>
                  <div className="text-lg font-bold w-auto px-7">{post.title}</div>
                  {/* {post.username} */}
              {/* </div> */}
              </div>
              <div className="text-sm text-blue-500">
                  <a href={post.ticket_url ?? undefined } target="_blank" rel="noopener noreferrer">
                      {post.ticket_url}
                  </a>
              </div>
              <PostNavigateButton post={post!}>
                {post.content}
              </PostNavigateButton>
              <div className="text-sm text-blue-500">
                {post.uuid ?? "(NO UUID)"}
              </div>
            </li>
          )
  }
  export default PostItem
