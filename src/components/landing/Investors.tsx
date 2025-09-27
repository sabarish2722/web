import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WhatsAppIcon } from "./WhatsAppButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function Investors() {
  const investorImage = PlaceHolderImages.find(
    (img) => img.id === "investor-image"
  );

  return (
    <section id="investors" className="py-20 md:py-32 bg-card">
      <div className="container grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
        <div className="w-full">
        <Card className="w-full max-w-lg mx-auto shadow-2xl shadow-primary/10">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">
                Join Our Investor Community
                </CardTitle>
                <CardDescription>
                Connect with us directly on WhatsApp to get our investor deck and stay updated on our journey.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white" asChild>
                    <Link href="https://chat.whatsapp.com/D2Nr5hltsF468baNYBn9Wf?mode=ems_share_t" target="_blank">
                        <WhatsAppIcon />
                        Join Investor WhatsApp Group
                    </Link>
                </Button>
            </CardContent>
         </Card>
        </div>
        <div className="flex flex-col gap-6 lg:order-first">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Invest in the Future of Local Commerce
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our journey to shape the future of local commerce in India. We
            are building a robust ecosystem that empowers small businesses and
            delivers unparalleled convenience to millions of users.
          </p>
          {investorImage && (
            <div className="mt-6 rounded-lg overflow-hidden shadow-lg hidden lg:block">
              <Image
                src={investorImage.imageUrl}
                alt={investorImage.description}
                width={600}
                height={400}
                className="w-full object-cover"
                data-ai-hint={investorImage.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
