
"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

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
    const { error } = await supabase.from("partners").insert([result.data]);

    if (error) {
      throw new Error(error.message);
    }
    
    return {
      success: true,
      message: "Thank you for your interest! We will be in touch shortly.",
    };
  } catch (error) {
    console.error("Error writing to Supabase: ", error);
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
    const { error } = await supabase.from("investors").insert([result.data]);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Thank you! You will receive the investor deck shortly.",
    };
  } catch (error) {
    console.error("Error writing to Supabase: ", error);
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
    const { error } = await supabase.from("contactSubmissions").insert([result.data]);

    if (error) {
      throw new Error(error.message);
    }
    
    return {
      success: true,
      message: "Your message has been sent! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error writing to Supabase: ", error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}


export async function getVisitorCount() {
  try {
    // There's a race condition here, but for a simple visitor counter, it's acceptable.
    // For a critical counter, a database transaction or a more robust RPC function would be better.

    // 1. Fetch the current count
    let { data: selectData, error: selectError } = await supabase
      .from('counters')
      .select('value')
      .eq('name', 'visitors')
      .single();

    if (selectError) {
      // If the row doesn't exist, create it.
      if (selectError.code === 'PGRST116') {
        const { data: insertData, error: insertError } = await supabase
          .from('counters')
          .insert({ name: 'visitors', value: 1 })
          .select('value')
          .single();

        if (insertError) {
          console.error("Error inserting initial visitor count:", insertError.message);
          return null;
        }
        return insertData?.value ?? 1;
      }
      console.error("Error fetching visitor count:", selectError.message);
      return null;
    }

    const currentCount = selectData?.value ?? 0;
    const newCount = currentCount + 1;

    // 2. Update the count
    const { error: updateError } = await supabase
      .from('counters')
      .update({ value: newCount })
      .eq('name', 'visitors');

    if (updateError) {
      console.error("Error updating visitor count:", updateError.message);
      // Even if update fails, we can still return the fetched count + 1
      return newCount;
    }

    return newCount;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return null;
  }
}

export async function uploadResume(formData: FormData) {
    const file = formData.get("resume") as File | null;
  
    if (!file) {
      return { success: false, error: "No resume file provided." };
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return { success: false, error: "File is too large. Maximum size is 5MB." };
    }
  
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Please upload a PDF or Word document." };
    }
    
    const filePath = `public/${Date.now()}-${file.name}`;
  
    try {
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);
  
      if (uploadError) {
        throw uploadError;
      }
  
      const { error: dbError } = await supabase.from("resumes").insert({
        file_path: filePath,
        original_filename: file.name,
        file_size: file.size,
      });
  
      if (dbError) {
        throw dbError;
      }
  
      return { success: true, message: "Resume uploaded successfully!" };
    } catch (error) {
      console.error("Error uploading resume:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      return { success: false, error: `Upload failed: ${errorMessage}` };
    }
  }
