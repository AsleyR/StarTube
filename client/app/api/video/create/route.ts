import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling"
import authAPI from "@/app/(libs)/authAPI"
import { prisma } from "@/app/(libs)/client"

type CreateVideoRequestBody = {
    key: string;
    title: string,
    description: string,
    videoUrl: string,
    userId: string
}

// title, description, video_url, user_id
function parseCreateVideoRequestBody(req: CreateVideoRequestBody) {
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    const missingParams = error.generateMissingParamsErrorResponse(req, ['title', 'description', 'videoUrl', 'userId'])

    if (missingParams instanceof Response) {
        return missingParams
    }

    // Auth api
    const auth = authAPI(req.key || "")

    if (auth instanceof Response) {
        return auth
    }
}

export async function POST(request: Request) {
    const req = await request.json().catch(err => null)
    const parsedRequest = parseCreateVideoRequestBody(req)

    if (parsedRequest instanceof Response) {
        return parsedRequest
    }

    const newVideo = await prisma.video.create({
        "data": {
            "title": req.title,
            "description": req.description,
            "user_id": req.userId,
            "video_url": req.videoUrl
        }
    }).catch(error => error)

    return new Response(JSON.stringify(newVideo), {
        status: 200
    })
}