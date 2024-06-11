import React from 'react'
import Link from 'next/link'
export default function MenuBarMobile({ setter, title}) {
    return (
        <nav className="flex bg-white/60 backdrop-blur-md md:hidden -z-20 fixed top-0 left-0 w-[100vw] h-[60px] items-center [&>*]:my-auto">
            <button
                className="text-4xl flex-none text-black"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                =
            </button>
            <div className="grow text-center align-middle text-black font-bold">
                {/* <div> */}
                {title}
                {/* </div> */}
            </div>

        </nav>
    )
}