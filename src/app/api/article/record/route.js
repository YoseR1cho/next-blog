import { apiHandler } from "@/utils/helpers/api/api-handler";
import { NextResponse } from "next/server";
import articles from "@/models/articles";

const recordArticle = apiHandler(
    async req => {
        try {
            const { articleId, topicId } = await req.json();
            console.log({ articleId, topicId })

            await articles.updateOne({_id:articleId},{$push:{"topic":topicId}})

            return NextResponse.json(
                {
                    message: "收录文章成功！",
                    success: true,
                    data:null
                },
                { status: 200 }
            );
        } catch (error) {
            console.log(error);
            return NextResponse.json(
                {
                    message: "收录文章失败！",
                    success: false,
                    errorMsg: error.message,
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

export const POST = recordArticle;
