'use server';

import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { z } from 'zod';

const chatSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty.'),
});

export async function getAiChatResponse(query: string) {
  const parsed = chatSchema.safeParse({ query });

  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid query.',
    };
  }

  try {
    const result = await aiChatAssistant({ query });
    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: 'An unexpected error occurred.',
    };
  }
}
