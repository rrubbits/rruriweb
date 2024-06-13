interface PostsSectionHeaderProps {
  numberOfItems: number | undefined
  title: string
  styles?: {root?:string, h2?:string}
  icons?: React.ReactNode;
  children?: React.ReactNode; // children prop 추가
}
// collapsable = false, 
const PostsSectionHeader = ({icons, numberOfItems, title, styles}: PostsSectionHeaderProps) => {
  return <h2 className={"font-bold text-x p-2 flex items-center w-full " + styles?.h2}>
      <span className="pr-4">
        {title}
      </span>
      {/* <div className="w-5"> */}
       { icons && icons }
      {/* </div> */}
    <span className="ml-auto text-sm">
      {numberOfItems && `${numberOfItems!}件`}
    </span>
  </h2>
}
export default PostsSectionHeader