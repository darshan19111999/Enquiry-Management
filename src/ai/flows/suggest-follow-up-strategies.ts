'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal follow-up times and communication strategies for customer enquiries.
 *
 * - suggestFollowUpStrategies - An async function that takes an enquiry and returns follow-up suggestions.
 * - SuggestFollowUpStrategiesInput - The input type for the suggestFollowUpStrategies function.
 * - SuggestFollowUpStrategiesOutput - The return type for the suggestFollowUpStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFollowUpStrategiesInputSchema = z.object({
  enquiryDetails: z
    .string()
    .describe('Detailed information about the customer enquiry.'),
  pastSuccessfulCases: z
    .string()
    .describe('Information about past successful enquiry cases.'),
});
export type SuggestFollowUpStrategiesInput = z.infer<
  typeof SuggestFollowUpStrategiesInputSchema
>;

const SuggestFollowUpStrategiesOutputSchema = z.object({
  suggestedFollowUpTimes: z
    .string()
    .describe('Suggested times for following up with the customer.'),
  suggestedCommunicationStrategies: z
    .string()
    .describe(
      'Suggested communication strategies for engaging the customer (e.g., email templates, phone call scripts).'      
    ),
});
export type SuggestFollowUpStrategiesOutput = z.infer<
  typeof SuggestFollowUpStrategiesOutputSchema
>;

export async function suggestFollowUpStrategies(
  input: SuggestFollowUpStrategiesInput
): Promise<SuggestFollowUpStrategiesOutput> {
  return suggestFollowUpStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFollowUpStrategiesPrompt',
  input: {schema: SuggestFollowUpStrategiesInputSchema},
  output: {schema: SuggestFollowUpStrategiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest optimal follow-up times and communication strategies for customer enquiries, leveraging insights from past successful cases to improve engagement.\n\nBased on the following enquiry details:\n{{{enquiryDetails}}}\n\nAnd insights from these past successful cases:\n{{{pastSuccessfulCases}}}\n\nPlease provide:
- Suggested follow-up times: When should the next follow-up be scheduled?
- Suggested communication strategies: How should the follow-up be conducted (e.g., email, phone call), and what should be communicated?\n\nEnsure the suggested strategies are personalized and relevant to the specific enquiry details and past successful cases.\n`,
});

const suggestFollowUpStrategiesFlow = ai.defineFlow(
  {
    name: 'suggestFollowUpStrategiesFlow',
    inputSchema: SuggestFollowUpStrategiesInputSchema,
    outputSchema: SuggestFollowUpStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
