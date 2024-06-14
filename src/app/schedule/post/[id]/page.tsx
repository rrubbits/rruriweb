import PostViewWithUuid from '@/app/_components/PostViewWithUuid'
import { getPosts_ } from '@/app/_functions/post'
export async function generateStaticParams() {
    const posts = await getPosts_()
	// const response = await fetch('http://localhost:3000/api/posts')
	// const posts: Posts[] = await response.json()
	return posts.map((post) => ({
		id: post.uuid    
    }))
}

const Schedule = async ({params: {id: uuid}} : {params: {id: string}}) => {
    // const params = props.params
    return (
    <div className="flex flex-col w-full items-center">
        <div className="w-[80%] max-w-[500px]">
            <PostViewWithUuid uuid={uuid}/>
        </div>
    </div>
    )
}
export default Schedule