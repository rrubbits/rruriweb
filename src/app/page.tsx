// "use client"
import Image from "next/image";
// import Sidebar from "@/components/Sidebar";

function Card() {
  return <Image src="/card2.jpg" alt="card" width="600" height="300" layout="responsive"/>
  // fill" objectFit="cover"
}
export default function Home() {
  console.log("[Home] Render")
  return (
      <div className="flex flex-col h-full w-full"> 
          <div className="pb-10">
          HOME
          </div>
          <div className="relative flow rounded-[5%] overflow-hidden">
            <Card/>
            <div className="absolute inset-0 flex justify-center"> {/* 오버레이 레이어 */}
                <p className="absolute text-white text-[4vw] font-bold top-[23%] left-[40%]">
                  ミツキルリの<br/>オスミツキ！
                </p>
            </div>
          </div>
    </div>
  );
}
