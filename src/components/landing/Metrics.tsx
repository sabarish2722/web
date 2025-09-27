import { CheckCircle, Star, Users, type LucideIcon } from "lucide-react";

interface Metric {
  icon: LucideIcon;
  value: string;
  label: string;
}

const metrics: Metric[] = [
  {
    icon: Users,
    value: "500+",
    label: "Local Partners",
  },
  {
    icon: CheckCircle,
    value: "10,000+",
    label: "Services Completed",
  },
  {
    icon: Star,
    value: "4.8",
    label: "Average Rating",
  },
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-20 md:py-32">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            The macs11 Difference
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We are committed to building a platform that's reliable, efficient,
            and trusted by thousands.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center">
              <metric.icon className="w-12 h-12 text-accent mb-4" />
              <p className="text-5xl font-bold font-headline text-primary">
                {metric.value}
              </p>
              <p className="text-muted-foreground mt-2 text-lg">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
