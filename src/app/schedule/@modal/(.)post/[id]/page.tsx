import { Modal } from './modal'
import PostViewWithUuid from '@/app/_components/PostViewWithUuid'
import { Suspense } from 'react'
import PostViewFrame from '@/app/_components/PostViewFrame'
import { Posts, getPosts } from '@/app/_functions/post'
import { unstable_cache } from 'next/cache'
// type Posts = Database['public']['Tables']['posts']['Row']
const getPosts_ = () => unstable_cache(getPosts, ['posts'], { tags: ['posts']})()
// export async function generateStaticParams() {
//     const posts = await getPosts_()
// 	// const response = await fetch('http://localhost:3000/api/posts')
// 	// const posts: Posts[] = await response.json()
// 	return posts.map((post) => ({
// 		id: post.uuid    
//     }))
// }
const Schedule = async ({params} : {params: {id: string}}) => {
    console.log("<Schedule/post/[id]>", params)
    return (
        <Modal>
            <div className="flex flex-col w-full items-center">
                <Suspense fallback={<PostViewFrame/>}>
                    <PostViewWithUuid uuid={params.id!}/>
                </Suspense>
            </div>        
        </Modal>
    )
}
export default Schedule