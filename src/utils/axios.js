import axios from "axios";
import { API_URL } from "./config";
import { message } from "antd";
import {
    getToken,
    refreshToken as _refreshToken,
    getRefreshToken,
} from "@/utils/token";

export const request = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

let isRefreshing;
const requests = [];

// 拦截请求
request.interceptors.request.use(
    config => {
        const token = isRefreshing
            ? getRefreshToken()
            : getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        message.error("bed request");
        return Promise.reject(error);
    }
);

// 拦截响应
request.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        if (response.data.code !== "0000") {
            switch (response.data.code) {
                // 登录错误处理
                case "3001":
                    throw new Error(response.data.msg);
                //注册错误处理
                case "3002":
                    throw new Error(response.data.msg);
            }
        }
        return response.data;
    },
    err => {
        if (err.response) {
            const { status, data, config } = err.response;
            if (
                status === 401 &&
                data.expire &&
                !config.url.includes("/refresh")
            ) {
                // 如果有token正在刷新
                if (!isRefreshing) {
                    isRefreshing = true;

                    return _refreshToken()
                        .then(token => {
                            console.log(token);
                            // 如果已经刷新了token，将队列中所有请求重试
                            requests.forEach(cb => cb(token));
                            requests.length = 0;
                            isRefreshing = false

                            return request(config);
                        })
                        .catch(err => {
                            throw new Error(
                                `refresh token error=>${err.message}`
                            );
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                } else {
                    return new Promise(resolve => {
                        requests.push(token => {
                            config.baseURL = "";
                            config.headers["Authorization"] = `Bearer ${token}`;

                            resolve(request(config));
                        });
                    });
                }
            }
        } else {
            console.log(err.message);
            // message.error(err.message)
        }
        return Promise.reject(err);
    }
);

//获取文章列表
export const getArticleList = requestParams =>
    request.get("/article", { params: requestParams });

//获取单篇文章
export const getArticle = id => request.get(`/article/${id}`);

//发布文章
export const publishArticle = article => request.post("/article", article);

//删除文章
export const deleteArticle = id => request.delete(`/article/${id}`);

//修改文章
export const patchArticle = (id, article) =>
    request.patch(`/article/${id}`, { ...article });

//获取所有标签
export const getAllTag = () => request.get("/tag");

//添加标签
export const addTag = values => request.post("/tag", { ...values });

//删除标签
export const deleteTag = id => request.delete(`/tag/${id}`);

// 用户登录
export const userLogin = user => request.post("/user/login", user);
// 用户注册
export const userRegister = user => request.post("/user/reg", user);

export const refreshToken = () =>
    request.post("/user/refreshToken");

// 验证token
export const tokenLogin = () =>
    request.post("/user/verify");
