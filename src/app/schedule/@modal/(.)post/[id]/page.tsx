import { Modal } from './modal'
import PostViewWithUuid from '@/app/_components/PostViewWithUuid'
import { Suspense } from 'react'
import PostViewFrame from '@/app/_components/PostViewFrame'
import { getPosts_ } from '@/app/_functions/post'
export async function generateStaticParams() {
    const posts = await getPosts_()
	return posts.map((post) => ({
		id: post.uuid    
    }))
}
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