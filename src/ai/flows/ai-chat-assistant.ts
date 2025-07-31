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
    // Define the persona and instructions for the AI model.
    const systemPrompt =
      'You are Japa Genie, an AI visa expert for Africans. ' +
      'Ask once for citizenship, destination, budget, purpose, travel history, education/job. ' +
      'Then give concise visa advice.';

    // Call the AI model with the system prompt, conversation history, and the new user query.
    const { output } = await ai.generate({
      system: systemPrompt,
      history: history,
      prompt: query,
    });
    
    return { response: output.text };
  }
);
