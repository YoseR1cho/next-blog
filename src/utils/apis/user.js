import { request } from "@/utils/axios";

// 用户登录
export const userLogin = user => request.post("/user/login", user);
// 用户注册
export const userRegister = user => request.post("/user/reg", user);

// 验证token
export const tokenLogin = () => request.post("/user/verify");

// 后台验证
export const verifyAdmin = ()=>request.post('/user/admin')

export const refreshToken = () => request.post("/user/refreshToken");
