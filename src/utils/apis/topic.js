import {request} from "@/utils/axios";

//获取所有专题
export const getAllTopic = ()=>request.get('/topic')

// 添加一个专题
export const addTopic = title=>request.post('/topic', {title})

// 删除一个专题
export const deleteTopic = id=>request.delete(`/topic/${id}`)

