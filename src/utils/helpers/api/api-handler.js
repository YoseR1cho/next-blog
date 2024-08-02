import { jwtMiddleware } from "@/utils/helpers/api/jwtMiddleware";
import {identityMiddleware} from "@/utils/helpers/api/identityMiddleware";
import {validateMiddleware} from "@/utils/helpers/api/validateMiddleware";
import {NextResponse} from "next/server";
import {errorHandler} from "@/utils/helpers/api/error-handler";

function isPublicPath(req) {
    const publicPaths = [
        "GET:/api/article",
        "GET:/api/tag",
        "POST:/api/user/login",
        "POST:/api/user/reg",
    ];

    return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}

//handler包装器
function apiHandler(handler, { identity, schema, isJwt }) {
    return async (req, ...args) => {
        try {
            if (!isPublicPath(req)) {
                // 执行中间件
                await jwtMiddleware(req, isJwt);
                await identityMiddleware(req, identity,isJwt);
                await validateMiddleware(req,schema)

                const response = await handler(req,...args)
                return response
            }
        } catch (err) {
            console.log('global error handler',err)
            return errorHandler(err)
        }
    };
}

export { apiHandler };
