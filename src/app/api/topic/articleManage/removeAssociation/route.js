const removeArticleFromTopic = apiHandler(async (req) => {
    try {
        const body = await req.json();
        const { articleId, topicId } = body;
        
        await articleTopicAssociations.deleteOne({ articleId, topicId });

        return NextResponse.json(
            {
                message: "删除文章专题关联成功！",
                data:null,
                success: true,
            },
            { status: 200 }
        );
    }catch (error) {
        return NextResponse.json(
            {
                message: "删除文章从专题出现错误！",
                success: false,
                errorMsg: error,
            },
            { status: 500 }
        );
    }

},{
    isJwt:true,
    identity:'manager'
})

