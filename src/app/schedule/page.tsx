// "use client"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { Database } from '@/lib/schema'
// import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import type { Database } from '@/../lib/database.types'
import PostList from '../components/PostList'
// import supabase from '@/lib/supabase'

interface PostDto {
  id: string
  createdAt: string
  // user_id: string
  title: string
  content: string
  timestamp_begin: string
  timestamp_end: string
}

// メインページ
const Schedule = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // const [newTaskText, setNewTaskText] = useState('')
  // const addTodo = async (taskText: string) => {
  //   let task = taskText.trim()
  //   if (task.length) {
  //     const { data: todo, error } = await supabase
  //       .from('todos')
  //       .insert({ task, user_id: user.id })
  //       .select()
  //       .single()

  //     if (error) {
  //       setErrorText(error.message)
  //     } else {
  //       setTodos([...todos, todo])
  //       setNewTaskText('')
  //     }
  //   }
  // }

  // const deleteTodo = async (id: number) => {
  //   try {
  //     await supabase.from('todos').delete().eq('id', id).throwOnError()
  //     setTodos(todos.filter((x) => x.id != id))
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  return (
    <div className="w-full">
      <PostList/>
    </div>
  )
}

export default Schedule