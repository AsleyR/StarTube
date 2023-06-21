import { APIResponseErrorHandling } from "@/app/(libs)/APIResponseErrorHandling";
import authAPI from "@/app/(libs)/authAPI";
import { prisma } from "@/app/(libs)/client"

type UpdateCommentRequestBody = {
    key: string;
    commentId: string;
    ammount: number;
}

function parseUpdateCommentDislikesRequestBody(req: UpdateCommentRequestBody) {
    const error = new APIResponseErrorHandling()

    if (!req) {
        return error.generateBadRequestErrorResponse()
    }

    const missingParams = error.generateMissingParamsErrorResponse(req, ['commentId', 'ammount'])

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

    const parsedBody = parseUpdateCommentDislikesRequestBody(req)

    if (parsedBody instanceof Response) {
        return parsedBody
    }

    const updatedComment = await prisma.comment.update({
        "where": {
            "comment_id": req.commentId
        },
        "data": {
            "dislikes": {
                "decrement": req.ammount
            }
        }
    }).catch(error => error)

    return new Response(JSON.stringify(updatedComment), {
        status: 200
    })
}