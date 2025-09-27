
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// This type needs to be defined, assuming it's a string for now.
// You might need to adjust it based on what `generateWebsiteContent` expects.
interface GenerateWebsiteContentInput {
  prompt: string;
}

// Assuming this function exists elsewhere, as it's used in `handleGenerateContent`
// If not, you'll need to implement it.
declare function generateWebsiteContent(input: GenerateWebsiteContentInput): Promise<any>;


export async function handleGenerateContent(input: GenerateWebsiteContentInput) {
  try {
    const result = await generateWebsiteContent(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to generate content: ${errorMessage}` };
  }
}

const partnerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  businessName: z.string().min(2, "Business name is required."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .optional(),
});

export async function submitPartnerForm(data: unknown) {
  const result = partnerSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Invalid form data." };
  }

  try {
    await addDoc(collection(db, "partners"), {
      ...result.data,
      submittedAt: serverTimestamp(),
    });
    return {
      success: true,
      message: "Thank you for your interest! We will be in touch shortly.",
    };
  } catch (error) {
    console.error("Error writing to Firestore: ", error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}

const investorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("Invalid email address."),
});

export async function submitInvestorForm(data: unknown) {
  const result = investorSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Invalid form data." };
  }

  try {
    await addDoc(collection(db, "investors"), {
      ...result.data,
      submittedAt: serverTimestamp(),
    });
    return {
      success: true,
      message: "Thank you! You will receive the investor deck shortly.",
    };
  } catch (error) {
    console.error("Error writing to Firestore: ", error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(data: unknown) {
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Invalid form data." };
  }

  try {
    await addDoc(collection(db, "contactSubmissions"), {
      ...result.data,
      submittedAt: serverTimestamp(),
    });
    return {
      success: true,
      message: "Your message has been sent! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error writing to Firestore: ", error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}
