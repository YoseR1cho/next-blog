import {topics,articleTopicAssociations} from "@/models/topics";
import {NextResponse} from "next/server";
import {apiHandler} from "@/utils/helpers/api/api-handler";
import connectToDatabase from "@/utils/mongodb";
connectToDatabase()

const getTopics = async(req)=>{
    try{
        const topicList = await topics.find()

        return NextResponse.json({
            message:'获取专题列表成功!',
            data:topicList,
            success:true
        },{status:200})
    }catch (error){
        console.log(error)
        return NextResponse.json({
            message:'获取专题列表失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
}

const addTopic = apiHandler(async(req)=>{
    try{
        const body = await req.json()
        const data = await topics.create({
            ...body,
        });

        return NextResponse.json(
            {
                message: "增加专题成功！",
                data: data,
                success: true,
            },
            { status: 200 }
        );
    }catch (error){
        return NextResponse.json({
            message:'增加专题列表失败！',
            success:false,
            errorMsg:error
        }, {status: 500})
    }
},{
    isJwt:true,
    identity: "manager",
})


export const GET = getTopics
export const POST = addTopic
