"use client"
import type { Database } from '@/../lib/database.types'
import PostItem from '../components/PostItem'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
type Posts = Database['public']['Tables']['posts']['Row']

// interface PostDto {
//   id: string
//   createdAt: string
//   // user_id: string
//   title: string
//   content: string
//   timestamp_begin: string
//   timestamp_end: string
// }
const PostList =  () => {
    const [posts, setPosts] = useState<Posts[] | null>(null);
    useEffect(() => {
      async function fetchPosts() {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      }
      fetchPosts();
    }, []);
    // const { data: posts, error } = await 
    // supabase.from('posts')
    // .select(`*, profiles(name)`)
    // .order('timestamp_begin', { ascending: true })
    // console.log("posts", posts);
    // let user = supabase.
    // let userId = user?.id
    const deletePost = async (postId: string) => {
      // trashPost(postId);
    }
    return (
      <div className="w-full">
        <h1 className="mb-12">Posts {posts?.length} </h1>
        <div className="shadow overflow-hidden rounded-md">
          <ul>
            {posts?.map((post) => (
              <PostItem key={post.id} post={post} deletePost={deletePost}/>
                // {/* //</PostItem>deletePost={post.user_id == userId ? deletePost : undefined}/> */}
            ))}
          </ul>
        </div>
      </div>
    )
  }


  export default PostList