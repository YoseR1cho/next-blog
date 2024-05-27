'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Button, Select, Tag, message, Spin} from 'antd'
import {notificate} from "@/components/notification";
import styles from '../page.module.scss'
import {useSelector} from "react-redux";
import Editor from "@/app/(main)/(admin)/admin/components/editor";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import {debounce, tagTranslate} from '@/utils'
import {publishArticle} from "@/utils/axios";
import {useRouter} from "next/navigation";

const Page = () => {
    const [form] = Form.useForm();
    const editorRef = useRef();
    const router = useRouter()

    //获取标签并渲染颜色
    const tagList = useSelector(store=>store.article.tagList)
    const [loading,withLoading] = useAjaxLoading();

    const [contextHolder,openNotification] = notificate();



    const onFinish = (values)=>{
        const articlePost = tagTranslate(values,tagList)

        withLoading(publishArticle(articlePost)).then(()=>{
            openNotification('文章发布提醒',`恭喜，您的文章发布成功！`);
            setTimeout(()=>{
                localStorage.removeItem('tuiUIEditor_articleContent');
                localStorage.removeItem('tuiUIEditor_articleSummary');
                localStorage.removeItem('tuiUIEditor_articleTitle');
                router.push('/admin/article/list');
            },2000);
        }).catch(e=>{
            message.error('文章发布失败！请重试。')
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
        console.log(1)
        form.setFieldsValue({
            content:editorRef.current?.editorInst.getMarkdown()
        })
        editorRef.current && localStorage.setItem('tuiUIEditor_articleContent',JSON.stringify(editorRef.current.editorInst.getMarkdown()));
    })

    const formItemTitle = debounce((key,value)=>{
        localStorage.setItem(key,value);
    })


    useEffect(() => {
        const titleInitialValue = localStorage.getItem('tuiUIEditor_articleTitle')?JSON.parse(localStorage.getItem('tuiUIEditor_articleTitle')):''
        const summaryInitialValue = localStorage.getItem('tuiUIEditor_articleSummary')?JSON.parse(localStorage.getItem('tuiUIEditor_articleSummary')):''
        const tagsInitialValue = localStorage.getItem('tuiUIEditor_articleTag')?JSON.parse(localStorage.getItem('tuiUIEditor_articleTag')):[]
        const contentInitialValue = localStorage.getItem('tuiUIEditor_articleContent')?JSON.parse(localStorage.getItem('tuiUIEditor_articleContent')):''
        form.setFieldsValue({
            title:titleInitialValue,
            summary:summaryInitialValue,
            tags:tagsInitialValue
        })
        editorRef.current && editorRef.current.editorInst.setMarkdown(contentInitialValue);
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
                        onChange={()=>formItemTitle('tuiUIEditor_articleTitle',JSON.stringify(form.getFieldValue().title))}

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
                        onChange={()=>formItemTitle('tuiUIEditor_articleSummary',JSON.stringify(form.getFieldValue().summary))}
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
                        onChange={()=>formItemTitle('tuiUIEditor_articleTag',JSON.stringify(form.getFieldValue().tags))}
                    />
                </Form.Item>
                <Form.Item
                    name='content'
                >
                    <Editor
                        editorRef={editorRef}
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
                    >发布</Button>
                </Form.Item>

            </Form>
        </Spin>
    );
};

export default Page;
