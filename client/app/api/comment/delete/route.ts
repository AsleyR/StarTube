import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling";
import authAPI from "@/app/(libs)/authAPI";
import { prisma } from "@/app/(libs)/client"

type DeleteCommentRequestBody = {
    key: string;
    commentId: string;
}

function parseDeletedCommentRequestBody(req: DeleteCommentRequestBody) {
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    const missingParams = error.generateMissingParamsErrorResponse(req, ['commentId'])

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

    const parsedBody = parseDeletedCommentRequestBody(req)

    if (parsedBody instanceof Response) {
        return parsedBody
    }

    const deletedComment = await prisma.comment.delete({
        "where": {
            "comment_id": req.commentId
        }
    }).catch(error => error)

    return new Response(JSON.stringify(deletedComment), {
        status: 200
    })
}