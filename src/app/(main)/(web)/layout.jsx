'use client'
import React, {useEffect} from 'react';
import {  Layout,Col,Row } from 'antd';
import styles from './page.module.scss'
import SideBar from '@/app/(main)/(web)/components/sideBar'
import Header from "@/app/(main)/(web)/components/header";
import {fetchToken} from "@/store/user/actionCreators";
import {useDispatch} from "react-redux";
import Spin from '@/components/spin'

const {  Content, Footer } = Layout;
const sideLayout = { xxl: 5, xl: 5, lg: 5, sm: 0, xs: 0 }
const contentLayout = { xxl: 19, xl: 19, lg: 19, sm: 24, xs: 24 }


export default function  WebLayout({children}){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchToken())
    }, []);
    return (
        <Layout className={styles.layout}>
            <Header/>
            <Content
                style={{
                    flex:1,
                }}
            >
                <Row>
                    <Col {...sideLayout}>
                    </Col>
                    <Col {...sideLayout} style={{position:'fixed'}}>
                        <SideBar/>
                    </Col>
                    <Col {...contentLayout} style={{display:"flex",flexDirection:"column",minHeight:'calc(100vh - 84px)'}}>
                        {children}
                    </Col>
                </Row>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    marginTop:'30px'
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};
