"use client"
import Image from "next/image";
import Link from "next/link";
import PostList from "./_components/PostList";
import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";

function Card() {
  return <Image src="/card2.jpg" alt="card" width="600" height="300" layout="responsive"/>
  // fill" objectFit="cover"
}

export default function Home() {
  console.log("[Home] Render")
  const router = useRouter()
  return (
      <div className="flex flex-col h-full w-full"> 
          <div className="inline-flex">
            <span className="font-semibold text-2xl pl-4">
              HOME
            </span>
            <div className="pb-2 px-2 pl-8 flex-1 max-w-[52rem]">
            <PostList options={{sections: ['today']}} onClick={(uuid) => {
              router.push(`/schedule/post/${uuid}`)
            }}/>
          </div>

          </div>
          
          <div className="pt-8 pb-2 px-2 max-w-[60rem]">
            <div className="relative rounded-[2vw] overflow-hidden"> {/* overlay layer */}
              <Card/>
              <div className="absolute inset-0 flex justify-center "> 
                  <p className="absolute text-white text-[4vw] xl:text-[3.2rem] font-bold top-[23%] left-[40%]">
                    ミツキルリの<br/>オスミツキ！
                  </p>
                  {/* <Link className={textColor} href={href}>
                      {title}
                  </Link>  */}

                  <Link className="absolute text-white text-[4vw] xl:text-[3.3rem] font-bold
                                 top-[65.9%] left-[41.9%] w-[14.4%] h-[22.4%]
                                 hover:text-blue-500" 
                        rel="noopener noreferrer" target="_blank"
                        href="https://twitter.com/ruri_rba1010">
                    <p className="absolute -top-[35%] -left-[10%] text-[40%] w-[150%]">
                      公式Xアカウント
                    </p>
                    <div className="w-full h-full hover:opacity-70 opacity-70 text-gray-300 hover:text-blue-300 hover:bg-blue-500">
                    </div>
                  </Link>
                  <Link className="absolute text-white text-[4vw] xl:text-[3.3rem] font-bold
                              top-[65.9%] left-[59.55%] w-[14.4%] h-[22.4%]
                              hover:text-blue-500"
                        rel="noopener noreferrer" target="_blank"
                        href="https://me-qr.com/wetTTEux">
                    <p className="absolute -top-[35%] -left-[10%] text-[40%] w-[150%]">
                        公式instagram
                      </p>
                      <div className="w-full h-full hover:opacity-70 opacity-70 text-gray-300 hover:text-blue-300 hover:bg-blue-500">
                    </div>
                  </Link>
                  <Link className="absolute text-white text-[4vw] xl:text-[3.3rem] font-bold
                                top-[65.9%] left-[77.1%] w-[14.4%] h-[22.4%] 
                                hover:text-blue-500"
                        rel="noopene noreferrer" target="_blank"
                        href="https://twitter.com/ruri__SEITAN">
                    <p className="absolute -top-[35%] -left-[10%] text-[40%] w-[170%]">
                        非公式FCアカウント
                      </p>
                      <div className="w-full h-full hover:opacity-70 opacity-70 text-gray-300 hover:text-blue-300 hover:bg-blue-500">
                    </div>
                  </Link>
              </div>
            </div>
          </div>
    </div>
  );
}

// {/* <p className="absolute text-white text-[4vw] font-bold top-[66%] left-[42%] border-2 w-[14%] h-[22%]">
//                   </p> */}
