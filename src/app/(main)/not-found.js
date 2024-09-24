'use client'
import React, {useEffect, useLayoutEffect} from 'react';
import {useRouter} from "next/navigation";
import {message} from "antd";

const NotFound = () => {
    const router = useRouter()

    useLayoutEffect(() => {
        router.push('/home')
        message.warning('页面无法访问！')
    }, []);
    return (
        <></>
    );
};

export default NotFound;
