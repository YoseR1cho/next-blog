import {addTag as _addTag,deleteTag as _deleteTag,emptyTagList as _emptyTagList,closeOtherTags as _closeOtherTags} from './reducer'
export const addTag = (payload)=>dispatch=>{
    dispatch(_addTag(payload))
}

export const deleteTag = (payload)=>dispatch=>{
    dispatch(_deleteTag(payload))
}

export const emptyTagList = ()=>dispatch=>{
    dispatch(_emptyTagList())
}

export const closeOtherTags = (payload)=>dispatch=>{
    dispatch(_closeOtherTags(payload))
}
