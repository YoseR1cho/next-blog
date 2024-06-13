import React, {useState} from 'react';
import styles from './style.module.scss'
import {Button, Form, Input, Modal, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import {useSelector} from "react-redux";
import {normFile} from "@/utils";

const Index = () => {
    const [open,setOpen] = useState(false)
    const [loading,withLoading] = useAjaxLoading();
    const user = useSelector(store=>store.user)
    const [fileList,setFileList] = useState([])

    const hideModal = ()=>setOpen(false)

    const showModal = ()=>setOpen(true)


    const finishHandler = async (values) => {
        console.log(values)
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传您的头像
            </div>
        </button>
    );

    return (
        <>
            <a href="#" onClick={showModal}>个人信息</a>
            <Modal
                open={open}
                onCancel={hideModal}
                destroyOnClose={true}
                title='个人信息'
                maskClosable={false}
                footer={null}
            >
                <Form
                    className={styles.form}
                    onFinish={finishHandler}
                >
                    <div>
                        <span>头像</span>
                        <Form.Item
                            name='avatar'
                            required={true}
                            wrapperCol={{
                                offset:8
                            }}
                            getValueFromEvent={normFile}
                            valuePropName='fileList'
                        >
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                showUploadList={false}
                                className={styles.avatar}
                                beforeUpload={()=>false}
                                onChange={({file})=> console.log(file)}
                            >
                                {user.avatar ? (
                                    <>
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                                height:'100%',
                                                borderRadius:'50%'
                                            }}
                                        />
                                    </>
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                        <p className={styles.warn}>点击更换头像</p>
                    </div>
                    <div>
                        <span>昵称</span>
                        <Form.Item
                            name='username'
                            required={true}
                            wrapperCol={{
                                span:24,
                                offset:1
                            }}
                            initialValue={user.username}
                        >
                            <Input size={"large"}/>
                        </Form.Item>
                    </div>
                    <div>
                        <span>修改密码</span>
                        <Form.Item
                            name='password'
                            required={true}
                            wrapperCol={{
                                span:24,
                                offset:1
                            }}
                        >
                            <Input.Password size={"large"}/>
                        </Form.Item>
                    </div>
                    <Form.Item
                        wrapperCol={{
                            span:24,
                            offset:16
                        }}
                    >
                        <Button onClick={hideModal}>取消</Button>
                        <Button className='blueBtn' style={{marginLeft:'1rem'}} htmlType='submit'>修改</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Index;
