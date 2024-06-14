'use server'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import { getUser, getUserProfile } from '@/app/_functions/auth'
import type { Database } from '@/lib/database.types'
import { startOfDayInTimeZone, timeZone_tokyo } from '@/utils/date'
import { addDays } from 'date-fns'
import { createClient, createServerClient } from '@/utils/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
type ProfileType = Database['public']['Tables']['profiles']['Row']
export type Posts = Database['public']['Tables']['posts']['Row'] & { profiles : { name: string, id: string } }
// export type PostsWithProfiles = Posts & { profiles : { name: string, id: string } }
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

export const addPost = async (dto: CreatePostDto): Promise<Posts | null> => {
    // console.
    console.log('[addPost]', dto);
    const supabase = createServerClient()
    // let user = await getUser()
    // let userId = user?.id
    // let {data: profile} = await supabase.from('profiles')
    // .select('*')
    // .eq('id', userId!)
    // .single()
    let profile = await getUserProfile()
    // console.log("[addPost] profile", profile, userId, user)
    if(!profile) {
      console.error("[addPost] !profile")
      return null
    }
    const { data, error } = await supabase
      .from('posts')
      .insert({...dto, profile_id: profile!.id})
      .select()
      .single()
    if (error) {
      console.error('Error adding post:', error);
      return null;
    }
    let post = data as Posts
    revalidateTag('posts')
    revalidateTag('post/' + post.uuid)
    return post
};
  
export const deletePost = async (uuid: string): Promise<boolean> => {
  const supabase = createServerClient()
  let profile = await getUserProfile()
  if(!profile) {
    console.error('[deletePost] !profile')
    return false
  }
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select() //'profile_id')
    .eq('uuid', uuid)
    .single();
  if (postError) {
    console.error('[deletePost] Error fetching post:', postError);
    return false;
  }
  if(!post || post.profile_id != profile.id) {
    console.error('[deletePost] !post || profile_id != userId', postError);
    return false;
  }
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('uuid', uuid);
  if (error) {
    console.error('[deletePost] Error deleting post:', error);
    return false;
  }
  revalidateTag('posts')
  revalidateTag('post/' + uuid)
  return true; 
};

export const updatePost = async (uuid: string, updatePostDto: UpdatePostDto): Promise<Posts | null> => {
  // const { title, content, dateStr, openingTime, startingTime } = updatePostDto;
  const supabase = createServerClient()
  let profile = await getUserProfile()
  if(!profile) {
    console.error('[updatePost] !profile')
    return null
  }
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select() //'profile_id')
    .eq('uuid', uuid)
    .single();
  if (postError) {
    console.error('[updatePost] Error fetching post:', postError);
    return null;
  }
  if(!post || post.profile_id != profile.id) {
    console.error('[updatePost] !post || profile_id != userId');
    return null;
  }
  const { data, error } = await supabase
    .from('posts')
    .update( updatePostDto )
    // { title: updatePostDto.title, content: updatePostDto.content, timestamp_begin: updatePostDto.timestamp_begin, timestamp_end: updatePostDto.timestamp_end, updated_at: new Date().toISOString() })
    .eq('id', uuid)
    .select()
    .single();

  if (error) {
    console.error('[updatePost] Error editing post:', error);
    return null;
  }
  revalidateTag('posts')
  revalidateTag('post/' + uuid)
  return data as Posts;
};
export const trashPost = async (uuid: string): Promise<Posts | null> => {
  const supabase = createServerClient()
  let profile = await getUserProfile()
  if(!profile) {
    console.error('[updatePost] !profile')
    return null
  }
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select() //'profile_id')
    .eq('uuid', uuid)
    .single();
  if (postError) {
    console.error('[updatePost] Error fetching post:', postError);
    return null;
  }
  if(!post || post.profile_id != profile.id) {
    console.error('[updatePost] !post || profile_id != userId');
    return null;
  }
  const { data, error } = await supabase
    .from('posts')
    .update({ deleted_at: new Date().toISOString() })
    // { title: updatePostDto.title, content: updatePostDto.content, timestamp_begin: updatePostDto.timestamp_begin, timestamp_end: updatePostDto.timestamp_end, updated_at: new Date().toISOString() })
    .eq('id', uuid)
    .select()
    .single();

  if (error) {
    console.error('[updatePost] Error editing post:', error);
    return null;
  }
  revalidateTag('posts')
  revalidateTag('post/' + uuid)
  return data as Posts;
};
