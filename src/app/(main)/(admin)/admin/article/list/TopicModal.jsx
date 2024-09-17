import React, { useState } from "react";
import {Button, message, Select} from "antd";
import BlueButton from "@/components/button/BlueButton";
import MyModal from "@/components/MyModal";
import {useDispatch, useSelector} from "react-redux";
import {recordedArticle} from "@/store/topic/actionCreators";

const TopicModal = ({ isModalOpen, setModalOpen, articleId }) => {
    const [value, setValue] = useState();
    const dispatch = useDispatch()
    const topics = useSelector(store => store.topic).topicList;
    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleAddTopic = async ()=>{
        try{
            dispatch(recordedArticle({
                articleId,
                topicId:value
            }))

            handleCancel()
            message.success('专题设置成功！')
        }catch (e){
            message.error(e.message)
        }
    }
    return (
        <div>
            <MyModal
                title="专题设置"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleAddTopic}
            >
                <Select
                    style={{
                        margin: "30px auto",
                        minWidth: "170px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    onCancel={handleCancel}
                    showSearch
                    placeholder="请选择专题"
                    optionFilterProp="label"
                    options={topics.map(topic => {
                        const title = topic.title || "";
                        return { label: title, value: topic._id };
                    })}
                    onChange={v => setValue(v)}
                />
            </MyModal>
        </div>
    );
};

export default TopicModal;
