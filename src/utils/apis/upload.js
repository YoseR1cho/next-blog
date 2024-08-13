import {request} from "@/utils/axios";

//上传图片到服务器
export const uploadImg = (form)=>request.post('/upload',form)
