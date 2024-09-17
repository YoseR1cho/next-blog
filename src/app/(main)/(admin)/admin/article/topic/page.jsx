"use client";
import React from "react";
import dayjs from "dayjs";
import Title from "@/app/(main)/(admin)/admin/components/title";
import { Button, Table } from "antd";
import { useSelector } from "react-redux";
import AddTopicModal from "@/app/(main)/(admin)/admin/article/topic/AddTopicModal";
import RedButton from "@/components/button/RedButton";
import DeleteTopicModal from "@/app/(main)/(admin)/admin/article/topic/DeleteTopicModal";

const Page = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const topics = useSelector(store => store.topic).topicList;

    const handleDeleteModalOpen = ()=>{
        setIsDeleteModalOpen(true)
    }

    const handleModalOpen = ()=>{
        setIsModalOpen(true)
    }

    const columns = [
        {
            title: "专题",
            dataIndex: "title",
            key: "title",
            width: "250px",
            align: "center",
            render: text => {
                return (
                    <span style={{ fontSize: "18px", fontWeight: "800" }}>
                        {text}
                    </span>
                );
            },
        },
        {
            title: "访问量",
            dataIndex: "views",
            key: "views",
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
            width: "250px",
            render: (text, record) => (
                <div>
                    <RedButton onClick={handleDeleteModalOpen}>删除</RedButton>
                    <DeleteTopicModal
                        setIsModalOpen={setIsDeleteModalOpen}
                        isModalOpen={isDeleteModalOpen}
                        id={record._id}
                    />
                </div>
            ),
        },
    ];

    const extra = (
        <Button type="primary" onClick={handleModalOpen}>
            新增专题
        </Button>
    );
    return (
        <>
            <Title extra={extra} isCollapsed={true} />
            <div className="app-container">
                <Title />
                <div>
                    <Table columns={columns} dataSource={topics} bordered />
                </div>
                <AddTopicModal
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                />

            </div>
        </>
    );
};

export default Page;
