'use server';

/**
 * @fileOverview Generates headlines and body text variations for website sections.
 *
 * - generateWebsiteContent - A function that generates website content based on the provided prompt.
 * - GenerateWebsiteContentInput - The input type for the generateWebsiteContent function.
 * - GenerateWebsiteContentOutput - The return type for the generateWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteContentInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The industry of the company.'),
  targetAudience: z.string().describe('The target audience of the company.'),
  coreValueProposition: z.string().describe('The core value proposition of the company.'),
  missionStatement: z.string().describe('The mission statement of the company.'),
  sectionDescription: z.string().describe('A description of the website section to generate content for.'),
  tone: z.string().describe('The desired tone of the generated content.'),
});
export type GenerateWebsiteContentInput = z.infer<typeof GenerateWebsiteContentInputSchema>;

const GenerateWebsiteContentOutputSchema = z.object({
  headline: z.string().describe('A suggested headline for the website section.'),
  bodyText: z.string().describe('Suggested body text for the website section.'),
});
export type GenerateWebsiteContentOutput = z.infer<typeof GenerateWebsiteContentOutputSchema>;

export async function generateWebsiteContent(input: GenerateWebsiteContentInput): Promise<GenerateWebsiteContentOutput> {
  return generateWebsiteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteContentPrompt',
  input: {schema: GenerateWebsiteContentInputSchema},
  output: {schema: GenerateWebsiteContentOutputSchema},
  prompt: `You are a marketing expert skilled at crafting compelling website content.

  Based on the following information about the company, generate a headline and body text for the specified website section.

  Company Name: {{{companyName}}}
  Industry: {{{industry}}}
  Target Audience: {{{targetAudience}}}
  Core Value Proposition: {{{coreValueProposition}}}
  Mission Statement: {{{missionStatement}}}

  Section Description: {{{sectionDescription}}}

  Tone: {{{tone}}}

  Headline:
  Body Text:
  `,
});

const generateWebsiteContentFlow = ai.defineFlow(
  {
    name: 'generateWebsiteContentFlow',
    inputSchema: GenerateWebsiteContentInputSchema,
    outputSchema: GenerateWebsiteContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
