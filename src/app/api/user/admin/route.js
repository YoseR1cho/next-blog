import users from "@/models/users";
import {NextResponse} from "next/server";
import connectToDatabase from "@/utils/mongodb";
import {headers} from "next/headers";
import jwt from "jsonwebtoken";
import {SECRET} from "@/utils/config";

connectToDatabase()

export async function GET(req){
    try {
        // 获取请求头authorization上的token信息
        let token = headers().get('authorization').split(' ')[1] || ''
        if(!token)  throw new Error('token信息为空！')

        //jwt校验token信息
        const {username,id,role} = await jwt.verify(token,SECRET,["HS256"])

        //校验成功则注册新的token用于持久化登录
        const newToken =jwt.sign({username,id,role},SECRET,
            {expiresIn: 60 * 60 * 24 * 3}
        );

        return NextResponse.json({
            message:'token校验成功!',
            data: {username,id,role,newToken},
            success:true
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'token校验失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
}
