'use client'
import React from 'react';
import styles from "./styles.module.scss";
import {Tag} from "antd";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

const TagContainer = () => {
    const tagList = useSelector(state=>state.article.tagList)
    const router = useRouter()
    const clickHandler = (name)=>{
        router.push(`/tags/${name}`)
        window.location.reload();
    }
    return (
        <div className={styles.tag_wrap}>
            {tagList.map(tag=>{
                return (
                    <Tag className={styles.tag} color={tag.color} onClick={()=>clickHandler(tag.name)} key={tag.id}>
                    {tag.name}
                </Tag>
                )
            })}
        </div>
    );
};

export default TagContainer;
