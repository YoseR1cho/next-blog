import articles from "@/models/articles";
import {NextResponse} from "next/server";
import connectToDatabase from "@/utils/mongodb";

connectToDatabase()

//获取单篇文章
export async function GET(req,{params}){
    try {
        const id = params.id;
        const data = await articles.find({_id:id}).populate().exec()
        await articles.updateOne({_id:id},{$inc:{view:1}})

        return NextResponse.json({
            message:'获取文章成功！',
            success:true,
            data:data[0]
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'获取文章失败！',
            success:false,
            errorMsg:error
        },{status:500})
    }
}

//修改单篇文章
export async function PATCH(req,{params}){
    try {
        const id = params.id;
        const body = await req.json()
        const data = await articles.updateOne({_id:id},body)

        return NextResponse.json({
            message:'修改文章成功！',
            success:true,
            data:data
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'修改文章失败！',
            success:false,
            errorMsg:error
        },{status:500})
    }
}

//删除单篇文章
export async function DELETE(req,{params}){
    try {
        let id = params.id;
        const data = await articles.deleteOne({_id:id})

        return NextResponse.json({
            message:'删除文章成功！',
            success:true,
            data:data
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'删除文章失败！',
            success:false,
            errorMsg:error
        },{status:500})
    }
}
