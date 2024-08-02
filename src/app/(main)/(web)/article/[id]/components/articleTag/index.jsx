import React from 'react'
import styles from '@/app/(main)/(web)/article/[id]/page.module.scss'

// components
import Link from "next/link";
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import {idTranslate2Tag} from "@/utils";

const ArticleTag = (props)=>{
    const tagColorList = useSelector(store=>store.article.tagList);
    let {tagList} = props;
    tagList = idTranslate2Tag(tagList,tagColorList);
    return (
        <div>
            {tagList.length > 0 && (
                <div className={styles.tag_List}>
                    {tagList.map((tag, i) => (
                        <Tag key={i} color={tag.color} >
                            <Link href={`/home/${tag.name}`}>{tag.name}</Link>
                        </Tag>
                    ))}
                </div>
            )}
        </div>
    )
}

export default React.memo(ArticleTag);
