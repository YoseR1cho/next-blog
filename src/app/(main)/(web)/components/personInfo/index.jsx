import React, {useState} from 'react';
import styles from './style.module.scss'
import {Button, Form, Input, Modal} from "antd";
import Upload from "@/app/(main)/(web)/components/personInfo/Upload";
import {useDispatch, useSelector} from "react-redux";
import {normFile} from "@/utils";
import {fetchInfo} from "@/store/user/actionCreators";

const Index = () => {
    const [open,setOpen] = useState(false)
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()


    const hideModal = ()=>setOpen(false)

    const showModal = ()=>setOpen(true)


    const finishHandler = (values) => {
        dispatch(fetchInfo({...values,avatar:values.avatar?values.avatar[0]:''}))
    }



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
                            valuePropName='file'
                        >
                            <Upload avatar={user.avatar}/>
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
