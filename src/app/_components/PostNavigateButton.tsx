// "use client"
import type { Database } from '@/lib/database.types'
import { trashPost } from '../_actions/post'
import { localedDateStringFrom, timeStringFrom } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import Link from 'next/link'

type Posts = Database['public']['Tables']['posts']['Row']
interface PostButtonProps { 
    post: Posts
    children?: React.ReactNode
}

const PostNavigateButton = ({ post, children }: PostButtonProps) => {
    // const router = useRouter()
    // const onClick = useCallback((uuid: string) => {
    //   router.push(`/schedule/post/${uuid}`)
    // },[router])
    return (
      <Link href={`/schedule/post/${post.uuid}`} scroll={false}>
        {post.content}
      </Link>
      // <p className="box-border pl-4 mt-2 line-clamp-2 cursor-pointer" onClick={(e) => {
      //   onClick!(post.uuid)
      // }}>
      // </p>
    )
  }
  export default PostNavigateButton
