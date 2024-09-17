import connectToDatabase from "@/utils/mongodb";
import { apiHandler } from "@/utils/helpers/api/api-handler";
import {NextResponse} from "next/server";

connectToDatabase();

const verifyAdmin = apiHandler(async req => {
    return NextResponse.json({
        success:true
    },{status:200})
}, {
    isJwt: true,
    identity: "manager",
});

export const POST = verifyAdmin;
