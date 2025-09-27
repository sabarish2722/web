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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("Invalid email address."),
});

export default function InvestorForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      // const result = await submitInvestorForm(values);
      console.log("Investor form submission is disabled.");
      const result = { success: false, error: "This form is not active." };

      if (result.success) {
        toast({
          title: "Request Sent!",
          description: "Thank you for your interest!",
        });
        form.reset();
      } else {
        toast({
          title: "Request Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">
          Request Investor Deck
        </CardTitle>
        <CardDescription>
          Provide your details to receive our comprehensive investor deck.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company / Fund</FormLabel>
                  <FormControl>
                    <Input placeholder="Venture Capital Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jane.s@vci.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Request Deck
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
