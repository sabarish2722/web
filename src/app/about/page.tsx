
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { CheckCircle } from "lucide-react";

const teamMembers = [
    { name: "John Doe", role: "CEO & Founder" },
    { name: "Jane Smith", role: "Chief Technology Officer" },
    { name: "Peter Jones", role: "Head of Operations" },
    { name: "Samantha Lee", role: "Lead Product Designer" },
];

const coreValues = [
    "Customer-Centricity",
    "Innovation",
    "Integrity",
    "Community Empowerment",
    "Operational Excellence",
];

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image");

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-20 md:py-32">
                    <div className="container max-w-5xl text-center">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter">About macs11</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            We are on a mission to simplify lives and empower local communities across India. Discover our story, our values, and the team making it all happen.
                        </p>
                    </div>
                </section>

                {aboutImage && (
                    <section className="container max-w-5xl">
                        <div className="rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                width={1200}
                                height={600}
                                className="w-full object-cover"
                                data-ai-hint={aboutImage.imageHint}
                            />
                        </div>
                    </section>
                )}

                <section className="py-20 md:py-32">
                    <div className="container max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Story</h2>
                            <p className="mt-4 text-muted-foreground">
                                macs11 started with a simple idea: to bridge the gap between local businesses and the communities they serve. In a rapidly digitizing world, we saw an opportunity to bring the convenience of e-commerce to the neighborhood level, creating a platform that not only delivers essentials but also fosters economic growth and connectivity. From a small team with a big vision, we have grown into a trusted hyperlocal service provider, dedicated to making everyday life easier for millions.
                            </p>
                        </div>
                         <div>
                            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Core Values</h2>
                             <ul className="mt-6 space-y-4">
                                {coreValues.map((value) => (
                                    <li key={value} className="flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                        <span className="text-lg">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                 <section className="py-20 md:py-32 bg-card">
                    <div className="container max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet the Team</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">The passionate individuals driving the macs11 mission forward.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="text-center">
                                    <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                                      <Image src={`https://picsum.photos/seed/${member.name.replace(/\s/g, '')}/100/100`} alt={member.name} width={100} height={100} className="rounded-full" />
                                    </div>
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
