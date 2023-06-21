import { PrismaOptions } from "@/app/(libs)"
import { prisma } from "@/app/(libs)/client"

type QueryBody = {
    comment_id?: PrismaOptions
    video_id?: PrismaOptions
    published_date?: PrismaOptions
    user_id?: PrismaOptions
    comment?: PrismaOptions
}

interface GetCommentRequest {
    commentId?: string
    videoId?: string
    publishedDate?: string
    userId?: string
    comment?: string
}

function parseGetCommentRequest(req: GetCommentRequest) {
    let queryBody: QueryBody = {}

    if (!req) {
        return new Response(JSON.stringify({
            error: "Bad Request"
        }), {
            status: 400
        })
    }

    if (req.commentId) {
        queryBody = {
            ...queryBody,
            comment_id: req.commentId
        }
    }

    if (req.videoId) {
        queryBody = {
            ...queryBody,
            video_id: req.videoId
        }
    }

    if (req.userId) {
        queryBody = {
            ...queryBody,
            user_id: req.userId
        }
    }

    // Time must be in ISO format
    if (req.publishedDate) {
        queryBody = {
            ...queryBody,
            published_date: req.publishedDate
        }
    }

    if (req.comment) {
        queryBody = {
            ...queryBody,
            comment: {
                contains: req.comment,
                mode: "insensitive"
            }
        }
    }

    return queryBody
}

export async function POST(request: Request) {
    const req = await request.json().catch(err => null)

    const parsedRequest = parseGetCommentRequest(req)

    if (parsedRequest instanceof Response) {
        return parsedRequest
    }

    const finalRequestObject: any = parsedRequest
    const comments = await prisma.comment.findMany({
        where: finalRequestObject
    })

    return new Response(JSON.stringify(comments), {
        status: 200
    })
}