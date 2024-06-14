export const dynamic = 'force-dynamic'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { cookies } from 'next/headers'
import CreatePost from '../_components/CreatePost'
import { getUser } from '@/app/_functions/auth'
// import CreatePost from './_components/CreatePost'
// import { revalidatePath } from 'next/cache';

export default async function Admin() {
  const user = await getUser()
  // const supabase = createServerComponentClient<Database>({
  //     cookies,
  //   })
  // const {
  //   data: { session }, error: sessionError
  // } = await supabase.auth.getSession()
  // const { data: user, error } = await supabase.auth.getUser();
  return (
    <div className="items-center">
        { user && <CreatePost/> }
    </div>
  );
}