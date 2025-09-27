
import Careers from "@/components/landing/Careers";
import Hero from "@/components/landing/Hero";
import Investors from "@/components/landing/Investors";
import Metrics from "@/components/landing/Metrics";
import Mission from "@/components/landing/Mission";
import Partners from "@/components/landing/Partners";
import Services from "@/components/landing/Services";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Metrics />
      <Mission />
      <Partners />
      <Investors />
      <Careers />
    </main>
  );
}
