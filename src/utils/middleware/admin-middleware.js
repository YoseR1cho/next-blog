import {tokenLogin, verifyAdmin} from "@/utils/apis/user";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";

export const adminConfig = {
    matcher:'/admin/*'
}

export async function adminMiddleware(req){
    try{
        if(!req.cookies.get('Authorization'))   throw new Error('无登录token！')
        // 获取用户登录信息
        await verifyAdmin()

        console.log(1)
        return NextResponse.next();
    }catch (e){
        console.log(e)
        return NextResponse.redirect(new URL('/home',req.url))
    }
}
