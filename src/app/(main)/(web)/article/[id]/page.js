'use client'
import React from 'react';
import Spin from '@/components/spin'
import styles from './page.module.scss'
import ArticleDetail from "@/app/(main)/(web)/article/[id]/ArticleDetail";
import useAjaxLoading from "@/hooks/useAjaxLoading";

const Page = () => {
    const [loading,withLoading] = useAjaxLoading()

    return (
       <Spin loading={loading}>
            <article className={styles.app_article}>
                <ArticleDetail withLoading={withLoading}/>
            </article>
        </Spin>
    );
};

export default Page;
