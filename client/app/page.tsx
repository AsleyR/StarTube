import Link from "next/link"
import Container from "./(component)/Container"

export default function Home() {
  return (
    <main className="">
      <Container className="mt-[2.5rem]">
        <h1 className="font-bold text-2xl">StarTube</h1>
        <Link href={'/api/auth/login'}>Login to website</Link>
      </Container>
    </main>
  )
}
