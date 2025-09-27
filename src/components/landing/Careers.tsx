import { Button } from "../ui/button";
import Link from "next/link";
import { WhatsAppIcon } from "./WhatsAppButton";
import { Mail } from "lucide-react";

export default function Careers() {
    return (
      <section id="careers" className="py-20 md:py-32">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Join Our Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Are you passionate about simplifying lives and empowering communities through technology? We are looking for talented individuals to join our mission.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" asChild>
                <Link href="https://chat.whatsapp.com/JNkLslXetON3A3p6RXPPNQ?mode=ems_share_t" target="_blank">
                    <WhatsAppIcon />
                    Apply Via WhatsApp
                </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="mailto:ceo@macs11.com?subject=Job Application for macs11">
                    <Mail />
                    Apply Via Email
                </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  