import connectToDatabase from "@/utils/mongodb";
import users from "@/models/users";
import {NextResponse} from "next/server";

connectToDatabase()
export async function POST(req){

    try {
        //从请求体获取用户名和密码
        let {username,password} = await req.json()
        const data = await users.findOne({username,password})

        if(!data){
            return NextResponse.json({
                errorMsg:'用户名或密码错误！',
                success:false
            }, {status: 400})
        }

        const {_id:id,role,avatar} =data;
        //创建当前用户的token
        const user ={
            username,
            id,
            role,
            avatar:avatar || ''
        }
        let token =jwt.sign(user,process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,{
            expiresIn: 60*60*24*3
        });

        return NextResponse.json({
            message:'登录成功!',
            data: {token,id,role,avatar},
            success:true
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'登录失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
}
