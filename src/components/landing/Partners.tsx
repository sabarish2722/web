import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ListChecks } from "lucide-react";
import PartnerForm from "@/components/forms/PartnerForm";

const benefits = [
  "Reach thousands of new customers in your area.",
  "Increase your sales and grow your revenue.",
  "Digitalize your operations with our easy-to-use tools.",
  "Build trust and a strong reputation in your community.",
];

export default function Partners() {
  const partnerImage = PlaceHolderImages.find(
    (img) => img.id === "partner-image"
  );

  return (
    <section id="partners" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container grid lg:grid-cols-2 gap-10 sm:gap-12 items-center max-w-7xl">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">
            Grow Your Local Business with macs11
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our network of trusted local partners and take your business to
            the next level. We provide the platform, you provide the service.
          </p>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <ListChecks className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          {partnerImage && (
            <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={partnerImage.imageUrl}
                alt={partnerImage.description}
                width={600}
                height={400}
                className="w-full object-cover"
                data-ai-hint={partnerImage.imageHint}
              />
            </div>
          )}
        </div>
        <div className="w-full">
            <PartnerForm />
        </div>
      </div>
    </section>
  );
}
