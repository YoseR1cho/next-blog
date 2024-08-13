import {createSlice} from "@reduxjs/toolkit";
import {generateColor} from '@/utils/index'
const defaultState = {
    tagList:[]
}

const articleSlice = createSlice({
    name:'article',
    initialState:defaultState,
    reducers:{
        // rtk默认支持immutable语法
        getTagList(state,action){
            let tagList = generateColor(action.payload)
            state.tagList = tagList;
        },
        deleteTag(state,action){
            state.tagList = state.tagList.filter(tag=>tag.id === action.payload)
        }
    }
})

export const {reducer:articleReducer} = articleSlice;

export const {getTagList,deleteTag} = articleSlice.actions
