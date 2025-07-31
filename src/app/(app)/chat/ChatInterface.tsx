'use client';

import {useState, useRef, useEffect, useTransition} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Send, User, Bot, Loader2} from 'lucide-react';
import {cn} from '@/lib/utils';

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

    const userMessage: Message = {role: 'user', content: input};
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    startTransition(async () => {
      try {
        const historyForApi = messages.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          content: msg.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: currentInput, context: historyForApi }),
        });
        
        if (!res.ok) {
           throw new Error(`API error: ${res.statusText}`);
        }

        const { reply } = await res.json();
        
        setMessages(prev => [
          ...prev,
          {role: 'assistant', content: reply},
        ]);

      } catch (error) {
        console.error(error);
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
          },
        ]);
      }
    });
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="border-b bg-card p-4">
        <h1 className="font-headline text-2xl font-bold tracking-tight">
          AI Chat Assistant
        </h1>
        <p className="text-muted-foreground">Your intelligent visa expert.</p>
      </header>
      <main className="flex-1 overflow-hidden p-4">
        <div className="flex flex-col h-full bg-card rounded-lg border">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground p-8">
                  <Bot className="mx-auto h-12 w-12 mb-4" />
                  <p>Start a conversation with Japa Genie.</p>
                  <p className="text-sm mt-2">
                    Ask about visas, and I'll help you figure out the
                    requirements.
                  </p>
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
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
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
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
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
                onChange={e => setInput(e.target.value)}
                placeholder="Citizenship, destination, budget, purpose, history, job?"
                disabled={isPending}
              />
              <Button type="submit" disabled={!input.trim() || isPending}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}