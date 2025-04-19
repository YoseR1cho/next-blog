import connectToDatabase from "@/utils/mongodb";
import {apiHandler} from "@/utils/helpers/api/api-handler";
import {NextResponse} from "next/server";
import {topics} from "@/models/topics";

connectToDatabase();
const deleteTopic = apiHandler(async (req, { params }) => {
    try {
        let id = params.id;
        const data = await topics.deleteOne({ _id: id });

        return NextResponse.json(
            {
                message: "删除专题成功！",
                success: true,
                data: data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {
                message: "删除专题失败！",
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

export const DELETE = deleteTopic;
