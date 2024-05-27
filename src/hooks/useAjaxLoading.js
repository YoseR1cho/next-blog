import {useCallback, useState} from "react";

export default function useAjaxLoading(){
    const [loading,setLoading] = useState(false);

    const  withLoading = useCallback((request)=>{
        if(request instanceof Promise){
            return new Promise((resolve,reject)=>{
                setLoading(true);
                request.then(res=>{
                    resolve(res);
                    setLoading(false);
                }).catch(e=>{
                    reject(e);
                    setLoading(false);
                })

            })
        }
    },[])
    return [loading,withLoading];
}
