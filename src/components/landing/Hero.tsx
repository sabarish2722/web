import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileAppSimulator from "./MobileAppSimulator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function Hero() {
  const appScreenImage = PlaceHolderImages.find(
    (img) => img.id === "hero-app-screen"
  );

  return (
    <section
      id="hero"
      className="container relative grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <div className="flex flex-col gap-6 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter leading-tight">
          Your City, Simplified.
          <br />
          <span className="text-primary">Fast. Trusted.</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mx-auto lg:mx-0">
          macs11 is India's hyperlocal platform for daily essentials, fitness,
          shopping, and tech services. Everything you need, delivered right to
          your doorstep.
        </p>
        <div
          id="download"
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <Button asChild size="lg">
            <Link href="#">Download the App</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="#partners">Partner With Us</Link>
          </Button>
        </div>
      </div>
      <div className="relative flex justify-center">
        {appScreenImage && (
          <MobileAppSimulator>
            <Image
              src={appScreenImage.imageUrl}
              alt={appScreenImage.description}
              width={300}
              height={600}
              data-ai-hint={appScreenImage.imageHint}
              className="object-cover w-full h-full"
            />
          </MobileAppSimulator>
        )}
      </div>
    </section>
  );
}
