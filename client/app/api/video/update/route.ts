import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling";
import authAPI from "@/app/(libs)/authAPI";
import { prisma } from "@/app/(libs)/client";

type UpdateVideoRequestBody = {
    key: string;
    videoId: string;
    title?: string;
    description?: string;
    userId?: string
    videoUrl?: string
    publishedDate?: Date
}

interface QueryBody {
    title?: string;
    description?: string;
    user_id?: string;
    video_url?: string;
    published_date?: Date;
}

function parseUpdateVideoRequestBody(req: UpdateVideoRequestBody) {
    let queryBody: QueryBody = {}
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    if (!req.videoId) {
        error.generateMissingParamsErrorResponse(req, ['videoId'])
    }

    // Check if publishedDate is a valid Date string
    // If it's an invalid date, it should be equal to NaN and thus,
    // validate the if statement; raising an exception
    const parsedPublishedDate = new Date(req.publishedDate || "")
    if (isNaN(parsedPublishedDate.valueOf())) {
        return error.generateCustomErrorResponse({
            "cause": "Parameter 'publishedDate' is not a valid date."
        })
    }

    // Auth api
    const auth = authAPI(req.key || "")

    if (auth instanceof Response) {
        return auth
    }

    if (req.title) {
        queryBody = {
            ...queryBody,
            title: req.title
        }
    }

    if (req.description) {
        queryBody = {
            ...queryBody,
            description: req.description
        }
    }

    if (req.userId) {
        queryBody = {
            ...queryBody,
            user_id: req.userId
        }
    }

    if (req.videoUrl) {
        queryBody = {
            ...queryBody,
            video_url: req.videoUrl
        }
    }

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

    const parsedRequest = parseUpdateVideoRequestBody(req)

    if (parsedRequest instanceof Response) {
        return parsedRequest
    }

    const finalRequestObject = parsedRequest
    const updatedVideo = await prisma.video.update({
        "where": {
            "video_id": req.videoId
        },
        "data": finalRequestObject
    }).catch(error => error)

    return new Response(JSON.stringify(updatedVideo), {
        status: 200
    })
}