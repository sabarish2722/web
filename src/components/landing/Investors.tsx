import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import InvestorForm from "../forms/InvestorForm";

export default function Investors() {
  const investorImage = PlaceHolderImages.find(
    (img) => img.id === "investor-image"
  );

  return (
    <section id="investors" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-card">
      <div className="container grid lg:grid-cols-2 gap-10 sm:gap-12 items-center max-w-7xl">
        <div className="w-full">
          <InvestorForm />
        </div>
        <div className="flex flex-col gap-6 lg:order-first">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">
            Invest in the Future of Local Commerce
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our journey to shape the future of local commerce in India. We
            are building a robust ecosystem that empowers small businesses and
            delivers unparalleled convenience to millions of users.
          </p>
          {investorImage && (
            <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
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
