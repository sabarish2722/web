
"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { WhatsAppIcon } from "./WhatsAppButton";
import { Loader2, Mail, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadResume } from "@/app/actions";

export default function Careers() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) {
            toast({
                title: "No File Selected",
                description: "Please choose a resume file to upload.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("resume", selectedFile);

        const result = await uploadResume(formData);
        setIsSubmitting(false);

        if (result.success) {
            toast({
                title: "Upload Successful!",
                description: result.message,
            });
            setSelectedFile(null);
            if(fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } else {
            toast({
                title: "Upload Failed",
                description: result.error,
                variant: "destructive",
            });
        }
    };

    return (
        <section id="careers" className="py-20 md:py-32">
            <div className="container max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                    Join Our Team
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Are you passionate about simplifying lives and empowering communities through technology? We are looking for talented individuals to join our mission.
                </p>

                <Card className="mt-12 text-left w-full max-w-lg mx-auto shadow-lg">
                    <CardHeader>
                        <CardTitle>Submit Your Application</CardTitle>
                        <CardDescription>Upload your resume below or apply via WhatsApp/Email.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="resume">Resume (PDF, DOC, DOCX - Max 5MB)</Label>
                                <div className="flex items-center gap-2 mt-2">
                                <Input 
                                    id="resume" 
                                    type="file" 
                                    ref={fileInputRef}
                                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={handleFileChange}
                                    className="flex-grow"
                                />
                                </div>
                                {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile.name}</p>}
                            </div>
                             <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <Upload />}
                                {isSubmitting ? "Uploading..." : "Upload Resume"}
                            </Button>
                        </form>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                             <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white flex-1" asChild>
                                <Link href="https://chat.whatsapp.com/JNkLslXetON3A3p6RXPPNQ?mode=ems_share_t" target="_blank">
                                    <WhatsAppIcon />
                                    Apply Via WhatsApp
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1" asChild>
                                <Link href="mailto:ceo@macs11.com?subject=Job Application for macs11">
                                    <Mail />
                                    Apply Via Email
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </section>
    );
}
