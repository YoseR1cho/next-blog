import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    baseURL: "https://api.deepseek.com",
});

export const maxDuration = 30;

export async function POST(req) {
    const { messages } = await req.json();

    try {
        const result = await streamText({
            model: openai("deepseek-chat"),
            messages: [
                {
                    role: "system",
                    content:
                        "You're an AI chatbot housed in the personal blog of a front-end engineer called YoseR1cho.",
                },
                ...messages,
            ],
            stream: true,
        });

        return result.toDataStreamResponse();
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {
                errorMsg: e,
            },
            {
                status: 500,
            }
        );
    }
}
