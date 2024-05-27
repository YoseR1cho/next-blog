'use client'
import React from 'react';
import {useEffect} from "react";
import {getTags} from "@/store/article/actionCreators";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {fetchToken} from "@/store/user/actionCreators";

const PublicComponents = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTags())

    }, []);
    return (
        <>
            {children}
        </>
    );
};

export default PublicComponents;
