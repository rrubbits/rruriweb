import { unstable_cache } from 'next/cache'
import { getPost } from '../_functions/post'
import PostView from './PostView'
interface PostViewWithUuidProps { 
    uuid: string
}
const getPost_= (uuid: string) => unstable_cache(getPost, ['post', uuid], { tags: [`post/${uuid}`]})(uuid)
const PostViewWithUuid = async ({ uuid }: PostViewWithUuidProps) => {
  const post = await getPost_(uuid)
  return (
    <PostView post={post}/>
  )
}
  export default PostViewWithUuid
