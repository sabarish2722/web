
import React from 'react';
import ResumeUploadForm from '@/components/career/resume-upload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CareersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Join Our Team</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          We are always looking for passionate and talented individuals to help us build the future.
        </p>
      </header>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Submit Your Application</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-6">
              Interested in a role at macs11? Fill out the form below and upload your resume. We will get in touch if your profile matches our requirements.
            </p>
            <ResumeUploadForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareersPage;
