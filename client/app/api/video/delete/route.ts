import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling";
import authAPI from "@/app/(libs)/authAPI";
import { prisma } from "@/app/(libs)/client"

type DeleteVideoRequestBody = {
    key: string;
    videoId: string;
}

function parseDeletedVideoRequestBody(req: DeleteVideoRequestBody) {
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    const missingParams = error.generateMissingParamsErrorResponse(req, ["key", 'videoId'])

    if (missingParams instanceof Response) {
        return missingParams
    }

    // Auth user
    const auth = authAPI(req.key || "")

    if (auth instanceof Response) {
        return auth
    }
}

export async function POST(request: Request) {
    const req = await request.json().catch(err => null)

    const parsedBody = parseDeletedVideoRequestBody(req)

    if (parsedBody instanceof Response) {
        return parsedBody
    }

    const deletedVideo = await prisma.video.delete({
        "where": {
            "video_id": req.videoId
        }
    }).catch(error => error)

    return new Response(JSON.stringify(deletedVideo), {
        status: 200
    })
}