import { LinkComponentProps } from "@/app/(libs)";
import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo({ className, link }: LinkComponentProps) {
    return (
        <Link
            className={`${className || ""} w-[8rem] md:w-[10rem] transition-all`}
            href={link}
        >
            <Image
                className="w-[10rem]"
                width={200}
                height={200}
                src={'/images/startube-logo.svg'}
                alt="StarTube Logo"
            />
        </Link>
    )
}