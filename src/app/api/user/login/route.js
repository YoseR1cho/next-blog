import users from "@/models/users";
import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/mongodb";
import { auth } from "@/utils/helpers/auth";

connectToDatabase();
export async function POST(req) {
    try {
        //从请求体获取用户名和密码
        let { username, password } = await req.json();
        const data = (await users.findOne({ username, password }))._doc

        if (!data) {
            return NextResponse.json(
                {
                    errorMsg: "用户名或密码错误！",
                    success: false,
                },
                { status: 400 }
            );
        }
        //创建当前用户的token

        let accessToken = auth.createAccessToken({ id: data._id.toString() });
        let refreshToken = auth.createRefreshToken({ id: data._id.toString() });

        return NextResponse.json(
            {
                message: "登录成功!",
                data: {
                    ...data,
                    token: accessToken,
                    refreshToken,
                    password: null,
                },
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                errorMsg: "登录失败！",
                success: false,
            },
            { status: 500 }
        );
    }
}
