'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { getAiChatResponse } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, Loader2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const response = await getAiChatResponse(userMessage.content);
      if (response.success && response.data) {
        setMessages((prev) => [...prev, { role: 'assistant', content: response.data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    });
  };

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <div className="lg:col-span-2 flex flex-col h-[calc(100vh-10rem)] bg-card rounded-lg border">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
                <div className="text-center text-muted-foreground p-8">
                    <Bot className="mx-auto h-12 w-12 mb-4" />
                    <p>Start a conversation with the AI Assistant.</p>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : ''
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-lg p-3 text-sm bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about visa requirements, processing times, etc."
              disabled={isPending}
            />
            <Button type="submit" disabled={!input.trim() || isPending}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Info className="h-5 w-5 text-accent" />
              Chat Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                As you chat with the AI, relevant information and insights will be displayed here.
              </p>
              <p>For example, you can ask:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>"What are the main requirements for a UK Skilled Worker visa?"</li>
                <li>"Compare the H-1B and the Canadian Express Entry."</li>
                <li>"How long does it take to get a student visa for Australia?"</li>
              </ul>
              <p>
                Our AI is trained to provide accurate and up-to-date information to help you with your visa journey.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
