
"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { WhatsAppIcon } from "./WhatsAppButton";
import { Copy, Loader2, Mail, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useRef, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadResume } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function Careers() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const careerImage = PlaceHolderImages.find((img) => img.id === "careers-image");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("ceo@macs11.com");
    toast({
      title: "Copied to Clipboard",
      description: "The email address has been copied.",
    });
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

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await uploadResume(formData);

      if (result.success) {
        toast({
          title: "Upload Successful!",
          description: result.message,
        });
        setSelectedFile(null);
        formRef.current?.reset();
      } else {
        toast({
          title: "Upload Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="careers" className="py-20 md:py-32">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">
          Join Our Team
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Are you passionate about simplifying lives and empowering communities
          through technology? We are looking for talented individuals to join
          our mission.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {careerImage && (
            <div className="hidden lg:block rounded-lg overflow-hidden shadow-lg">
              <Image
                src={careerImage.imageUrl}
                alt={careerImage.description}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint={careerImage.imageHint}
              />
            </div>
          )}

          <Card className="text-left w-full shadow-lg">
            <CardHeader>
              <CardTitle>Submit Your Application</CardTitle>
              <CardDescription>
                Upload your resume below or apply via WhatsApp/Email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" required className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number (Optional)</Label>
                  <Input id="mobile" name="mobile" type="tel" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="resume">
                    Resume (PDF, DOC, DOCX - Max 5MB)
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="flex-grow"
                      required
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Upload />
                  )}
                  {isPending ? "Uploading..." : "Upload Resume"}
                </Button>
              </form>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white flex-1"
                  asChild
                >
                  <Link
                    href="https://chat.whatsapp.com/JNkLslXetON3A3p6RXPPNQ?mode=ems_share_t"
                    target="_blank"
                  >
                    <WhatsAppIcon />
                    Apply Via WhatsApp
                  </Link>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" variant="outline" className="flex-1">
                      <Mail />
                      Apply Via Email
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apply Via Email</AlertDialogTitle>
                      <AlertDialogDescription>
                        You can apply by sending your resume to the email address below.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4 p-3 bg-muted rounded-md text-center font-mono">
                      ceo@macs11.com
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                      <Button variant="secondary" onClick={handleCopyToClipboard}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Email
                      </Button>
                      <AlertDialogAction asChild>
                        <Link href="mailto:ceo@macs11.com?subject=Job Application for macs11">
                          Open in Mail
                        </Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
