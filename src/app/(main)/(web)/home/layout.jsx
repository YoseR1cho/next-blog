"use client";
import React, { Suspense, useRef } from "react";
import styles from "./page.module.scss";

import Spin from "@/components/spin/index"
import WebPagination from "@/app/(main)/(web)/components/pagination";
import List from "./List";

import { HOME_PAGESIZE } from "@/utils/config";

//hooks
import { useSearchParams, useParams } from "next/navigation";
import useFetchList from "@/hooks/useFetchList";
import TopicSider from "@/app/(main)/(web)/components/topicSider";

const Layout = ({ children }) => {
    const params = useParams();
    const homeRef = useRef();
    const searchParams = useSearchParams().toString();
    console.log(params);

    // 发送请求获取文章列表和页面跳转信息
    const { loading, pagination, dataList } = useFetchList({
        queryParams: { pageSize: HOME_PAGESIZE, key: params },
        fetchDependence: [searchParams],
    });


    return (
        <>
            <Spin loading={loading} />
            <div className={styles.app_home} ref={homeRef}>
                {children}
                <List list={dataList}></List>
                <WebPagination
                    {...pagination}
                    onChange={(page, pageSize) => {
                        pagination.onChange(page, pageSize);
                    }}
                />
                <TopicSider/>
            </div>
        </>
    );
};

export default function PageBar() {
    return (
        <Suspense>
            <Layout />
        </Suspense>
    );
}
