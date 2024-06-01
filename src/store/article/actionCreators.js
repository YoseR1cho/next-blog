import {getAllTagList, getTagList, setTagList} from "@/store/article/reducer";
import {getAllTag} from "@/utils/axios";
import {message} from "antd";

export const getTags = ()=>{
    return async dispatch=>{
        try {
            const res = await getAllTag();
            let list = res.data.map(item=>{
                return {
                    name:item.name,
                    id:item._id
                }
            })
            dispatch(getTagList(list))
        }catch (e){
            message.error('标签获取失败！')
            console.log(e)
        }

    }
}

export const deleteTag = (id)=>{
    return async (dispatch,getState)=>{
        try {
            const tagList = getState().article.tagList
            console.log(tagList);
            const newTagList = tagList.filter(item=>item.id!==id)
            dispatch(setTagList(newTagList))
        }catch (e){
            throw new Error(e)
        }

    }
}
