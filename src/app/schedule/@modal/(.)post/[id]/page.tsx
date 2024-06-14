// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
import type { Database } from '@/lib/database.types'
// import PostItem from '@/app/_components/PostItem'
// import { getPost } from '@/app/_actions/post'
import { Modal } from './modal'
// import PostView from '@/app/_components/PostView'
import PostViewWithUuid from '@/app/_components/PostViewWithUuid'
import { Suspense } from 'react'
import PostViewFrame from '@/app/_components/PostViewFrame'
import { Posts, getPosts } from '@/app/_functions/post'
import { unstable_cache } from 'next/cache'
// type Posts = Database['public']['Tables']['posts']['Row']
const getPosts_ = () => unstable_cache(getPosts, ['posts'], { tags: ['posts']})()
export async function generateStaticParams() {
    const posts = await getPosts_()
	// const response = await fetch('http://localhost:3000/api/posts')
	// const posts: Posts[] = await response.json()
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