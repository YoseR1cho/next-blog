import {createSlice} from "@reduxjs/toolkit";
import {generateColor} from '@/utils/index'
const defaultState = {
    topicList:[]
}

const topicSlice = createSlice({
    name:'topic',
    initialState:defaultState,
    reducers:{
        // rtk默认支持immutable语法
        getTopicList(state,action){
            state.topicList = action.payload;
        },
        addNewTopic(state,action){
            state.topicList = [...state.topicList,action.payload]
        },
        setTopicList(state,action){
            state.topicList = action.payload
        },
        deleteOneTopic(state,action){
            state.topicList = state.topicList.filter(item=>item._id !== action.payload)
        }
    }
})

export const {reducer:topicReducer} = topicSlice;

export const {getTopicList,addNewTopic,setTopicList,deleteOneTopic} = topicSlice.actions
