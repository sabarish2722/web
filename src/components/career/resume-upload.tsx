
"use client";

import { useState, useRef } from 'react';
import { uploadResume } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Label } from '../ui/label';

const ResumeUploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

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
        formRef.current?.reset();
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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</Label>
        <Input type="text" id="name" name="name" required className="mt-1 block w-full" />
      </div>
      <div>
        <Label htmlFor="mobile" className="block text-sm font-medium text-gray-300">Mobile Number (Optional)</Label>
        <Input type="tel" id="mobile" name="mobile" className="mt-1 block w-full" />
      </div>
      <div>
        <Label htmlFor="resume" className="block text-sm font-medium text-gray-300">Upload Resume</Label>
        <Input type="file" id="resume" name="resume" required accept=".pdf,.doc,.docx" className="mt-1 block w-full" />
        <p className="mt-1 text-sm text-gray-500">PDF or Word document, up to 5MB.</p>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
};

export default ResumeUploadForm;
