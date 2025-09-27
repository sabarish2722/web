
"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

const partnerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  businessName: z.string().min(2, "Business name is required."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .optional()
    .or(z.literal('')),
});

export async function submitPartnerForm(data: unknown) {
  try {
    const result = partnerSchema.safeParse(data);
    if (!result.success) {
      console.error("Partner form validation error:", result.error.flatten());
      return { success: false, error: "Invalid form data. Please check your entries." };
    }

    if (!supabaseAdmin) {
      return { success: false, error: "Backend not configured correctly. Please contact support." };
    }

    const { error } = await supabaseAdmin.from("partners").insert([result.data]);

    if (error) {
      console.error("Error writing to Supabase (partners): ", error);
      return { success: false, error: `Failed to submit form: ${error.message}` };
    }
    
    return {
      success: true,
      message: "Thank you for your interest! We will be in touch shortly.",
    };
  } catch (e: any) {
    console.error("Unexpected error in submitPartnerForm:", e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

const investorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("Invalid email address."),
});

export async function submitInvestorForm(data: unknown) {
  try {
    const result = investorSchema.safeParse(data);
    if (!result.success) {
      console.error("Investor form validation error:", result.error.flatten());
      return { success: false, error: "Invalid form data. Please check your entries." };
    }
    
    if (!supabaseAdmin) {
      return { success: false, error: "Backend not configured correctly. Please contact support." };
    }

    const { error } = await supabaseAdmin.from("investors").insert([result.data]);

    if (error) {
      console.error("Error writing to Supabase (investors): ", error);
      return { success: false, error: `Failed to submit form: ${error.message}` };
    }

    return {
      success: true,
      message: "Thank you! You will receive the investor deck shortly.",
    };
  } catch (e: any) {
    console.error("Unexpected error in submitInvestorForm:", e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
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

  if (!supabaseAdmin) {
    return { success: false, error: "Backend not configured correctly. Please contact support." };
  }

  try {
    const { error } = await supabaseAdmin.from("contactSubmissions").insert([result.data]);

    if (error) {
      throw new Error(error.message);
    }
    
    return {
      success: true,
      message: "Your message has been sent! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error writing to Supabase: ", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to submit form: ${errorMessage}` };
  }
}

const suggestionSchema = z.object({
  suggestion: z.string().min(10, "Suggestion must be at least 10 characters."),
});

export async function submitSuggestionForm(data: unknown) {
  try {
    const result = suggestionSchema.safeParse(data);
    if (!result.success) {
      console.error("Suggestion form validation error:", result.error.flatten());
      return { success: false, error: "Invalid form data. Please check your entries." };
    }

    if (!supabaseAdmin) {
      return { success: false, error: "Backend not configured correctly. Please contact support." };
    }
    
    const { error } = await supabaseAdmin.from("suggestions").insert([result.data]);

    if (error) {
        console.error("Error writing to Supabase (suggestions): ", error);
        return { success: false, error: `Failed to submit form: ${error.message}` };
    }
    
    return {
      success: true,
      message: "Your suggestion has been sent! Thank you for your feedback.",
    };
  } catch (e: any) {
    console.error("Unexpected error in submitSuggestionForm:", e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}

export async function uploadResume(formData: FormData) {
  try {
    if (!supabaseAdmin) {
        return { success: false, error: "Supabase admin client is not initialized. Check server environment variables." };
    }
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

    const { error: uploadError } = await supabaseAdmin.storage
      .from("resumes")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading resume to storage:", uploadError);
      return { success: false, error: `Upload failed: ${uploadError.message}` };
    }

    const { error: dbError } = await supabaseAdmin.from("resumes").insert({
      file_path: filePath,
      original_filename: file.name,
      file_size: file.size,
    });

    if (dbError) {
      // If the database insert fails, we should try to delete the uploaded file.
      await supabaseAdmin.storage.from("resumes").remove([filePath]);
      console.error("Error inserting resume metadata into db:", dbError);
      return { success: false, error: `Upload failed: ${dbError.message}` };
    }

    return { success: true, message: "Resume uploaded successfully!" };
  } catch(e: any) {
    console.error("Unexpected error in uploadResume:", e);
    return { success: false, error: `An unexpected error occurred: ${e.message}` };
  }
}
