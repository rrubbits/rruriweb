import { getPost_ } from '../_functions/post'
import PostView from './PostView'
interface PostViewWithUuidProps { 
    uuid: string
}
const PostViewWithUuid = async ({ uuid }: PostViewWithUuidProps) => {
  const post = await getPost_(uuid)
  return (
    <PostView post={post}/>
  )
}
export default PostViewWithUuid
