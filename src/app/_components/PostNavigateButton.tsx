// "use client"
// import type { Database } from '@/lib/database.types'
// import { trashPost } from '../_functions/post'
import Link from 'next/link'
import { Posts } from '../_functions/post'
interface PostButtonProps { 
    post: Posts
    children?: React.ReactNode
}

const PostNavigateButton = ({ post, children }: PostButtonProps) => {
  // console.log("PostNavigateButton", post)
    return (
      <Link href={`/schedule/post/${post.uuid}`} scroll={false}>
        <p className="box-border pl-4 mt-2 line-clamp-2 cursor-pointer">
          {post.content}
        </p>
      </Link>
    )
  }
  export default PostNavigateButton
