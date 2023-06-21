import { ContainerProps } from "../(libs)";

export default function Container({ className, children }: ContainerProps) {
    return (
        <div className={`${className || ""} px-mobilex md:px-navx`}>
            {children}
        </div>
    )
}