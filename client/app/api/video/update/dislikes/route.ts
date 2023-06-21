import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling";
import authAPI from "@/app/(libs)/authAPI";
import { prisma } from "@/app/(libs)/client"

type UpdateVideoRequestBody = {
    key: string;
    videoId: string;
    ammount: number;
}

function parseUpdateVideoDislikesRequestBody(req: UpdateVideoRequestBody) {
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    const missingParams = error.generateMissingParamsErrorResponse(req, ['videoId', 'ammount'])

    if (missingParams instanceof Response) {
        return missingParams
    }

    if (typeof req.ammount !== "number") {
        return error.generateCustomErrorResponse({ "cause": `Parameter 'ammount' must be a number.` })
    }

    // Auth api
    const auth = authAPI(req.key || "")

    if (auth instanceof Response) {
        return auth
    }
}

export async function POST(request: Request) {
    const req = await request.json().catch(err => null)

    const parsedBody = parseUpdateVideoDislikesRequestBody(req)

    if (parsedBody instanceof Response) {
        return parsedBody
    }

    const updatedVideo = await prisma.video.update({
        "where": {
            "video_id": req.videoId
        },
        "data": {
            "dislikes": {
                "decrement": req.ammount
            }
        }
    }).catch(error => error)

    return new Response(JSON.stringify(updatedVideo), {
        status: 200
    })
}