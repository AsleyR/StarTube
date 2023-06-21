"use client"

import Link from "next/link";
import NavbarSearchBar from "./NavbarSearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import NavbarSignIn from "./auth/NavbarSignIn";
import NavbarLogo from "./NavbarLogo";
import { useUser } from "@auth0/nextjs-auth0/client";
import NavbarUser from "./auth/NavbarUser";
import { useState } from "react";

export default function Navbar() {
    const { user, error, isLoading } = useUser()
    const [openSearchBar, setOpenSearchBar] = useState<boolean>(false)

    return (
        <nav className="grid grid-cols-2 md:grid-cols-[min-content_auto_min-content] gap-[2rem] md:gap-[5rem] xl:gap-[13rem] items-center px-mobilex py-mobiley md:px-navx md:py-navy bg-black border-b border-gray-800 drop-shadow">
            <div className={`${openSearchBar ? "hidden md:flex" : "flex"}`}>
                <NavbarLogo link="/" />
            </div>
            <div className={`${openSearchBar ? "flex col-span-2 items-center" : "hidden md:flex items-center"}`}>
                <div className="w-8 h-8 flex md:hidden justify-center rounded-full items-center bg-gray-800 active:bg-gray-600 mr-3"
                    onClick={() => setOpenSearchBar(false)}
                >
                    <FontAwesomeIcon className="w-4 text-gray-200" icon={faChevronLeft} />
                </div>
                <NavbarSearchBar />
            </div>
            <div className={`${openSearchBar ? "hidden md:flex" : "flex"} gap-2 md:gap-0 justify-self-end items-center border-red-600`}>
                <div className={`${openSearchBar ? "hidden" : "flex md:hidden"} active:bg-gray-600 p-3 rounded-full cursor-pointer`}
                    onClick={() => setOpenSearchBar(true)}
                >
                    <FontAwesomeIcon className="w-[1.2rem]" icon={faSearch} />
                </div>
                {
                    user ?
                        <NavbarUser user={user} />
                        :
                        <Link href={'/api/auth/login'}>
                            <NavbarSignIn />
                        </Link>
                }
            </div>
        </nav>
    )
}