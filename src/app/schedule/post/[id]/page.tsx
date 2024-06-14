// "use client"
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
// import type { Database } from '@/lib/database.types'
// import PostItem from '@/app/_components/PostItem'
import { Posts, getPost, getPosts } from '@/app/_functions/post'
// import PostView from '@/app/_components/PostView'
import { unstable_cache } from 'next/cache'
import PostViewWithUuid from '@/app/_components/PostViewWithUuid'

const getPosts_ = () => unstable_cache(getPosts, ['posts'], { tags: ['posts']})()
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