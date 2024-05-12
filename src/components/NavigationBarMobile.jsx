// @/components/Layout/MenuBarMobile.js
import React from 'react'
import Link from 'next/link'
// import { FiMenu as Icon } from 'react-icons/fi'
// import { FaUser } from 'react-icons/fa'

// import logo from '@/img/logo.svg'

export default function MenuBarMobile({ setter, title}) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-white flex items-center [&>*]:my-auto px-2">
            <button
                className="text-4xl flex-none text-black"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                =
            </button>
            <div className="grow text-center align-middle text-black">
                {/* <div> */}
                {title}
                {/* </div> */}
            </div>

        </nav>
    )
}