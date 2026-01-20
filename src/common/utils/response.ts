import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function ApiResponse(
    c: Context,
    statusCode: ContentfulStatusCode,
    message: string,
    data: unknown
){
    return c.json({
        status: statusCode,
        message,
        data
    }, statusCode);
}