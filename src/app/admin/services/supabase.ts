import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/../lib/database.types'
type Posts = Database['public']['Tables']['posts']['Row']
type ProfileType = Database['public']['Tables']['profiles']['Row']

const supabase = createServerComponentClient<Database>({ cookies })
export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data.user;
  };

export const getPosts = async (): Promise<Posts[]> => {
    const { data, error } = await supabase
    .from('posts')
    .select()//, profiles!inner(name)')
    // .is('deleted_at', null);

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data as Posts[]
}
interface CreatePostDto {
//   createdAt: string
  title: string
  content: string
  timestamp_begin: string
  timestamp_end: string
  ticket_url: string
  location: string
}

export const addPost = async (dto: CreatePostDto): Promise<Posts | null> => {
    // console.
    let user = await getUser()
    let userId = user?.id
    let {data: profile} = await supabase.from('profiles')
    .select('*')
    .eq('id', userId!)
    .single()
    console.log("[addPost] profile", profile, userId, user)
    const { data, error } = await supabase
      .from('posts')
      .insert({...dto, profile_id: profile?.id})
      .single();
  
    if (error) {
      console.error('Error adding post:', error);
      return null;
    }
  
    return data as Posts;
};

export const deletePost = async (postId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);
  
    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  
    return true;
  };
  interface UpdatePostDto {
    //   createdAt: string
      title: string | undefined
      content: string | undefined
      timestamp_begin: string | undefined
      timestamp_end: string | undefined
      ticket_url: string | undefined
    }
  export const editPost = async (postId: string, updatePostDto: UpdatePostDto): Promise<Posts | null> => {
    // const { title, content, dateStr, openingTime, startingTime } = updatePostDto;
    let user = await getUser()
    let userId = user?.id
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();
  
    if (fetchError) {
      console.error('Error fetching post:', fetchError);
      return null;
    }
  
    if (post?.user_id !== userId) {
      console.error('Error: User is not authorized to edit this post');
      return null;
    }
  
    const { data, error } = await supabase
      .from('posts')
      .update( updatePostDto )
      // { title: updatePostDto.title, content: updatePostDto.content, timestamp_begin: updatePostDto.timestamp_begin, timestamp_end: updatePostDto.timestamp_end, updated_at: new Date().toISOString() })
      .eq('id', postId)
      .single();
  
    if (error) {
      console.error('Error editing post:', error);
      return null;
    }
  
    return data as Posts;
  };
  export const trashPost = async (postId: string): Promise<Posts | null> => {
    // const { title, content, dateStr, openingTime, startingTime } = updatePostDto;
    let user = await getUser()
    let userId = user?.id
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();
  
    if (fetchError) {
      console.error('Error fetching post:', fetchError);
      return null;
    }
  
    if (post?.user_id !== userId) {
      console.error('Error: User is not authorized to edit this post');
      return null;
    }
  
    const { data, error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', postId)
      .single();
  
    if (error) {
      console.error('Error editing post:', error);
      return null;
    }
  
    return data as Posts;
  };
