
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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitSuggestionForm } from "@/app/actions";
import { useTransition } from "react";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  suggestion: z.string().min(10, "Suggestion must be at least 10 characters."),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export default function SuggestionForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suggestion: "",
    },
  });

  const onSubmit = (values: SuggestionFormValues) => {
    startTransition(async () => {
      const result = await submitSuggestionForm(values);

      if (result.success) {
        toast({
          title: "Suggestion Sent!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Submission Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="suggestion"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Tell us what you think..." {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Send Suggestion
        </Button>
      </form>
    </Form>
  );
}
