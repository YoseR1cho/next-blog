import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import {apiHandler} from "@/utils/helpers/api/api-handler";

const updateImage = apiHandler(async req => {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json(
            {
                errorMsg: "No files received.",
            },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        );
        return NextResponse.json(
            {
                msg: "图片上传成功！",
                data: {
                    url: `${process.env.DOMAIN_URL}/uploads/${filename}`,
                    filename,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("GlobalError occured ", error);
        return NextResponse.json({ msg: "图片上传失败！" }, { status: 500 });
    }
},{
    isJwt:true,
    identity:'manager'
})

export const POST = updateImage
