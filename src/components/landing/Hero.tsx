
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileAppSimulator from "./MobileAppSimulator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import AdBanner from "@/components/ads/AdBanner";

export default function Hero() {
  const appScreenImage = PlaceHolderImages.find(
    (img) => img.id === "hero-app-screen"
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight">
              Your City, Simplified. <br />
              <span className="text-primary">Fast. Trusted.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-xl mx-auto lg:mx-0">
              macs11 is your all-in-one platform for daily essentials,
              fitness, shopping, and tech services. We connect you with trusted
              local businesses to make life easier.
            </p>
            <div className="mt-8 flex gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="#services">Explore Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#partners">Become a Partner</Link>
              </Button>
            </div>
          </div>
          {appScreenImage && (
            <div className="flex justify-center">
              <MobileAppSimulator imageUrl={appScreenImage.imageUrl} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
