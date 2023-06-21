"use client"

import { UserProfile } from "@auth0/nextjs-auth0/client"
import UserIcon from "../../UserIcon"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorClosed, faDoorOpen, faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { faUser } from "@fortawesome/free-regular-svg-icons"

interface NavbarUserProps {
    user: UserProfile
}

export default function NavbarUser({ user }: NavbarUserProps) {
    const [openUserMenu, setOpenUserMenu] = useState<boolean>(false)

    return (
        <>
            <button className=""
                onClick={() => setOpenUserMenu(true)}
            >
                <UserIcon user={user} />
            </button>
            {
                openUserMenu ?
                    <>
                        <div className="absolute inset-0 h-[100vh] z-20 bg-white/20" onClick={() => setOpenUserMenu(false)}></div>
                        <div className="absolute right-0 inset-y-0 h-[100vh] z-30 p-3 rounded-tl-xl border-l border-gray-700 flex flex-col bg-blackbg drop-shadow-lg transition-all">
                            <div className="grid grid-cols-2 items-center h-fit">
                                <div className="flex h-fit items-center gap-2">
                                    <UserIcon user={user} className="w-9" />
                                    <h3 className="font-medium">{user.nickname}</h3>
                                </div>
                                <button className="relative justify-self-end w-8 h-8 hover:bg-white/20 rounded p-1"
                                    onClick={() => setOpenUserMenu(false)}
                                >
                                    <FontAwesomeIcon className="w-5" icon={faXmark} />
                                </button>
                            </div>
                            <div className="grid h-fit py-3 mt-5 border-t border-gray-700 text-gray-200">
                                <Link href={`/channel/${user.email}`}
                                    onClick={() => setOpenUserMenu(false)}
                                    className="flex gap-2 items-center hover:bg-gray-800 rounded py-1 px-3"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                    <p>Your channel</p>
                                </Link>
                            </div>
                            <div className="grid h-fit py-3 border-t border-gray-700 text-gray-200">
                                <Link href={`/api/auth/logout`}
                                    onClick={() => setOpenUserMenu(false)}
                                    className="flex gap-2 items-center hover:bg-gray-800 rounded py-1 px-3"
                                >
                                    <FontAwesomeIcon icon={faDoorOpen} />
                                    <p>Logout</p>
                                </Link>
                            </div>
                        </div>
                    </> :
                    null
            }
        </>
    )
}