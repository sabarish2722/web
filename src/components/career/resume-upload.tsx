
"use client";

import { useState } from 'react';
import { uploadResume } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const ResumeUploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await uploadResume(formData);
      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });
        event.currentTarget.reset();
      } else {
        toast({
          title: "Error",
          description: response.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
        <Input type="text" id="name" name="name" required className="mt-1 block w-full" />
      </div>
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">Mobile Number (Optional)</label>
        <Input type="tel" id="mobile" name="mobile" className="mt-1 block w-full" />
      </div>
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-300">Upload Resume</label>
        <Input type="file" id="resume" name="resume" required accept=".pdf,.doc,.docx" className="mt-1 block w-full" />
        <p className="mt-1 text-sm text-gray-500">PDF or Word document, up to 5MB.</p>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default ResumeUploadForm;
