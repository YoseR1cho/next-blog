'use client'

import React from "react";
import {  Table, Tag } from "antd";
import dayjs from "dayjs";
import GreenButton from "@/components/button/GreenButton";
import BlueButton from "@/components/button/BlueButton";
import {useRouter} from "next/navigation";
import TopicModal from "@/app/(main)/(admin)/admin/article/list/TopicModal";

const TopicTable = ({ data, loading }) => {
    const router = useRouter();
    const [isModalOpen,setIsModalOpen] = React.useState(false)

    const handleModalOpen = ()=>{
        setIsModalOpen(prevState => !prevState)
    }

    const columns = [
        {
            title: "主题",
            dataIndex: "title",
            key: "title",
            width: "250px",
            align: "center",
            render:(text)=>{
                return <span style={{fontSize:'18px',fontWeight:'800'}}></span>
            }
        },
        {
            title: "访问量",
            dataIndex: "view",
            key: "view",
            width: "120px",
            align: "center",
        },
        {
            title: "发布时间",
            dataIndex: "createAt",
            key: "createAt",
            width: "180px",
            align: "center",
            render: text => {
                return <span>{dayjs(text).format("YYYY-MM-DD H:mm:ss")}</span>;
            },
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            width: '250px',
            render: (text,record) => (
                <div>
                    <GreenButton style={{marginRight:'1rem'}} onClick={()=>router.push(`/admin/article/update/${record._id}`)}>修改文章</GreenButton>
                    <BlueButton onClick={handleModalOpen}>专题设置</BlueButton>
                </div>
            ),
        },
    ];

    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    bordered
                />
            </div>
            <TopicModal isModalOpen={isModalOpen} setModalOpen={setIsModalOpen}/>
        </>
    );
};

export default TopicTable;
