import { prisma } from "@/app/(libs)/client"

export async function GET() {
    const comments = await prisma.comment.findMany({})

    return new Response(JSON.stringify(comments), {
        status: 200
    })
}