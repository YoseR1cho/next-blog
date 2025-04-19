import { apiHandler } from "@/utils/helpers/api/api-handler";
import { NextResponse } from "next/server";
import { articleTopicAssociations } from "@/models/topics";


const addArticleToTopic = apiHandler(
    async req => {
        try {
            const body = await req.json();
            const { articleId, topicId } = body;

            // 批量创建关联
            const operations = topicId.map(topicId => ({
                insertOne: {
                    document: { articleId, topicId }
                }
            }));

            await articleTopicAssociations.bulkWrite(operations, {
                ordered: false // 忽略重复项错误
            });

            return NextResponse.json(
                {
                    message: "添加文章到专题成功！",
                    success: true,
                    data: null,
                },
                { status: 200 }
            );
        } catch (error) {
            console.log(error,'err1');

            return NextResponse.json(
                {
                    message: "添加文章到专题出现错误！",
                    success: false,
                    errorMsg: error,
                },
                { status: 500 }
            );
        }
    },
    {
        isJwt: true,
        identity: "manager",
    }
);

const deleteArticleToTopic = apiHandler(
    async req => {
        try {
            const body = await req.json();
            const { articleId, topicId } = body ; 
            await articleTopicAssociations.deleteOne({ articleId, topicId });
            return NextResponse.json(
                {
                    message: "删除文章与标题映射成功！",
                    success: true,
                    data: null,
                },
                { status: 200 }
            );
        }catch (error) {
            console.log(error,'err2');
            return NextResponse.json(
                {
                    message: "删除文章与标题映射失败！",
                    success: false,
                    errorMsg: error,
                },
                { status: 500 }
            );
        }
    } ,{
        isJwt: true,
        identity: "manager",
    }
)

const getArticlesByTopic = apiHandler(
    async req => {
        try {
            const { topicId } = req.query;
            const associations = await articleTopicAssociations
                .find({ topicId })
                .populate({
                    path: "articleId",
                    select: "id title",
                });
            const articles = associations.map(association => {
                const article = association.articleId;
                return {
                    id: article.id,
                    title: article.title,
                };
            });

            return NextResponse.json({
                message: "获取专题下文章成功！",
                data: articles,
                success: true,
            });
        } catch (e) {
            return NextResponse.json(
                {
                    message: "获取专题下文章出现错误！",
                    success: false,
                    errorMsg: error,
                },
                { status: 500 }
            );
        }
    },
    {
        isJwt: true,
        identity: "manager",
    }
);

export const GET = getArticlesByTopic;
export const POST = addArticleToTopic;
export const DELETE = deleteArticleToTopic;
