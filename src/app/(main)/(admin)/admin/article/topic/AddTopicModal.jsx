import React, {useState} from 'react';
import MyModal from "@/components/MyModal";
import {Input, message, Typography} from "antd";
import {useDispatch} from "react-redux";
import {setTopics} from "@/store/topic/actionCreators";

const AddTopicModal = ({isModalOpen,setIsModalOpen}) => {
    const [value,setValue] = useState('')
    const dispatch = useDispatch()
    const handleModalClose = ()=>{
        setIsModalOpen(false)
    }

    const handleAdd = async()=>{
        try{
            await dispatch(setTopics(value))

            handleModalClose()

            message.success('专题添加成功！')
        }catch (e){
            message.error(e.message)
        }
    }

    return (
        <div>
            <MyModal open={isModalOpen} title='添加专题' onCancel={handleModalClose} onOk={handleAdd}>
                <Typography.Title level={5}>专题名称</Typography.Title>
                <Input placeholder='请输入新增专题名称' styles={{width:'300px'}} value={value} onChange={e=>setValue(e.target.value)}/>
            </MyModal>
        </div>
    );
};

export default AddTopicModal;
