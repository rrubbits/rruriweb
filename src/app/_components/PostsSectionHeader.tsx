interface PostsSectionHeaderProps {
  numberOfItems: number | undefined
  title: string
  subtitle?: string
  styles?: {root?:string, h2?:string}
  icons?: React.ReactNode;
  children?: React.ReactNode; // children prop 추가
}
// collapsable = false, 
const PostsSectionHeader = ({icons, numberOfItems, title, subtitle, styles}: PostsSectionHeaderProps) => {
  return <h2 className={"font-bold text-x p-2 flex items-center w-full " + styles?.h2}>
      <span className="">
        {title}
      </span>
    <span className="px-2 flex-1 text-blue-300">
      {/* [#3080ff]"> */}
        {subtitle}
    </span>
    { icons && icons }
    {/* <div className="flex-1 w-5">
    </div> */}
    <span className="ml-auto text-sm px-4">
      {numberOfItems != undefined && `${numberOfItems!}件`}
    </span>
  </h2>
}
export default PostsSectionHeader