import React, { useEffect, useState,useRef } from "react";
import {message, Select} from "antd";
import MyModal from "@/components/MyModal";
import {recordedArticle2Topic,getTopicsByArticle,deleteArticle2Topic} from "@/utils/apis/article";
import {useSelector} from "react-redux";

const TopicModal = ({ isModalOpen, setModalOpen, articleId }) => {
    const [selectedTopic,setSelectedTopic] = useState([]); 
    const [loading,setLoading] = useState(false)
    const topics = useSelector(store => store.topic).topicList;
    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleAddTopic = async ()=>{
        try{
            handleCancel()
        }catch (e){
            message.error(e.message)
        }
    }

    const onSelectedChange = (value) => {
        function setTopic(){
            message.success('专题设置成功！')
            setSelectedTopic(value);
            setLoading(false)
        }
        setLoading(true)
        if(value.length>selectedTopic.length){
            const selectedTopicId = value.filter(item=>!selectedTopic.includes(item))
            recordedArticle2Topic({
                articleId,
                topicId:selectedTopicId
            }).then(()=>{
                setTopic()
            })
        }else{
            const removeTopicId = selectedTopic.find(item=>!value.includes(item))
            deleteArticle2Topic({
                articleId,
                topicId:removeTopicId
            }).then(()=>{
                setTopic()
            })
        }
        
        
    };

    useEffect(()=>{
        setLoading(true)
        getTopicsByArticle(articleId).then(res=>{
            const data = res.data?.map(item=>item._id)
            setSelectedTopic(data)
            setLoading(false)
        })
    },[])
    return (
        <div>
            <MyModal
                title="专题设置"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleAddTopic}
                destroyOnClose={true}
                confirmLoading={loading}
            >
                <Select
                    style={{
                        margin: "30px auto",
                        minWidth: "170px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        maxWidth: "250px",
                    }}
                    mode="multiple"
                    value={selectedTopic}
                    onCancel={handleCancel}
                    showSearch
                    placeholder="请选择专题"
                    optionFilterProp="label"
                    options={topics.map(topic => {
                        const title = topic.title || "";
                        return { label: title, value: topic._id };
                    })}
                    onChange={onSelectedChange}
                />
            </MyModal>
        </div>
    );
};

export default TopicModal;
