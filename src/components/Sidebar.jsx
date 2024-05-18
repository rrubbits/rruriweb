import React, { useEffect } from 'react';
import SidebarButton from './SidebarButton';
import { usePathname } from 'next/navigation';

let sidebarWidth = 350;

const Sidebar = ({show, setter2}) => {
    // Define our base class
    const pathname = usePathname();
    useEffect(() => {
        setter2(false);
    }, [pathname])

    const className = "bg-white w-[300px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-300px] md:ml-0";
    const ModalOverlay = () => {
        return <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 -z-40`}
            onClick={() => {
                setter2(oldVal => !oldVal);
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
            <SidebarButton title="GALLERY"/>
            <SidebarButton title="SHOP"/>     
            <SidebarButton title="ADMIN"　href="/admin"/>     
        </div>
        {show ? <ModalOverlay setter2={setter2}/> : <></>}
    </div>
    );
};

export default Sidebar;
