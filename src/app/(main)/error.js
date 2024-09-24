"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

const Error = (error, reset) => {
    const router = useRouter();

    useEffect(() => {
        router.push("/home");
        message.error("访问错误，请稍后重试！");
    },[]);
    return (
        <></>
    );
};

export default Error;
