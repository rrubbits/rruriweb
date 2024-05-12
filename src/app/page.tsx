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
      {/* // min-h-screen flex-col items-center justify-between p-24"> */}
        {/* <div className="flex"> */}
          <div className="pb-10">
          HOME
          </div>
          {/* <div className="flex-col"> */}
          <div className="relative flow rounded-[5%] overflow-hidden bg-white">
            <Card/>
            <div className="absolute inset-0 flex justify-center"> {/* 오버레이 레이어 */}
      
                <p className="absolute text-white text-[4vw] font-bold top-[23%] left-[40%]">
                  ミツキルリの<br/>オスミツキ！
                </p> {/* 오버레이 텍스트 */}
            </div>
          </div>
          {/* <Sidebar></Sidebar> */}
            {/* <div className="grow shrink basis-0 self-stretch p-12 flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2.5 flex">
                <div className="Home self-stretch text-black text-4xl font-semibold font-['Inter']">HOME</div>
                <img className="1 self-stretch grow shrink basis-0" src="https://via.placeholder.com/896x704" />
              </div>
            </div> */}
          {/* </div> */}
    </div>
  );
}
