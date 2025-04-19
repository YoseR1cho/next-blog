import {request} from "@/utils/axios";

//获取单篇文章
export const getArticle = (id)=>request.get(`/article/${id}`)

//获取文章列表
export const getArticleList = requestParams =>
    request.get("/article", { params: requestParams });


//发布文章
export const publishArticle = article => request.post("/article", article);

//删除文章
export const deleteArticle = id => request.delete(`/article/${id}`);

//修改文章
export const patchArticle = (id, article) =>
    request.patch(`/article/${id}`, { ...article });

// 将文章收录进主题
export const recordedArticle2Topic = (body)=>request.post('/topic/articleManage',body)

export const deleteArticle2Topic = (body)=>request.delete('/topic/articleManage',{data:body})

export const getTopicsByArticle = (articleId)=>request.get(`/article/colTopic?articleId=${articleId}`)
