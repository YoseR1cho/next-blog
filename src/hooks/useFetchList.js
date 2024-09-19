import {useCallback, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {decodeQuery} from  '@/utils'
import useMount from '@/hooks/useMount'
import {getArticleList} from "@/utils/apis/article";
import useCompare from "@/hooks/useCompare";

export default function useFetchList({
    queryParams= null,
    withLoading = true,
    fetchDependence = [],
}){
    const [dataList,setDataList] = useState([])
    const [loading,setLoading] = useState(false);
    const [pagination,setPagination] = useState({current:1,pageSize:10,total:0});

    const router = useRouter()
    const pathname = usePathname()

    useMount(()=>{
        if(!fetchDependence){
            fetchWithLoading();
        }
    })

    useEffect(()=>{
        if(fetchDependence){
            const params = decodeQuery(fetchDependence.searchParams || '')
            fetchWithLoading(params)
        }
    },[useCompare(fetchDependence),useCompare(queryParams)])

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
            pagination.total = data.totalCount[0]?.totalCount;
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
            const search = fetchDependence.searchParams?.includes('page=')
                ? fetchDependence.searchParams.replace(/(page=)(\d+)/, `?$1${page}`).replace(/(pageSize=)(\d+)/, `pageSize=${pageSize}`)
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
