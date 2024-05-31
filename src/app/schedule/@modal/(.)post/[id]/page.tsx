// "use client"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'
import type { Database } from '@/lib/database.types'
import PostItem from '@/app/_components/PostItem'
import { getPost } from '@/app/_actions/post'
import { Modal } from './modal'
import PostView from '@/app/_components/PostView'

type Posts = Database['public']['Tables']['posts']['Row']

const Schedule = async ({params} : {params: {id: string}}) => {
    console.log("<Schedule/post/[id]>", params)
    let post = await getPost(params.id)

    return (
    <Modal>
        <div className="flex flex-col w-full items-center">
            <PostView post={post}/>
        </div>        
    </Modal>
    )
}

export default Schedule