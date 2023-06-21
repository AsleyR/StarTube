import Container from "@/app/(component)/Container";

interface VideoPageLayoutProps {
    children: React.ReactNode
}

export default function VideoPageLayout({ children }: VideoPageLayoutProps) {
    return (
        <section className="" >
            <Container className="mt-[2.5rem]">
                {children}
            </Container>
        </section>
    )
}