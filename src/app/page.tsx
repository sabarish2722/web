
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Partners from "@/components/landing/Partners";
import AdBanner from "@/components/ads/AdBanner";
import Careers from "@/components/landing/Careers";
import Investors from "@/components/landing/Investors";
import Metrics from "@/components/landing/Metrics";
import Mission from "@/components/landing/Mission";
import YouTubePlayer from "@/components/landing/YouTubePlayer";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="my-12">
        <AdBanner />
      </div>
      <Services />
      <section className="py-16 sm:py-20">
        <div className="container max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold">
                Watch Our Story
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn more about our mission and how we're making a difference in local communities across India.
            </p>
            <div className="mt-10">
                <YouTubePlayer videoId="dQw4w9WgXcQ" />
            </div>
        </div>
      </section>
      <Metrics />
      <Mission />
      <Careers />
      <Partners />
      <Investors />
    </main>
  );
}
