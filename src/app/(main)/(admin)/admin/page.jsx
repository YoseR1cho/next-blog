'use client'
import React from 'react';
import {Layout, theme} from "antd";
import View from "@/app/(main)/(admin)/admin/components/View";
const { Content ,Footer} = Layout;

const Page = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <View/>
        </>
    );
};

export default Page;
