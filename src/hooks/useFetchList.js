import {useCallback, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {decodeQuery} from  '@/utils'
import useMount from '@/hooks/useMount'
import {getArticleList} from "@/utils/axios";
import {useSelector} from "react-redux";

export default function useFetchList({
    queryParams= null,
    withLoading = true,
    fetchDependence = [],
    key=''
}){
    console.log(queryParams);
    const [dataList,setDataList] = useState([])
    const [loading,setLoading] = useState(false);
    const [pagination,setPagination] = useState({current:1,pageSize:10,total:0});

    const router = useRouter()
    const searchParams = useSearchParams().toString()
    const pathname = usePathname()
    const tagList = useSelector(store=>store.article.tagList);

    useMount(()=>{
        if(fetchDependence.length===0){
            fetchWithLoading();
        }
    })

    useEffect(()=>{
        if(fetchDependence.length>0){
            const params = decodeQuery(searchParams || '')
            fetchWithLoading(params)
        }
    },fetchDependence)

    function fetchWithLoading(params){
        withLoading && setLoading(true);
        fetchDataList(params);
    }

    function fetchDataList(params){
        const requestParams = {
            page:pagination.current,
            pageSize:pagination.pageSize,
            ...queryParams,
            ...params
        }
        requestParams.page = parseInt(requestParams.page);
        requestParams.pageSize = parseInt(requestParams.pageSize);
        getArticleList(requestParams).then(res=>{
            let data = res.data[0]
            pagination.total = data.totalCount[0].totalCount;
            pagination.current = parseInt(requestParams.page);
            pagination.pageSize = parseInt(requestParams.pageSize);
            setDataList(data.articleData);
            withLoading && setLoading(false)
        }).catch(e=>withLoading && setLoading(false));
    }

    const onFetch = useCallback(params=>{
        withLoading && setLoading(true)
        fetchDataList(params)

    },[queryParams]);

    const handlePageChange = useCallback(
        (page, pageSize) => {
            // return
            const search = searchParams.includes('page=')
                ? searchParams.replace(/(page=)(\d+)/, `?$1${page}`).replace(/(pageSize=)(\d+)/, `pageSize=${pageSize}`)
                : `?page=${page}&pageSize=${pageSize}`
            const jumpUrl = pathname + search
            router.push(jumpUrl)
        },
        [queryParams, pathname]
    )



    return {
        dataList,
        loading,
        pagination: {
            ...pagination,
            onChange: handlePageChange
        },
        onFetch
    }
}
