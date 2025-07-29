'use server';

import { visaRecommendation } from '@/ai/flows/visa-recommendation';
import { z } from 'zod';

const recommendationSchema = z.object({
  background: z.string().min(10, 'Please provide more details about your background.'),
  budget: z.coerce.number().min(0, 'Budget must be a positive number.'),
  preferences: z.string().min(5, 'Please tell us your preferences.'),
});

export async function getVisaRecommendation(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = recommendationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await visaRecommendation(parsed.data);
    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: { _form: ['An unexpected error occurred. Please try again.'] },
    };
  }
}
