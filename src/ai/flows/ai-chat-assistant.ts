// A chat assistant to answer user queries and provide real-time support.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
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

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a helpful AI assistant specialized in providing information and support for visa application processes. Respond to the user query with accurate and helpful information.\n\nUser Query: {{{query}}}`,
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
