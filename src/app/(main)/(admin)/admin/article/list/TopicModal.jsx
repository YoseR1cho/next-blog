import React from 'react';
import {Button, Modal, Select} from "antd";
import BlueButton from "@/components/button/BlueButton";

const TopicModal = ({isModalOpen,setModalOpen}) => {
    const handleCancel = ()=>{
        setModalOpen(false)
    }
    return (
        <div>
            <Modal title='专题设置' open={isModalOpen} footer={
                <div style={{display:"flex",justifyContent:"center",gap:'2rem'}}>
                    <Button onClick={handleCancel}>取消</Button>
                    <BlueButton>确认</BlueButton>
                </div>
            }>
                    <Select
                        style={{
                            margin:"30px auto",
                            minWidth:'170px',
                            left:"50%",
                            transform:"translateX(-50%)"
                        }}
                        onCancel={handleCancel}
                        showSearch
                        placeholder="请选择专题"
                        optionFilterProp="label"
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                    />
            </Modal>
        </div>
    );
};

export default TopicModal;
