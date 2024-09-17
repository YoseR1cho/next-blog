import {request} from "@/utils/axios";

//获取所有标签
export const getAllTag = ()=>request.get('/tag');

//添加标签
export const addTag = values => request.post("/tag", { ...values });

//删除标签
export const deleteOneTag = id => request.delete(`/tag/${id}`);
