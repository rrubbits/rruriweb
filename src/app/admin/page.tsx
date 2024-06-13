import GroupedPostList from '../_components/GroupedPostList';
import PostsCalendar from '../_components/PostsCalendar'
import { eventsForGroupedPosts, groupPostsByDate } from '../_components/_utils/post';
import { getPosts } from '../_functions/post';

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