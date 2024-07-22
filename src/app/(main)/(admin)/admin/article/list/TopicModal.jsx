import React from 'react';
import {Button, Col, Modal, Select} from "antd";
import GreenButton from "@/components/button/GreenButton";
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
                            minWidth:'170px'
                        }}
                        onCancel={handleCancel}
                        showSearch
                        placeholder="Select a person"
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
