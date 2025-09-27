
"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

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
  const result = partnerSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Invalid form data." };
  }

  if (!supabaseAdmin) {
    return { success: false, error: "Backend not configured correctly. Please contact support." };
  }

  const { error } = await supabaseAdmin.from("partners").insert([result.data]);

  if (error) {
    console.error("Error writing to Supabase (partners): ", error);
    // Return the actual error message from Supabase
    return { success: false, error: `Failed to submit form: ${error.message}` };
  }
  
  return {
    success: true,
    message: "Thank you for your interest! We will be in touch shortly.",
  };
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
  
  const { error } = await supabaseAdmin.from("contactSubmissions").insert([result.data]);

  if (error) {
      console.error("Error writing to Supabase (contact): ", error);
      // Return the actual error message from Supabase
      return { success: false, error: `Failed to submit form: ${error.message}` };
  }
  
  return {
    success: true,
    message: "Your message has been sent! We will get back to you soon.",
  };
}


export async function getVisitorCount() {
  if (!supabaseAdmin) {
    console.error("Supabase admin client not initialized. Cannot fetch visitor count.");
    return 0;
  }
  try {
    const { data, error } = await supabaseAdmin.rpc('increment_visitor_count');

    if (error) {
      console.error("Error calling RPC to increment visitor count:", error.message);
      return 0;
    }

    return data ?? 0;

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      console.error("Network error: Failed to connect to Supabase to get visitor count. Please check server connectivity.", error);
    } else {
      console.error("An unexpected error occurred in getVisitorCount:", error);
    }
    return 0;
  }
}

export async function uploadResume(formData: FormData) {
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
  
    try {
      const { error: uploadError } = await supabaseAdmin.storage
        .from("resumes")
        .upload(filePath, file);
  
      if (uploadError) {
        throw uploadError;
      }
  
      const { error: dbError } = await supabaseAdmin.from("resumes").insert({
        file_path: filePath,
        original_filename: file.name,
        file_size: file.size,
      });
  
      if (dbError) {
        // If the database insert fails, we should try to delete the uploaded file.
        await supabaseAdmin.storage.from("resumes").remove([filePath]);
        throw dbError;
      }
  
      return { success: true, message: "Resume uploaded successfully!" };
    } catch (error) {
      const supabaseError = error as any;
      console.error("Error uploading resume:", supabaseError);
      return { success: false, error: `Upload failed: ${supabaseError.message}` };
    }
  }
