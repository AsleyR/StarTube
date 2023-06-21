import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling"
import authAPI from "@/app/(libs)/authAPI"
import { prisma } from "@/app/(libs)/client"

type CreateCommentRequestBody = {
    key: string;
    comment: string
    userId: string
    videoId: string
    replyCommentId?: string
}

type RequestObject = {
    comment: string;
    user_id: string;
    video_id: string;
    reply_comment_id?: string;
}

// title, description, video_url, user_id
function parseCreateCommentRequestBody(req: CreateCommentRequestBody) {
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    const missingParams = error.generateMissingParamsErrorResponse(req, ['commentId', 'userId', 'videoId'])

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
    const parsedRequest = parseCreateCommentRequestBody(req)

    if (parsedRequest instanceof Response) {
        return parsedRequest
    }

    let requestObject: RequestObject = {
        "comment": req.comment,
        "user_id": req.userId,
        "video_id": req.videoId,
    }

    if (req.replyCommentId) {
        requestObject = {
            ...requestObject,
            "reply_comment_id": req.replyCommentId
        }
    }

    const newVideo = await prisma.comment.create({
        "data": requestObject
    }).catch(error => error)

    return new Response(JSON.stringify(newVideo), {
        status: 200
    })
}