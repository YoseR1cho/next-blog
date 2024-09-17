'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {message} from "antd";
import {verifyAdmin} from "@/utils/apis/user";

export default function Authadmin({children}) {
    const router = useRouter()
    React.useEffect(() => {
        verifyAdmin().then(res=>{
            if(!res || !res.success){
                router.push('/home')
                message.error('抱歉，您没有访问权限！')
            }
        }).catch(e=>{
            router.push('/home')
            message.error('服务器出现错误！')
        })
    }, []);


    return (
        <>
            {children}
        </>
    );
};

