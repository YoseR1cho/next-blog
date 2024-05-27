'use client'
import React, {useState, useRef, useEffect} from 'react';
import styles from './page.module.scss'
import {useSelector} from 'react-redux'
import {CheckCircleOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {notification} from "antd";
import {addTag, deleteTag} from "@/utils/axios";

const Page = () => {
    const inputRef = useRef();
    const tagList = useSelector(store=>store.article.tagList)
    const [isAdding,setIsAdding] = useState(false);
    const [loading,setLoading] = useState(false);
    const blurHandler = async ()=>{
        const value = inputRef.current.value.trim();
        if(value!==''){
            setLoading(true);
            await addTag({name: value})
            openNotification()
            setLoading(false);
            setIsAdding(false);
            window.location.reload();
        }else{
            setIsAdding(false);
        }
    }

    const tagDelete = async (id)=>{
        setLoading(true);
        await deleteTag(id)
        openNotification();
        setLoading(false);
        setTimeout(()=>{
            window.location.reload();
        },1000)
    }

    useEffect(() => {
        isAdding && inputRef.current.focus();
    }, [isAdding]);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.info({
            message: isAdding?'标签添加成功':'标签删除成功',
            placement:'topRight',
            icon:<CheckCircleOutlined style={{color:'#00EE00'}}/>
        });
    };

    return (
        <div className={styles.main}>
            {contextHolder}
            <h1 className={styles.title}>标签管理</h1>
            <div className={styles.tagList}>
                {tagList.map(tag=>{
                    return (
                        <div key={tag.id} className={styles.tag}>
                            {tag.name}
                            <CloseOutlined className={styles.delete} onClick={()=>tagDelete(tag.id)}/>
                        </div>
                    )
                })}
                    {
                        !isAdding?<div className={styles.add} onClick={()=>setIsAdding(true)}>
                                <PlusOutlined /><span>New Tag</span>
                            </div>
                            : <input type="text" className={styles.input} onBlur={blurHandler} ref={inputRef}/>
                    }
        </div>
       </div>
    );
};

export default Page;
