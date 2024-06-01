import {NextResponse} from "next/server";
import connectToDatabase from "@/utils/mongodb";
import articles from "@/models/articles";

connectToDatabase()

export async function GET(req){
    const _page = req.nextUrl.searchParams.get('page')
    const _pageSize = req.nextUrl.searchParams.get('pageSize')
    const tag = req.nextUrl.searchParams.get('key[tag]')
    try {
        const page = parseInt(_page) || 1;
        const pageSize = parseInt(_pageSize) || 10
        const skip = (page - 1) * pageSize;
        const tagMatch = tag?{"tags.name":tag}:{}
        const data = await articles.aggregate([
            {$lookup:{
                    from:'tags',
                    localField:'tags',
                    foreignField:'_id',
                    as:'tags'
                }},
            {
                $match:tagMatch
            },
            {
                $facet:{
                    articleData:[
                        {$sort: {createAt: -1}},
                        {$skip:skip},
                        {$limit:pageSize},
                    ],
                    totalCount:[
                        {$count:'totalCount'}
                    ]
                }
            }])
        return NextResponse.json({
            message:'文章列表获取成功!',
            data:data,
            success:true
        },{status:200})
    }catch (error){
        console.log(error)
        return NextResponse.json({
            message:'获取文章失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
}

export async function POST(req){
    try {
        const body = await req.json()
        const data = await articles.create({
            ...body,
        })

        return NextResponse.json({
                message:'发布文章成功！',
                data:data,
                success:true
            }, {status:200})
    }catch (error){
        return NextResponse.json({
            message:'发布文章失败！',
            success:false,
            errorMsg:error
        },{status:500})
    }
}

