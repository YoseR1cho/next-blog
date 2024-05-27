'use client'
import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

const LinkList = () => {
    const router = useRouter()
    const changeNav = ()=>{
        router.push('/home');
        window.location.reload();
    }
    const role = useSelector(store=>store.user.role);
    return (
        <ul>
            <li><Link href={'/home'}>首页</Link></li>
            {role===0 && <li><Link href={'/admin'}>后台管理</Link></li>}
        </ul>
    );
};

export default LinkList;
