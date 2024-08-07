import tags from "@/models/articles";
import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/mongodb";
import { apiHandler } from "@/utils/helpers/api/api-handler";

connectToDatabase();
const deleteTag = apiHandler(async (req, { params }) => {
    try {
        let id = params.id;
        const data = await tags.deleteOne({ _id: id });

        return NextResponse.json(
            {
                message: "删除标签成功！",
                success: true,
                data: data,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "删除标签失败！",
                success: false,
                errorMsg: error,
            },
            { status: 500 }
        );
    }
}, {
    isJwt:true,
    identity:'manager'
});

export const DELETE = deleteTag;
