import 'server-only'

import type { Database } from '@/lib/database.types'
import { startOfDayInTimeZone, timeZone_tokyo } from '@/utils/date'
import { addDays } from 'date-fns'
import { createClient } from '@/utils/supabase/server'
// import { cache } from 'react'
import { unstable_cache } from 'next/cache'
type ProfileType = Database['public']['Tables']['profiles']['Row']
export type Posts = Database['public']['Tables']['posts']['Row'] & { profiles : { name: string, id: string } }

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

export const getPosts_ = () => unstable_cache(getPosts, ['posts'], { tags: ['posts', 'post'] })()
export const getPosts = async (): Promise<Posts[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`*, profiles(name)`)
    .is('deleted_at', null)  
    .order('timestamp_begin', { ascending: true })
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data as Posts[]
  // return []
}

export const getPostsOfToday_ = () => unstable_cache(getPostsOfToday, ['posts', 'today'], { tags: ['posts', 'post', 'today']})()
export const getPostsOfToday = async (): Promise<Posts[]> => {
  const supabase = createClient()  

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
  if (error) {
    console.error('Error fetching posts:', error);
    throw Error(error.message)
  }
  if(data) {
    return data as Posts[]
  }
  if (error) {
    console.error('Error fetching posts:', error);
  }
  return []
}

export const getPost_= (uuid: string) => unstable_cache(getPost, ['post', uuid], { tags: [`post/${uuid}`]})(uuid)
export const getPost = async (uuid: string): Promise<Posts | undefined> => {
  const supabase = createClient()
  // <Database>({ cookies })
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
