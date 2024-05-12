import Image from "next/image";
import Sidebar from "@/components/Sidebar";

function Avatar() {
  return <Image src="/avatar.jpg" alt="[avatar.jpg]" width="100" height="100"/>
}

export default function Profile() {
  return (
    <div className="flex flex-col h-full w-full"> 
          PROFILE 
          <div className="pl-4"><Avatar/></div>
          <div className="pt-10">
          大島はるなプロデュースのアニソン･ゲーソンシンガー <br/>
【親しき僕らに礼儀なし (@SHINBOKU_OA) メンバー】<br/>
【#ボイステラス6 #GRABTHE6 ファイナリスト 】<br/>
『オカルティックな喫茶店へようこそ！』主題歌担当 <br/>
『WANNABE→CREATORS』 ED歌唱 #ミツキルリ出演 #ミツキルリスケジュール <br/>
          </div>
    </div>
  );
}
