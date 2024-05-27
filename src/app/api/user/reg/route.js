import users from "@/models/users";
import {NextResponse} from "next/server";
import connectToDatabase from "@/utils/mongodb";

connectToDatabase()
export async function POST(req){
    try {
        const body = await req.json()
        await users.create({...body})

        return NextResponse.json({
            message:'注册成功!',
            data: null,
            success:true
        },{status:200})
    }catch (error){
        console.log(error);
        return NextResponse.json({
            message:'注册失败！',
            success:false,
            errorMsg:error
        }, {status: 400})
    }
}
