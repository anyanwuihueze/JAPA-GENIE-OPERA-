
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { ProgressMap } from '@/components/ProgressMap';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Columns,
  FileText,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

const featureCards = [
  {
    title: 'Visa Recommendations',
    description: 'Get personalized visa suggestions from our AI.',
    href: '/recommendations',
    icon: FileText,
    cta: 'Find a Visa',
  },
  {
    title: 'Compare Visas',
    description: 'Analyze different visa options side-by-side.',
    href: '/compare',
    icon: Columns,
    cta: 'Compare Now',
  },
  {
    title: 'AI Assistant',
    description: 'Ask questions and get instant support.',
    href: '/chat',
    icon: MessageSquare,
    cta: 'Start Chatting',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome to VisaFlow
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered guide to global visa opportunities.
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-8">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <ProgressMap />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col justify-between shadow-md transition-all hover:shadow-lg"
            >
              <div>
                <CardHeader className="flex-row items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </div>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={feature.href}>
                    {feature.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
