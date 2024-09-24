"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

const GlobalError = (error, reset) => {
    const router = useRouter();

    useEffect(() => {
        router.push("/home");
        message.error("访问错误，请稍后重试！");
    },[]);
    return (
        <html>
            <body>
                <h2>Something went wrong!</h2>
            </body>
        </html>
    );
};

export default GlobalError;
