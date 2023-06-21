import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling";
import authAPI from "@/app/(libs)/authAPI";
import { prisma } from "@/app/(libs)/client"

type UpdateCommentRequestBody = {
    key: string;
    commentId: string;
    comment?: string;
    videoId: string;
    userId?: string
    replyCommentId?: string;
    publishedDate?: Date
}

interface QueryBody {
    comment?: string;
    user_id?: string;
    video_id?: string;
    reply_comment_id?: string;
    published_date?: Date;
}

function parseUpdateCommentRequestBody(req: UpdateCommentRequestBody) {
    let queryBody: QueryBody = {}
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    if (!req.commentId) {
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

    if (req.comment) {
        queryBody = {
            ...queryBody,
            comment: req.comment
        }
    }

    if (req.replyCommentId) {
        queryBody = {
            ...queryBody,
            reply_comment_id: req.replyCommentId
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

    const parsedRequest = parseUpdateCommentRequestBody(req)

    if (parsedRequest instanceof Response) {
        return parsedRequest
    }

    const finalRequestObject = parsedRequest
    const updatedComment = await prisma.comment.update({
        "where": {
            "comment_id": req.commentId
        },
        "data": finalRequestObject
    }).catch(error => error)

    return new Response(JSON.stringify(updatedComment), {
        status: 200
    })
}