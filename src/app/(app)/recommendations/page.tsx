import { RecommendationForm } from './RecommendationForm';

export default function RecommendationsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b bg-card p-4 md:p-6">
        <h1 className="font-headline text-2xl font-bold tracking-tight">
          Personalized Visa Recommendations
        </h1>
        <p className="text-muted-foreground">
          Let our AI find the best visa pathways for you based on your
          background, budget, and preferences.
        </p>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <RecommendationForm />
      </main>
    </div>
  );
}
