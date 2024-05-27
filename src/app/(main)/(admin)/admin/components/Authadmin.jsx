'use client'
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {fetchToken} from "@/store/user/actionCreators";
import {message} from "antd";

export default function Authadmin({children}) {
    const dispatch = useDispatch();
    const router = useRouter()

    React.useEffect(() => {
        const asyncGet = async ()=>{
            try {
                await dispatch(fetchToken())
                if(role!==0){
                    router.push('/home')
                    message.error('抱歉，您没有访问权限！')
                }

            }catch (e){
                router.push('/home')
                message.error('服务器出现错误！')
            }
        }
        asyncGet()
    }, []);
    const role = useSelector(store=>store.user.role);

    return (
        <>
            {children}
        </>
    );
};

