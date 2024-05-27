'use client'
import {configureStore} from "@reduxjs/toolkit";
import {articleReducer} from "@/store/article/reducer";
import {userReducer} from "@/store/user/reducer";
import {Provider} from "react-redux";

const store = configureStore({
    reducer:{
        article:articleReducer,
        user:userReducer
    }
})

export default function ReduxProvider({children}){

    return <Provider store={store}>{children}</Provider>
}

