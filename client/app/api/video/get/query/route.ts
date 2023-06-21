import { PrismaOptions } from "@/app/(libs)"
import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling"
import { prisma } from "@/app/(libs)/client"

type QueryBody = {
    video_id?: PrismaOptions,
    title?: PrismaOptions,
    userId?: PrismaOptions,
    published_date?: PrismaOptions,
    video_url?: PrismaOptions
}

interface GetVideoRequest {
    videoId?: string,
    title?: string,
    userId?: string,
    publishedDate?: string,
    videoUrl?: string
}

function parseGetVideoRequest(req: GetVideoRequest) {
    let queryBody: QueryBody = {}
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    if (req.videoId) {
        queryBody = {
            ...queryBody,
            video_id: req.videoId
        }
    }

    if (req.title) {
        queryBody = {
            ...queryBody,
            title: {
                contains: req.title,
                mode: "insensitive"
            }
        }
    }

    if (req.userId) {
        queryBody = {
            ...queryBody,
            userId: req.userId
        }
    }

    if (req.videoUrl) {
        queryBody = {
            ...queryBody,
            video_url: {
                contains: req.videoUrl,
                mode: "insensitive"
            }
        }
    }

    // Time must be in ISO format
    if (req.publishedDate) {
        queryBody = {
            ...queryBody,
            published_date: req.publishedDate
        }
    }

    return queryBody
}

export async function POST(request: Request) {
    const req = await request.json().catch(err => null)

    const parsedRequest = parseGetVideoRequest(req)

    if (parsedRequest instanceof Response) {
        return parsedRequest
    }

    const finalRequestObject: any = parsedRequest
    const videos = await prisma.video.findMany({
        where: finalRequestObject
    })

    return new Response(JSON.stringify(videos), {
        status: 200
    })
}