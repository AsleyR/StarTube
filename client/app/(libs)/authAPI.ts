import { APIResponseErrorHandling } from "./APIResponseErrorHandling"

export default function authAPI(key: string) {
    const apiKey = process.env.API_KEY

    if (key !== apiKey) {
        const error = new APIResponseErrorHandling()
        return error.generateCustomErrorResponse({
            "error": "Not authorized to perform this action.",
            "status": 401
        })
    }
}