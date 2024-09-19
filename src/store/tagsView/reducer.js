import { createSlice } from "@reduxjs/toolkit";

const tagsViewSlice = createSlice({
    name: "tagsView",
    initialState: { tagList: [] },
    reducers: {
        addTag(state, action) {
            const tag = action.payload;
            if (tag && state.tagList.every(item=>item.key !== tag?.key)) {
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
            state.tagList = state.tagList.filter(item=>item.key === '/admin' || item.key === action.payload.key)
        }
    },
});

export const {reducer:tagsViewReducer} = tagsViewSlice

export const {addTag,deleteTag,emptyTagList,closeOtherTags} = tagsViewSlice.actions
