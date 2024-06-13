import PostsSectionHeader from './PostsSectionHeader'

interface PostsSectionProps {
  // collapsable?: boolean
  // isCollapsed: boolean
  // posts: Posts[] | undefined
  key: string
  numberOfItems: number | undefined
  title: string
  // onClickItem: ((uuid: string) => void) | undefined
  // onClick: () => void
  styles?: {root?:string, h2?:string}
  children?: React.ReactNode; // children prop 추가
}

const PostsSection = ({key, numberOfItems, title, styles, children}: PostsSectionProps) => {
  return <div key={key} className={"bg-slate-200 rounded-md my-2 " + styles?.root}>
  {/* // "bg-slate-200 rounded-md my-2 opacity-50" */}
  {/* <button className="flex items-center w-full mb-4" onClick={() => setIsCollapsed(p => !p)}> */}
    <PostsSectionHeader title={title} numberOfItems={numberOfItems} styles={styles}/>
  {/* </button> */}
  {children}
</div>
}

export default PostsSection