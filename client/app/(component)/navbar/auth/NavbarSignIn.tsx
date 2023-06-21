import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NavbarSignIn() {
    return (
        <div className="flex gap-3 items-center border border-gray-700 hover:bg-blue-500/30 hover:border-blue-500 duration-300 cursor-pointer rounded-full px-3 py-1"
            tabIndex={0}
        >
            <div className="relative w-full px-2 text-blue-500">
                <FontAwesomeIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5"
                    icon={faUserCircle} />
            </div>
            <div className="">
                <p className="text-blue-500 font-bold whitespace-nowrap">Sign In</p>
            </div>
        </div>
    )
}