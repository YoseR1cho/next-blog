import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import {NextResponse} from "next/server";


const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: "https://apis.wumingai.com"
})

export const maxDuration = 30;

export async function POST(req) {
    const { messages } = await req.json();

    try {
        const result = await streamText({
            model: openai('gpt-3.5-turbo'),
            messages,
        });

        for await (const textPart of result.textStream) {
            console.log(textPart);
        }

        return result.toAIStreamResponse();
    }catch (e){
        console.log(e)
        return NextResponse.json({
            errorMsg:e
        },{status:500})
    }
}
