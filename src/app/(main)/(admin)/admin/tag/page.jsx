'use client'
import React, {useState, useRef, useEffect} from 'react';
import styles from './page.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {CheckCircleOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {message, notification} from "antd";
import {addTag} from "@/utils/axios";
import {getTags,deleteTag} from "@/store/article/actionCreators";

const Page = () => {
    const dispatch = useDispatch()
    const inputRef = useRef();
    const tagList = useSelector(store=>store.article.tagList)
    const [isAdding,setIsAdding] = useState(false);
    const [loading,setLoading] = useState(false);

    const blurHandler = async ()=>{
        const value = inputRef.current.value.trim();
        if(value!==''){
            setLoading(true);
            await addTag({name: value})
            await dispatch(getTags())
            message.success('标签添加成功')
            setLoading(false);
            setIsAdding(false);
        }else{
            setIsAdding(false);
        }
    }

    const tagDelete = async (id)=>{
        setLoading(true);
        try {
            await deleteTag(id)
            await dispatch(deleteTag(id))
            setLoading(false);
            message.success('标签删除成功！')
        }catch (e){
            console.log(e);
            setLoading(false);
            message.error('标签删除失败！')

        }
    }

    useEffect(() => {
        isAdding && inputRef.current.focus();
    }, [isAdding]);

    return (
        <div className={styles.main}>
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
