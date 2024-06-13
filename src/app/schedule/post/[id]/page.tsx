// "use client"
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
// import type { Database } from '@/lib/database.types'
// import PostItem from '@/app/_components/PostItem'
import { Posts, getPost, getPosts } from '@/app/_functions/post'
import PostView from '@/app/_components/PostView'

// type Posts = Database['public']['Tables']['posts']['Row']
export async function generateStaticParams() {
    const posts = await getPosts()
	// const response = await fetch('http://localhost:3000/api/posts')
	// const posts: Posts[] = await response.json()
	return posts.map((post) => ({
		id: post.uuid    
    }))
}

const Schedule = async (props : {params: {id: string}}) => {
    const params = props.params
    console.log("<Schedule/post/[id]>", params, props)
    let post = await getPost(params.id!)
    console.log("<Schedule/post/[id]>", post)

    return (
    <div className="flex flex-col w-full items-center">
        <div className="w-[80%] max-w-[500px]">
            <PostView post={post}/>
        </div>
    </div>
    )
}

export default Schedule