"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateContent } from "@/app/actions";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import type { GenerateWebsiteContentOutput } from "@/ai/flows/ai-headline-generation";

const formSchema = z.object({
  companyName: z.string().default("macs11"),
  industry: z.string().default("Hyperlocal Services"),
  targetAudience: z.string().default("Urban and semi-urban residents in India"),
  coreValueProposition: z
    .string()
    .default("Speed, Convenience, Trust"),
  missionStatement: z
    .string()
    .default(
      "To simplify lives and empower communities across India through technology-driven solutions."
    ),
  sectionDescription: z
    .string()
    .min(10, "Please describe the section's purpose."),
  tone: z.string().default("Professional, Dynamic, and Trustworthy"),
});

export default function AiContentGenerator() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GenerateWebsiteContentOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "macs11",
      industry: "Hyperlocal Services",
      targetAudience: "Urban and semi-urban residents in India",
      coreValueProposition: "Speed, Convenience, Trust",
      missionStatement:
        "To simplify lives and empower communities across India through technology-driven solutions.",
      sectionDescription: "",
      tone: "Professional, Dynamic, and Trustworthy",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setGeneratedContent(null);
    const result = await handleGenerateContent(values);
    setIsSubmitting(false);

    if (result.success && result.data) {
      toast({
        title: "Content Generated!",
        description: "AI has crafted new content for you.",
      });
      setGeneratedContent(result.data);
    } else {
      toast({
        title: "Generation Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  }

  return (
    <section id="ai-tool" className="py-20 md:py-32">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            AI-Powered Content Tool
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our GenAI tool to compose engaging headlines and body text,
            maintaining a consistent voice across your marketing.
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Generate Website Content
            </CardTitle>
            <CardDescription>
              Describe the section you want content for, and let our AI do the
              rest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="sectionDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'A section to welcome new users and explain the core benefits of our app.'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Tone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Friendly and energetic'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Content
                </Button>
              </form>
            </Form>

            {isSubmitting && (
                <div className="mt-8 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
                    <p className="mt-2 text-muted-foreground">Generating content...</p>
                </div>
            )}

            {generatedContent && (
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-headline font-semibold">Generated Content:</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Headline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{generatedContent.headline}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Body Text</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{generatedContent.bodyText}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
