'use server';

import { aiChatAssistant, type ChatInput } from '@/ai/flows/ai-chat-assistant';
import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const chatSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty.'),
  history: z.array(MessageSchema),
});

export async function getAiChatResponse(query: string, history: z.infer<typeof MessageSchema>[]) {
  const parsed = chatSchema.safeParse({ query, history });

  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid input.',
    };
  }
  
  // Convert 'assistant' role to 'model' for the AI flow
  const flowHistory = history.map(message => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    content: message.content,
  })) as ChatInput['history'];

  try {
    const result = await aiChatAssistant({ query: parsed.data.query, history: flowHistory });
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
