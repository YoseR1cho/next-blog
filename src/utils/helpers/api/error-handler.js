import { NextResponse } from "next/server";

function errorHandler(err) {
    if (typeof err === "string") {
        // custom application error
        const is404 = err.toLowerCase().endsWith("not found");
        const status = is404 ? 404 : 400;
        return NextResponse.json(
            {
                errorMsg: err.message,
            },
            { status }
        );
    }

    if (err.name === "JsonWebTokenError") {
        // jwt error - delete cookie to auto logout
        return NextResponse.json(
            {
                errMsg: "Unauthorized",
            },
            { status: 401 }
        );
    }

    if (err.name === "UserExistsError") {
        return NextResponse.json(
            {
                errorMsg: err.message,
            },
            { status: 422 }
        );
    }

    // default to 500 server error
    return NextResponse.json(
        {
            errorMsg: err.message,
        },
        { status: 500 }
    );
}

export { errorHandler };
