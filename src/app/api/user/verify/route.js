import users from "@/models/users";
import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/mongodb";
import {apiHandler} from "@/utils/helpers/api/api-handler";
import {auth} from "@/utils/helpers/auth";

connectToDatabase();

const verifyIdentity = apiHandler(async (req)=> {
        try {
            // 从请求头获取用戶id
            const id = req.headers.get('userId')



            //校验成功则注册新的token用于持久化登录
            const newToken = auth.createAccessToken({id})

            return NextResponse.json(
                {
                    message: "token校验成功!",
                    data: { ...data, newToken, password: null },
                    success: true,
                },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                {
                    message: "token校验失败！",
                    success: false,
                    errorMsg: error,
                },
                { status: 500 }
            );
        }
    },
    {
        isJwt:true
    }
)
export const POST = verifyIdentity
