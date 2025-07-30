// A chat assistant to answer user queries and provide real-time support.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  query: z.string().describe('The user query.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The response to the user query.'),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function aiChatAssistant(input: ChatInput): Promise<ChatOutput> {
  return aiChatAssistantFlow(input);
}

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ query, history }) => {
    const systemPrompt = `You are Japa Genie, an AI visa expert for Africans. Always ask for 1) citizenship, 2) destination, 3) budget, 4) purpose, 5) travel history, 6) education & job. If any are missing, ask once; if all are present, give a concise visa recommendation.`;
    
    // The Gemini API requires the history to start with a 'user' role.
    // Prepend the system prompt to the first user query.
    const fullHistory = [...history];
    if (fullHistory.length === 0) {
        query = `${systemPrompt}\n\nUSER_QUERY: ${query}`;
    }

    const { output } = await ai.generate({
      history: fullHistory,
      prompt: query,
    });
    
    return { response: output.text };
  }
);
