import { Posts, getPosts } from '../_functions/post'
import PostsCalendar from '../_components/PostsCalendar'
import GroupedPostList from '../_components/GroupedPostList'
import { CalendarEvent, eventsForGroupedPosts, groupPostsByDate } from '../_components/_utils/post'
import { unstable_cache } from 'next/cache'

const getPosts_ = () => unstable_cache(getPosts, ['posts'], { tags: ['posts']})()
const Schedule = async () => {
  // const response = await fetch('http://localhost:3000/api/posts') //, {next: { revalidate: 0 }})
  // const data = await response.json() as Posts[];
  // console.log("[Schedule.fetchz] ", data.length,  data, )
  
  const data: Posts[] = await getPosts_()
  const groupedPosts: {[key:string]: Posts[]} = groupPostsByDate(data, ['past', 'today', 'future'])
  const events: CalendarEvent[] = eventsForGroupedPosts(groupedPosts)
  return (
    <div className="flex flex-col items-center min-h-[100vh] pb-4">
      <PostsCalendar events={events}>
        <GroupedPostList groupedPosts={groupedPosts}/>
      </PostsCalendar>
    </div>
  )
}

export default Schedule