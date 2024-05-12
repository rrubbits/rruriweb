import Image from "next/image";
import Sidebar from "@/components/Sidebar";

function Avatar() {
  return <Image src="/avatar.jpg" alt="[avatar.jpg]" width="100" height="100"/>
}

export default function Profile() {
  return (
      // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="flex flex-col h-full w-full"> 

      {/* // min-h-screen flex-col items-center justify-between p-24"> */}
        {/* <div className="flex"> */}
          PROFILE 
          <div className="pl-4"><Avatar/></div>
          <div className="pt-10">
          大島はるなプロデュースのアニソン･ゲーソンシンガー <br/>
【親しき僕らに礼儀なし (@SHINBOKU_OA) メンバー】<br/>
【#ボイステラス6 #GRABTHE6 ファイナリスト 】<br/>
『オカルティックな喫茶店へようこそ！』主題歌担当 <br/>
『WANNABE→CREATORS』 ED歌唱 #ミツキルリ出演 #ミツキルリスケジュール <br/>
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
    // </main>
  );
}
