"use client"
import type { Database } from '@/lib/database.types'
import { trashPost } from '../_actions/post'
import { localedDateStringFrom, timeStringFrom } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type Posts = Database['public']['Tables']['posts']['Row']
interface PostButtonProps { 
    post: Posts
    children?: React.ReactNode
}

const PostNavigateButton = ({ post, children }: PostButtonProps) => {
    const router = useRouter()
    const onClick = useCallback((uuid: string) => {
      router.push(`/schedule/post/${uuid}`)
    },[router])
    return (
      <p className="box-border pl-4 mt-2 line-clamp-2 cursor-pointer" onClick={(e) => {
        onClick!(post.uuid)
      }}>
        {post.content}
      </p>
    )
  }
  export default PostNavigateButton
