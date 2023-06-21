import Container from "@/app/(component)/Container";

interface ChannelPageLayoutProps {
    children: React.ReactNode
}

export default function ChannelPageLayout({ children }: ChannelPageLayoutProps) {
    return (
        <section className="" >
            <Container className="mt-[2.5rem]">
                {children}
            </Container>
        </section>
    )
}