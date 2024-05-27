'use client'
import React, {Suspense, useRef} from 'react';
import styles from './page.module.scss'

import Spin from "@/components/spin";
import WebPagination from '@/app/(main)/(web)/components/pagination'
import List from './List'

import {HOME_PAGESIZE} from "@/utils/config";

//hooks
import { useSearchParams,useParams} from "next/navigation";
import useFetchList from "@/hooks/useFetchList";;


const Page = () => {
    const params = useParams()
    const homeRef = useRef();
    const searchParams = useSearchParams().toString()
    console.log(searchParams);

    // 发送请求获取文章列表和页面跳转信息
    const { loading, pagination, dataList } = useFetchList({
        queryParams: { pageSize: HOME_PAGESIZE,key:params},
        fetchDependence: [searchParams],
    })


    return (
        <>
            <Spin loading={loading} />
            <div className={styles.app_home} ref={homeRef}>
                <List list={dataList}></List>
                <WebPagination
                    {...pagination}
                    onChange={(page,pageSize)=>{
                        pagination.onChange(page,pageSize);
                    }}
                />
            </div>
        </>

    );
};


export default function PageBar(){
    return (
        <Suspense>
            <Page/>
        </Suspense>
    )
}
