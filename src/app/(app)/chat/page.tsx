import { ChatInterface } from './ChatInterface';

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="border-b bg-card p-4">
        <h1 className="font-headline text-2xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-muted-foreground">
          Ask our AI assistant anything about the visa application process.
        </p>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
