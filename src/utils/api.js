import {request} from "@/utils/axios";

//获取文章列表
export const getArticleList = (requestParams)=>request.get('/article',{
    params:requestParams
})

//获取单篇文章
export const getArticle = (id)=>request.get(`/article/${id}`)

//发布文章
export const publishArticle = (article)=>request.post('/article',{...article});

//删除文章
export const deleteArticle = (id)=>request.delete(`/article/delete/${id}`)

//修改文章
export const patchArticle = (id,article)=>request.patch(`/article/${id}`,{...article});

//获取所有标签
export const getAllTag = ()=>request.get('/tag');

//添加标签
export const addTag = (values) =>request.post('/tag',{...values});

//删除标签
export const deleteTag = (id)=>request.delete(`/tag/delete/${id}`);
// 用户登录
export const userLogin = (user)=>request.post('/user/login',user)

// 用户注册
export const userRegister = (user)=>request.post('/user/reg',user);

// 验证token
export const tokenLogin = (token)=>request.get('/user/admin',{
    headers:{
        Authorization:token
    }
});
