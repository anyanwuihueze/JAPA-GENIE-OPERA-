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

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  system: `You are Japa Genie, an AI visa expert for Africans. Always ask for 1) citizenship, 2) destination, 3) budget, 4) purpose, 5) travel history, 6) education & job. If any are missing, ask once; if all are present, give a concise visa recommendation.`,
  prompt: `{{#each history}}
{{#if (eq role 'user')}}
User: {{{content}}}
{{else}}
Assistant: {{{content}}}
{{/if}}
{{/each}}

User: {{{query}}}
Assistant:`,
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
