import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dumbbell,
  ShoppingCart,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: ShoppingCart,
    title: "Daily Essentials",
    description: "Groceries, medicines, and more, delivered in minutes.",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    description: "Book local classes, find personal trainers, and stay active.",
  },
  {
    icon: Store,
    title: "Shopping",
    description: "Discover products from local retailers and artisans near you.",
  },
  {
    icon: Wrench,
    title: "Tech Services",
    description: "Get expert help with device repairs, setup, and support.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-card">
      <div className="container max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">
            A Service for Every Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From daily necessities to specialized services, macs11 connects you
            with your local community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="flex flex-col items-center text-center p-6 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              <CardHeader className="p-0">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
