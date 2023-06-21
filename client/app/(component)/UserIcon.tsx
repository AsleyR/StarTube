import Image from "next/image"
import { BaseComponentProps } from "../(libs)"
import { UserProfile } from "@auth0/nextjs-auth0/client"

interface UserIconProps extends BaseComponentProps {
    user: UserProfile
}

export default function UserIcon({ className, user }: UserIconProps) {

    return (
        <div className={`${className || ""} w-10`}>
            <Image
                className="rounded-full"
                width={200}
                height={200}
                src={user.picture || ""}
                alt="User picture"
            />
        </div>
    )
}