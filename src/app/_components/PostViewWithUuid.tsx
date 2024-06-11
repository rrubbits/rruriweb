import type { Database } from '@/lib/database.types'
import { getPost, trashPost } from '../_functions/post'
import { localedDateStringFrom, timeStringFrom } from '@/utils/date'
import PostView from './PostView'

// type Posts = Database['public']['Tables']['posts']['Row']
interface PostViewWithUuidProps { 
    uuid: string
}

const PostViewWithUuid = async ({ uuid }: PostViewWithUuidProps) => {
  let post = await getPost(uuid)
  return (
    <PostView post={post}/>
  )
}
  export default PostViewWithUuid
