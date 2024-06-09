'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getUser } from './auth'
import type { Database } from '@/lib/database.types'
import { startOfDayInTimeZone, timeZone_tokyo } from '@/utils/date'
import { addDays } from 'date-fns'
export type Posts = Database['public']['Tables']['posts']['Row']
// type ProfileType = Database['public']['Tables']['profiles']['Row']

export interface CreatePostDto {
  //   createdAt: string
    title: string
    content: string
    timestamp_begin: string
    timestamp_end?: string | undefined
    ticket_url: string | undefined
    location: string | undefined
  }
export type UpdatePostDto = Partial<CreatePostDto>

export const getPosts = async (): Promise<Posts[]> => {
    const supabase = createServerComponentClient<Database>({ cookies })
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
  type PostWithProfiles = Posts & { profiles : { name: string, id: string } }

  export const getPostsOfToday = async (): Promise<PostWithProfiles[]> => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user;
    
    const startOfTodayJST = startOfDayInTimeZone(new Date(), timeZone_tokyo)
    const endOfTodayJST = addDays(startOfTodayJST, 1)

    const { data, error } = await supabase
      .from('posts')
      .select(`
        timestamp_begin,
        deleted_at,
      `)
      .order('timestamp_begin', { ascending: true })
      .gte('timestamp_begin', startOfTodayJST.toISOString()) // 日本時間の今日の開始
      .lt('timestamp_begin', endOfTodayJST.toISOString()) // 日本時間の今日の終了    
      .is('deleted_at', null)
      .select(`
        *,
        profiles(name, id)
      `)
      // title,
      // timestamp_begin,
      // ticket_url,
      // location,
      // content,
      // uuid,
    if (error) {
      console.error('Error fetching posts:', error);
      throw Error(error.message)
    }
    if(data) {
      console.log("[GET] ", user)
      let posts = data.map((post) => {
        // console.log("[post] ", post, post.profiles?.name, user?.id === post.user_id)
        return {
        ...post,
        // username: post.profiles?.name,
        me: user?.id === post.profiles?.id
      }})
      return data as PostWithProfiles[]
    }
    if (error) {
      console.error('Error fetching posts:', error);
    }
    return []
  }

  export const getPost = async (uuid: string): Promise<Posts | undefined> => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data, error } = await supabase
    .from('posts')
    .select()//, profiles!inner(name)')
    .eq('uuid', uuid)
    .single()
    // .is('deleted_at', null);
    if (error) {
      console.error('Error fetching posts:', error);
      return undefined //[];
    }
    console.log("[getPost]", uuid, data);
    return data //as Posts //as Posts[]
  }
  export const addPost = async (dto: CreatePostDto): Promise<Posts | null> => {
      // console.
      console.log('[addPost]', dto);
      const supabase = createServerComponentClient<Database>({ cookies })
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
    const supabase = createServerComponentClient<Database>({ cookies })
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
  
export const updatePost = async (postId: string, updatePostDto: UpdatePostDto): Promise<Posts | null> => {
  // const { title, content, dateStr, openingTime, startingTime } = updatePostDto;
  const supabase = createServerComponentClient<Database>({ cookies })

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
  const supabase = createServerComponentClient<Database>({ cookies })
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
