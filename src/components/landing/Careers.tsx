import { Button } from "../ui/button";
import Link from "next/link";

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
          <div className="mt-8">
            <Button size="lg" asChild>
                <Link href="mailto:ceo@macs11.com?subject=Career%20Inquiry">
                    Apply Now
                </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  