// 'use server'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createServerClient } from '@/utils/supabase/server'

export const getUser = async () => {
  const supabase = createServerClient()// createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data.user;
};

export const getUserProfile = async () => {
  const supabase = createServerClient()
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  let {data: profile} = await supabase.from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()
    return profile
  };
  