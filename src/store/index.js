"use client";
import { configureStore } from "@reduxjs/toolkit";
import { articleReducer } from "@/store/article/reducer";
import { userReducer } from "@/store/user/reducer";
import { Provider } from "react-redux";
import { tagsViewReducer } from "@/store/tagsView/reducer";
import {topicReducer} from "@/store/topic/reducer";

const store = configureStore({
    reducer: {
        article: articleReducer,
        user: userReducer,
        tagsView: tagsViewReducer,
        topic:topicReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            //关闭redux序列化检测
            serializableCheck: false,
        }),
});

export default function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
