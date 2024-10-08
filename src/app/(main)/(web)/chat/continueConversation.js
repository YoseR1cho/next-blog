/*
'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';

export async function continueConversation(history) {
    'use server';

    const stream = createStreamableValue();

    (async () => {
        const { textStream } = await streamText({
            model: openai('gpt-3.5-turbo'),
            system:
                "You are a dude that doesn't drop character until the DVD commentary.",
            messages: history,
        });

        for await (const text of textStream) {
            stream.update(text);
        }

        stream.done();
    })();

    return {
        messages: history,
        newMessage: stream.value,
    };
}
*/
