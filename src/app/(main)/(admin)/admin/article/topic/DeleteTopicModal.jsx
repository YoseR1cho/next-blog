import React, { useState } from "react";
import MyModal from "@/components/MyModal";
import { Input, message, Typography } from "antd";
import { useDispatch } from "react-redux";
import { deleteTopic } from "@/store/topic/actionCreators";

const DeleteTopicModal = ({ isModalOpen, setIsModalOpen, id }) => {
    const dispatch = useDispatch();
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteTopic(id));

            handleModalClose();

            message.success("专题删除成功！");
        } catch (e) {
            message.error(e.message);
        }
    };

    return (
        <div>
            <MyModal
                open={isModalOpen}
                title="确认删除该专题吗？"
                onCancel={handleModalClose}
                onOk={handleDelete}
            />
        </div>
    );
};

export default DeleteTopicModal;
