import { NextResponse } from "next/server";

function errorHandler(err) {
    if (typeof err === "string") {
        // custom application error
        const is404 = err.toLowerCase().endsWith("not found");
        const status = is404 ? 404 : 400;
        return NextResponse.json(
            {
                errorMsg: err.message,
                success: false,
            },
            { status }
        );
    }

    if (err.name === "JsonWebTokenError") {
        // jwt error - delete cookie to auto logout
        return NextResponse.json(
            {
                errMsg: "Unauthorized",
                success: false,
            },
            { status: 401 }
        );
    }

    if (err.name === "TokenExpiredError") {
        return NextResponse.json({
            errMsg: "jwt expired",
            expire:true
        }, { status: 401 });
    }

    if (err.name === "UserExistsError") {
        return NextResponse.json(
            {
                errorMsg: err.message,
                success: false,
            },
            { status: 422 }
        );
    }

    // default to 500 server error
    return NextResponse.json(
        {
            errorMsg: err.message,
            success: false,
        },
        { status: 500 }
    );
}

export { errorHandler };
