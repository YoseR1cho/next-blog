import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";

const tagsViewSlice = createSlice({
    name: "tagsView",
    initialState: { tagList: [] },
    reducers: {
        addTag(state, action) {
            const tag = action.payload;
            console.log(tag);
            if (state.tagList.every(item=>item.key !== tag.key)) {
                state.tagList = [...state.tagList, tag];
            }
        },
        deleteTag(state, action) {
            state.tagList = state.tagList.filter(item => item.key !== action.payload.key);
        },
        emptyTagList(state, action) {
            state.tagList = state.tagList.filter(item => item.key === '/admin');
        },
        closeOtherTags(state,action){
            state.tagList = state.tagList.filter(item=>item.key === '/admin' || item === action.payload)
        }
    },
});

export const {reducer:tagsViewReducer} = tagsViewSlice

export const {addTag,deleteTag,emptyTagList,closeOtherTags} = tagsViewSlice.actions
