import articles from "@/models/articles";
import {NextResponse} from "next/server";
import connectToDatabase from "@/utils/mongodb";
import {apiHandler} from "@/utils/helpers/api/api-handler";

connectToDatabase()

//获取单篇文章
const getArticle = async (req,{params})=>{
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
const patchArticle = apiHandler(async(req,{params})=>{
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
},{
    isJwt:true,
    identity:'manager'
})

//删除单篇文章
const deleteArticle = apiHandler(async (req,{params})=>{
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
},{
    isJwt:true,
    identity:'manager'
})

export const GET = getArticle

export const PATCH = patchArticle

export const DELETE = deleteArticle
