// "use client";
import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';

export default function ResponsiveLayout({ children }) {
    let title = "ミツキルリのオスミツキ";
    // const [showSidebar, setShowSidebar] = useState(false);
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="min-h-screen">
                <div className="flex">
                    <Sidebar title={title}/>
                     {/* show={showSidebar} setter2={() => {
                        setShowSidebar(oldVal =>!oldVal);
                    }} /> */}
                    {/* <div className="md:ml-[250px] transition-[margin-left] ease-in-out duration-500  flex flex-col flex-grow w-screen md:w-full min-h-screen items-center justify-center pt-[60px]"> */}
                    <div className="md:ml-[250px] transition-[margin-left] ease-in-out duration-500  flex flex-col flex-grow w-full md:w-[50%] min-h-screen items-center justify-center pt-[60px]">
                        <main className="flex flex-col h-full w-full p-2">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}