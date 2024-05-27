'use client'
import React, {useRef,useState} from 'react';
import {
    UserOutlined,
    FormOutlined,
    TagOutlined,
    UnorderedListOutlined,
    EditOutlined,
    SmileOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, ApiOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme} from 'antd';
import styles from './page.module.scss'
import {useRouter} from "next/navigation";
import Image from "next/image";
import View from "@/app/(main)/(admin)/admin/components/View";
const { Sider,Header,Content,Footer } = Layout;
const items = [
    {
        label:'首页',
        key:'/admin',
        icon:<SmileOutlined />
    },
    {
        label:'我的主页',
        key:'/home',
        icon:<HomeOutlined />
    },
    {
        label:'用户管理',
        key:'/admin/user',
        icon:<UserOutlined/>
    },
    {
        label:'文章管理',
        key:'/admin/article',
        icon:<FormOutlined/>,
        children:[
            {
                label:'文章列表',
                key:'/admin/article/list',
                icon:<UnorderedListOutlined />
            },
            {
                label:'发布文章',
                key:'/admin/article/publish',
                icon:<EditOutlined />
            }
        ]
    },
    {
        label:'标签管理',
        key:'/admin/tag',
        icon:<TagOutlined />
    },
    {
        label:'API管理',
        key:'/admin/api',
        icon:<ApiOutlined />
    }

];
const App = ({children}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()

    const menuClick = (e)=>{
        // 点击跳转到对应路由    编程式导航
        router.push(e.key);
    }

    const nameRef = useRef();

    return (
        <Layout className={styles.layout}>
            <Sider
                breakpoint="lg"
                collapsed={collapsed}
            >
                <div className={styles.logo} >
                    <Image src={'/images/avatar.png'} alt='my avatar' width={48} height={48} style={{margin:'8px 8px 0 0'}}/>
                    <h1 ref={nameRef}>YoseR1cho</h1>
                </div>
                <Menu
                    className={styles.menu}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={items}
                    onClick={menuClick}

                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => {
                            setCollapsed(!collapsed)
                            nameRef.current.style.display = collapsed?'block':'none';
                        }}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        minHeight:'auto'
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 560,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>

                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;
