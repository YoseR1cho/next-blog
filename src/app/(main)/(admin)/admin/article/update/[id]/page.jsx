'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Button, Select, Tag, message, Spin} from 'antd'
import {notificate} from "@/components/notification";
import styles from '../../page.module.scss'
import {useSelector} from "react-redux";
import Editor from "@/app/(main)/(admin)/admin/components/editor";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import {debounce, idTranslate2Tag, tagTranslate} from '@/utils'
import {patchArticle} from "@/utils/axios";
import {useParams, useRouter} from "next/navigation";
import {getArticle} from "@/utils/api";

const Page = () => {
    const [form] = Form.useForm();
    const editorRef = useRef();
    const router = useRouter()
    const params = useParams()

    //获取标签并渲染颜色
    const tagList = useSelector(store=>store.article.tagList)
    const [loading,withLoading] = useAjaxLoading();

    const [contextHolder,openNotification] = notificate();



    const onFinish = (values)=>{
        const content = editorRef.current.editorInst.getMarkdown();
        const article = {...values,content};
        const articlePost = tagTranslate(article,tagList)

        withLoading(patchArticle(params.id,articlePost)).then(()=>{
            openNotification('文章修改提醒',`恭喜，您的文章修改成功！`);
            setTimeout(()=>{
                router.push('/admin/article/list');
            },2000);
        }).catch(e=>{
            message.error('文章修改失败！请重试。')
        })
    }

    const tagRender = (props) => {
        const { closable, onClose ,label} = props;
        if(!label)  return;
        const {color} = tagList.find(item=>item && item.name===label) || '';
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    const options = tagList.map(item=>{
        return {
            label:item.name,
            value:item.name
        }
    })

    //存储文章信息(添加防抖功能)
    const contentHandler = debounce(()=>{
        form.setFieldsValue({
            content:editorRef.current?.editorInst.getMarkdown()
        })
    })


    useEffect(() => {
        if(typeof window !=='undefined'){
            withLoading(getArticle(params.id)).then(res=>{
                const {title,summary,tags:_tags,content} = res.data
                const tags = idTranslate2Tag(_tags,tagList)
                form.setFieldsValue({
                    title,
                    summary,
                    tags
                })
                editorRef.current && editorRef.current.editorInst.setMarkdown(content);
            })
        }else {
            console.log('window is not defined')
        }
    }, []);

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <Form
                className={styles.form}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label='文章标题'
                    name='title'
                    className={styles.formItem}
                    rules={[
                        {
                            message:'请输入您的标题'
                        }
                    ]}
                >
                    <Input
                        size={"large"}

                    />
                </Form.Item>
                <Form.Item
                    label='文章摘要'
                    name='summary'
                    className={styles.formItem}
                    rules={[
                        {
                            message:'请输入您的摘要'
                        }
                    ]}
                >
                    <Input
                        size={"large"}
                        maxLength={100}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    label='选择标签'
                    name='tags'
                    className={styles.formItem}
                >
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        style={{
                            width: '100%',
                        }}
                        options={options}
                        size='large'
                    />
                </Form.Item>
                <Form.Item
                    name='content'
                >
                    <Editor
                        ref={editorRef}
                        onchange={contentHandler}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset:11
                    }}
                >
                    <Button
                        className={styles.button}
                        htmlType="submit"
                        loading={loading}
                    >修改</Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Page;
