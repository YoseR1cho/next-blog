import { getTagList, deleteTag as _deleteTag} from "@/store/article/reducer";
import { getAllTag } from "@/utils/apis/tag";
import {deleteOneTag} from "@/utils/apis/tag";

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
            throw new Error(e)
        }

    }
}

export const deleteTag = (id)=>{
    return async (dispatch)=>{
        try {
            await deleteOneTag(id)

            dispatch(_deleteTag(id))
        }catch (e){
            throw new Error(e)
        }

    }
}
