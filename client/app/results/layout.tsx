import Container from "@/app/(component)/Container";

interface ResultsPageLayoutProps {
    children: React.ReactNode
}

export default function VideoPageLayout({ children }: ResultsPageLayoutProps) {
    return (
        <section className="" >
            <Container className="mt-[2.5rem]">
                {children}
            </Container>
        </section>
    )
}