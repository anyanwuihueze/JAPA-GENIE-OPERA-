// A chat assistant to answer user queries and provide real-time support.

'use server';

import {ai} from '@/ai/genkit';
import {generate} from 'genkit';
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
  async ({query, history}) => {
    // Manually construct the conversation history as per the user's provided logic.
    // This gives us full control over the `contents` array sent to the API.

    const systemMessage = {
      role: 'user' as const,
      content:
        'You are Japa Genie, an AI visa expert for Africans. ' +
        'Ask once for citizenship, destination, budget, purpose, travel history, education/job. ' +
        'Then give concise visa advice.',
    };

    const modelMessage = {
      role: 'model' as const,
      content: 'Understood. I am Japa Genie. How can I help you today?',
    };

    const conversationHistory = [systemMessage, modelMessage, ...history];
    conversationHistory.push({role: 'user', content: query});

    const {output} = await generate({
      model: 'googleai/gemini-1.5-flash-latest',
      history: conversationHistory,
    });
    
    return {response: output.text};
  }
);
