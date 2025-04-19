import { NextResponse } from "next/server";
import articles from "@/models/articles";
import { articleTopicAssociations, topics } from "@/models/topics";

const getTopicByArticle = async req => {
    try {
        const articleId = req.nextUrl.searchParams.get("articleId");

        if (!articleId) {
            return NextResponse.json(
                { errorMsg: "缺少文章ID参数", success: false },
                { status: 400 }
            );
        }

        // 1. 验证文章是否存在
        const article = await articles.findById(articleId);
        if (!article) {
            return NextResponse.json(
                { errorMsg: "文章不存在" },
                { status: 404 }
            );
        }

        // 2. 查询文章关联的专题ID列表
        const associations = await articleTopicAssociations.find({
            articleId: articleId,
        });

        // 3. 获取所有关联的专题信息
        const topicIds = associations.map(a => a.topicId);
        const topicList = await topics.find({
            _id: { $in: topicIds },
        });

        return NextResponse.json(
            {
                success: true,
                data: topicList,
                message: "拉取专题列表成功！",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "拉取专题列表！",
                success: false,
                errorMsg: error,
            },
            { status: 500 }
        );
    }
};


export const GET = getTopicByArticle;