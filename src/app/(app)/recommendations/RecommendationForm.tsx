
'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getVisaRecommendation } from './actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, List, Loader2 } from 'lucide-react';
import type { VisaRecommendationOutput } from '@/ai/flows/visa-recommendation';

const formSchema = z.object({
  background: z.string().min(10, 'Please provide more details about your background.'),
  budget: z.coerce.number().min(0, 'Budget must be a positive number.'),
  preferences: z.string().min(5, 'Please tell us your preferences.'),
});

type FormData = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VisaRecommendationOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      background: '',
      budget: 5000,
      preferences: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await getVisaRecommendation(formData);
    
    if (response.success) {
      setResult(response.data!);
      form.reset();
    } else {
      // Handle server-side validation errors
      if (response.error) {
        Object.entries(response.error).forEach(([key, messages]) => {
          if (key in form.control.fields) {
            form.setError(key as keyof FormData, { message: messages?.[0] });
          }
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional & Educational Background</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Software Engineer with 5 years of experience, a Bachelor's degree in Computer Science..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Application Budget (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Looking for a long-term work visa in Europe, interested in tech hubs..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Get Recommendations'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-start justify-center">
          {loading && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground pt-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Analyzing your profile...</p>
            </div>
          )}
          {!loading && !result && (
            <div className="text-center text-muted-foreground pt-10">
              <p>Your recommended visa options will appear here.</p>
            </div>
          )}
          {result && (
            <div className="space-y-6 w-full">
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <List className="h-5 w-5 text-primary"/>
                  Recommended Visa Options
                </h3>
                <ul className="list-disc list-inside space-y-1 rounded-md bg-secondary p-4">
                  {result.visaOptions.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-accent"/>
                  Reasoning
                </h3>
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
