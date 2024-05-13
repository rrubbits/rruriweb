
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

// function Avatar() {
//   return <Image src="/avatar.jpg" alt="[avatar.jpg]" width="100" height="100"/>
// }

export default function Schedule() {
  return (
    <div className="relative flex flex-col h-full w-full"> 
        <div className="font-semibold text-2xl pl-4">
          SCHEDULE 
        </div>
          {/* <div className="pl-4"><Avatar/></div> */}
        <div className="pt-10">
            <iframe className="absolute w-[100%] h-[90%]" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTokyo&bgcolor=%23ffffff&hl=ja&title=%E3%82%AA%E3%82%B9%E3%83%9F%E3%83%84%E3%82%AD%E3%81%AE%E3%83%9F%E3%83%84%E3%82%AD%E3%83%AB%E3%83%AA&src=ODY3MWNiOTY3NDczY2JjNmMzMGQ2YzBlMDk5YjRlZDE0N2U4YzZiM2RkNDI5YzQ3ZjFkNmEyOGQ5ODQyMGM1ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YTUzMTZkMDY5OGM2YTVhYTBkMDQ0ZmNhYzE5NmZhNjg2OWE5ZjBmM2MxMTU4NWEyMDhiMTJiMDAwNjcwZWQyYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5&color=%23D81B60" 
            width="900" height="600">
{/*   frameborder="0" scrolling="no"> */}
{/* style="border:solid 1px #777" */}
        </iframe>
        </div>
    </div>
  );
}
