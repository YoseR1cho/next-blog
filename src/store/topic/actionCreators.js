import {addTopic, getAllTopic,deleteTopic as _deleteTopic} from "@/utils/apis/topic";
import {addNewTopic, deleteOneTopic, setTopicList} from "@/store/topic/reducer";
import {recordedArticle2Topic} from "@/utils/apis/article";
export const getTopics= ()=>{
    return async dispatch=>{
        try {
            const res = await getAllTopic();
            let list = res.data
            dispatch(setTopicList(list))
        }catch (e){
            console.log(e)
            throw new Error(e)
        }

    }
}

export const recordedArticle= (payload)=>{
    return async dispatch=>{
        try {
            await recordedArticle2Topic(payload);
        }catch (e){
            console.log(e)
            throw new Error(e)
        }

    }
}

export const setTopics = (payload)=>{
    return async dispatch =>{
        try{
            await addTopic(payload)

            await Promise.all([dispatch(addNewTopic(payload)),dispatch(getTopics())])

        }catch (e){
            console.log(e)
            throw new Error(e)
        }
    }
}

export const deleteTopic = (payload)=>{
    return async dispatch=>{
        try{
            await _deleteTopic(payload)

            dispatch(deleteOneTopic(payload))
        }catch (e){
            console.log(e)
            throw new Error(e)
        }
    }
}
