import { prisma } from "@/app/(libs)/client";

export async function GET() {
    const videos = await prisma.video.findMany({})

    return new Response(JSON.stringify(videos), {
        status: 200
    })
}