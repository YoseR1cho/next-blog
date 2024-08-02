import {
    ApiOutlined, BlockOutlined,
    EditOutlined,
    FormOutlined,
    HomeOutlined,
    SmileOutlined, TagOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";

const menuConfig = [
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
            },
            {
                label:'主题管理',
                key:'/admin/article/topic',
                icon:<BlockOutlined />
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

export default menuConfig;
