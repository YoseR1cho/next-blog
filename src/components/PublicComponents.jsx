'use client'
import React from 'react';
import {useEffect} from "react";
import {getTags} from "@/store/article/actionCreators";
import {useDispatch} from "react-redux";
import {getTopics} from "@/store/topic/actionCreators";
import {message} from "antd";

const PublicComponents = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        try{
            dispatch(getTags())
            dispatch(getTopics())
        }catch (e) {
            message.error(e.message)
        }

    }, []);
    return (
        <>
            {children}
        </>
    );
};

export default PublicComponents;
