'use server';

import {
  suggestFollowUpStrategies,
  type SuggestFollowUpStrategiesInput,
  type SuggestFollowUpStrategiesOutput,
} from '@/ai/flows/suggest-follow-up-strategies';

export async function getAiFollowUpSuggestions(
  input: SuggestFollowUpStrategiesInput
): Promise<SuggestFollowUpStrategiesOutput> {
  try {
    const result = await suggestFollowUpStrategies(input);
    return result;
  } catch (error) {
    console.error('Error in Genkit flow:', error);
    throw new Error('Failed to get suggestions from AI.');
  }
}
