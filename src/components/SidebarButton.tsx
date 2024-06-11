"use client"

import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
interface SidebarButtonProps {
    // isSelected: Boolean;
    title: String;
    href: Url | undefined;
}
const SidebarButton: React.FC<SidebarButtonProps> = ({title, href}: SidebarButtonProps) => {
    const pathname = usePathname();
    // const colorClass = pathname === title ? "text-white" : "text-white/50 hover:text-white";
    const isSelected = pathname == href
    const textColor =  "text-center flex-1 text-2xl " + (href != undefined ? (isSelected ? "text-black" : "text-zinc-400") : "text-zinc-200/20")
    return (
        <div className="h-12 w-100 flex flex-row py-2 gap-1 hover:bg-gray-200 cursor-pointer">
            {isSelected ? <div className="w-1 bg-blue-400" /> : <div className="w-1" />}
            {href != null ?
                <Link className={textColor} href={href}>
                    {title}
                </Link> 
                :
                <div className={textColor}>
                    {title}
                </div>
            }
        </div>
    );
};

export default SidebarButton;