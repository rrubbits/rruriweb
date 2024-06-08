'use client'
import React, { useEffect, useState } from 'react';
import SidebarButton from './SidebarButton';
import NavigationBarMobile from './NavigationBarMobile';
import { usePathname } from 'next/navigation';
let sidebarWidth = 350;

const Sidebar = ({title}) => {
    // const [showSidebar, setShowSidebar] = useState(false);
    const [show, setShow] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setShow(false);
    }, [pathname])
    // headers 
    // let headers = headers()
    // let pathname = headers.get("x-pathname")

    const className = "bg-white w-[250px] border-r-2 transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";
    const ModalOverlay = () => {
        return <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 -z-10`}
            onClick={() => {
                setShow(oldVal => !oldVal);
            }}
        />
    }

    return (
    <div className={`${className}${appendClass}`}>
        <div className="flex h-full flex-col z-40 bg-white">
            <div className="w-full text-center text-black text-3xl font-extrabold font-['Inter'] p-8">
                ミツキルリの<br/>オスミツキ
            </div>
            <SidebarButton title="HOME" href="/"/>
            <SidebarButton title="PROFILE" href="/profile"/>
            <SidebarButton title="ALBUM"/>
            <SidebarButton title="SCHEDULE" href="/schedule"/>
            <SidebarButton title="CALENDAR" href="/calendar"/>
            <SidebarButton title="GALLERY"/>
            <SidebarButton title="SHOP"/>     
            <SidebarButton title="ADMIN"　href="/admin"/>     
        </div>
        {show ? <ModalOverlay setter2={setShow}/> : <></>}
        <NavigationBarMobile setter={setShow} title={title}/>
    </div>
    );
};

export default Sidebar;
