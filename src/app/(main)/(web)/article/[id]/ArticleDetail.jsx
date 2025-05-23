"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";

// components
import {
    CalendarOutlined,
    EyeOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import ArticleTag from "@/app/(main)/(web)/article/[id]/components/articleTag";
import Navigation from "@/app/(main)/(web)/article/[id]/components/navigation";
import MarkdownTxt from "@/components/MarkdownTxt";

// methods
import { getArticle } from "@/utils/apis/article";
import { isMobile } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

const ArticleDetail = ({ withLoading }) => {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState({
        title: "",
        content: "",
        createAt: "",
        tags: [],
        loading: true,
    });
    useEffect(() => {
        if (params.id) {
            withLoading(
                getArticle(params.id)
                    .then(res => {
                        const data = res.data;
                        data.createAt = dayjs(data.createAt).format(
                            "YYYY.MM.DD"
                        );
                        setArticle({ ...data, loading: false });
                    })
                    .catch(() => {
                        router.push("/404");
                    })
            );
        }
    }, []);

    const { title, content, createAt, view, tags } = article;
    return (
        <>
            <div className={styles.article_main}>
                <div className={styles.post_header}>
                    <h1 className={styles.post_title}>{title}</h1>
                    <div className={styles.app_others}>
                        <div>
                            <EyeOutlined /> {view}
                        </div>
                        <div>
                            <HeartOutlined /> 0
                        </div>
                        <span>
                            <CalendarOutlined />
                            &nbsp; Posted on &nbsp;
                            <span>{createAt}</span>
                        </span>
                    </div>
                    {tags && <ArticleTag tagList={tags} />}
                </div>
                <hr/>
                <div className={styles.article_detail}>
                    <MarkdownTxt markdown={content} />
                </div>
            </div>
            {!isMobile() && (
                <nav className={styles.article_navigation}>
                    <Navigation content={content} />
                </nav>
            )}
        </>
    );
};

export default ArticleDetail;
