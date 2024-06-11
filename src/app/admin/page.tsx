import GroupedPostList from '../_components/GroupedPostList';
import PostsCalendar from '../_components/PostsCalendar'
import { getPosts } from '../_functions/post';
import { eventsForGroupedPosts, groupPostsByDate } from '../schedule/page';
// import { revalidatePath } from 'next/cache';

export default async function Admin() {
  const data = await getPosts()
  const groupedPosts = groupPostsByDate(data, ['past', 'today', 'future'])
  const events = eventsForGroupedPosts(groupedPosts)

  return (
    <div className="flex flex-col items-center bg-white">
      <PostsCalendar events={events}>
        <GroupedPostList groupedPosts={groupedPosts}/>
      </PostsCalendar>
    </div>
  );
}