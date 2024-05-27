'use client'
import React, { useEffect, useState } from 'react';
import { App, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import zhCN from 'antd/locale/zh_CN';
const AntdConfigProvider = ({ children }) => {
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                components:{
                    Layout:{
                        headerBg:'#fff'
                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
};

const AntdStyleRegistry = ({ children }) => {
    return (
        <AntdRegistry>
            <AntdConfigProvider>
                {children}
            </AntdConfigProvider>
        </AntdRegistry>
    );
};

export default AntdStyleRegistry;
