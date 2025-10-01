
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Partners from "@/components/landing/Partners";
import AdBanner from "@/components/ads/AdBanner";
import Careers from "@/components/landing/Careers";
import Investors from "@/components/landing/Investors";
import Metrics from "@/components/landing/Metrics";
import Mission from "@/components/landing/Mission";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="my-12">
        <AdBanner />
      </div>
      <Services />
      <Metrics />
      <Mission />
      <Careers />
      <Partners />
      <Investors />
    </main>
  );
}
