"use client";
import React, { useState } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';
import NavigationBarMobile from './NavigationBarMobile';

export default function ResponsiveLayout({ children }) {
    let title = "ミツキルリ";
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="min-h-screen">
                <div className="flex">
                    <NavigationBarMobile setter={setShowSidebar} title={title}/>
                    <Sidebar show={showSidebar} setter2={() => {
                        setShowSidebar(oldVal =>!oldVal);
                    }} />
                    <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen items-center justify-center pt-[60px]">
                        <main className="flex h-full w-full p-2">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}