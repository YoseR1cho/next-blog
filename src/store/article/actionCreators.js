import {getTagList} from "@/store/article/reducer";
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
