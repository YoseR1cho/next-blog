import { apiHandler } from "@/utils/helpers/api/api-handler";
import { auth } from "@/utils/helpers/auth";
import { NextResponse } from "next/server";

const refreshToken = apiHandler(
    async req => {
        try {
            // 获取用户id
            const id = req.headers.get("userId");
            console.log(id);

            const accessToken = auth.createAccessToken({ id });
            const refreshToken = auth.createRefreshToken({ id });

            return NextResponse.json(
                {
                    message:'token刷新成功',
                    data:{
                        accessToken,
                        refreshToken,
                    },
                    success: true,
                },
                { status: 200 }
            );
        } catch (err) {
            console.log(err)
            return NextResponse.json({
                errorMsg:err.message,
                success:false
            },{status:500})
        }
    },
    {
        jwt: true,
    }
);

export const POST = refreshToken
