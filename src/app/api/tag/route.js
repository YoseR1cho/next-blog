import tags from "@/models/tags";
import {NextResponse} from "next/server";
import connectToDatabase from "@/utils/mongodb";
import articles from "@/models/articles";

connectToDatabase()
export async function GET(req){
    try {
        const data = await tags.find()
        return NextResponse.json({
            message:'获取标签列表成功!',
            data:data,
            success:true
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'获取标签列表失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
}

export async function POST(req){
    try {
        const body = await req.json()
        const data = await tags.create({
            ...body,
        })
        return NextResponse.json({
            message:'标签添加成功!',
            data:data,
            success:true
        },{status:200})
    }catch (error){
        return NextResponse.json({
            message:'标签添加失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
}

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
