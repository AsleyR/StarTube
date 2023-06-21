export interface APIResponseErrorHandling {
    generateCustomErrorResponseProps: {
        error?: string
        status?: number
        cause?: string
        customObject?: any
    }
}

export class APIResponseErrorHandling {

    // METHODS

    generateMissingParamsErrorResponse(request: any, missingParams: string[], status?: number): Response | undefined {
        let causes: any[] = []
        missingParams.map((param) => {
            if (!(param in request)) {
                causes.push(param)
            }
        })

        if (causes.length !== 0) {
            return new Response(JSON.stringify({
                error: "Bad request.",
                cause: `Missing ${causes.map(str => `'${str}'`)} parameters`
            }), {
                status: status || 400
            })
        }
    }

    generateBadRequestErrorResponse(status?: number): Response {
        return new Response(JSON.stringify({
            error: "Bad request."
        }), {
            status: status || 400
        })
    }

    generateCustomErrorResponse(props: APIResponseErrorHandling['generateCustomErrorResponseProps']): Response {
        let responseErrorObject: {
            error: string;
            cause?: string;
            [key: string]: any
        } = {
            error: props.error || "Bad request"
        }

        if (props.cause) {
            responseErrorObject = {
                ...responseErrorObject,
                cause: props.cause
            }
        }

        if (props.customObject) {
            responseErrorObject = {
                ...responseErrorObject,
                ...props.customObject
            }
        }

        return new Response(JSON.stringify(responseErrorObject), {
            status: props.status || 400
        })
    }
}