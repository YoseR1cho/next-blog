"use client";
import React, { Suspense, useState } from "react";
import { List } from "antd";
import { notificate } from "@/components/notification";
import styles from "../page.module.scss";
import useFetchList from "@/hooks/useFetchList";
import { BACKGROUND_PAGESIZE } from "@/utils/config";
import { deleteArticle } from "@/utils/axios";
import Confirm from "@/app/(main)/(admin)/admin/components/confirm";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ArticleTable from "@/app/(main)/(admin)/admin/article/list/ArticleTable";
import {useSelector} from "react-redux";
import {idTranslate2Tag} from "@/utils";

const Page = () => {
    const searchParams = useSearchParams().toString();
    const [deleting, setDeleting] = useState({ state: false, id: "" });
    const [contextHolder, openNotification] = notificate();
    const router = useRouter();
    const tagColorList = useSelector(store=>store.article.tagList);

    const { pagination, dataList, loading, onFetch } = useFetchList({
        queryParams: { pageSize: BACKGROUND_PAGESIZE },
        fetchDependence: [searchParams],
    });


    const confirmDelete = () => {
        const id = deleting.id;
        deleteArticle(id)
            .then(() => {
                setDeleting({ stmate: false, id: "" });
                openNotification("文章删除提醒", "恭喜，您的文章删除成功！");
                onFetch();
            })
            .catch(() => {
                openNotification("文章删除提醒", "文章删除失败！");
                setDeleting({ state: false, id: "" });
            });
    };

    const editArticle = article => {
        router.push(`/admin/article/update/${article._id}`);
    };

    return (
        <>
            {contextHolder}
            <div className={styles.manager}>
                {deleting.state && (
                    <Confirm
                        message="确定要删除该文章吗？"
                        onOk={confirmDelete}
                        setDeleting={setDeleting}
                    />
                )}
                <ArticleTable data={dataList} loading={loading} />
            </div>
        </>
    );
};
export default function PageBar() {
    return (
        <Suspense>
            <Page />
        </Suspense>
    );
}
