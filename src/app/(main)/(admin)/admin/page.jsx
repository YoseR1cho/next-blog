'use client'
import React from 'react';
import dynamic from "next/dynamic";

const View = dynamic(()=>import("@/app/(main)/(admin)/admin/components/View"))
const Page = () => {

    return (
        <>
            <View/>
        </>
    );
};

export default Page;
