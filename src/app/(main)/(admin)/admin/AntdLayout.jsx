"use client";
import React, { useRef, useState } from "react";
import styles from "./page.module.scss";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Title from "@/app/(main)/(admin)/admin/components/title";

import { useRouter } from "next/navigation";
import Image from "next/image";
import TagsView from "@/components/TagsView";
import SiderMenu from "@/app/(main)/(admin)/admin/components/SiderMenu";
const { Sider, Header, Content, Footer } = Layout;

const App = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const nameRef = useRef();

    return (
        <Layout className={styles.layout}>
            <Sider breakpoint="lg" collapsed={collapsed}>
                <div className={styles.logo}>
                    <Image
                        src={"/images/avatar.png"}
                        alt="my avatar"
                        width={48}
                        height={48}
                        style={{ margin: "8px 8px 0 0" }}
                    />
                    <h1 ref={nameRef}>YoseR1cho</h1>
                </div>
                <SiderMenu />
            </Sider>
            <Layout
                style={{
                    minHeight: "100vh",
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => {
                            setCollapsed(!collapsed);
                            nameRef.current.style.display = collapsed
                                ? "block"
                                : "none";
                        }}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <TagsView />
                <Content
                    style={{
                        margin: "24px 16px 36px",
                    }}
                >
                    <div
                        style={{
                            paddingTop: 0,
                            minHeight: 560,
                            background: colorBgContainer,
                        }}
                    >
                        <Title />
                        <div style={{ padding: 24 }}>{children}</div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;
