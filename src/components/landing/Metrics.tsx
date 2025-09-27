
import * as LucideIcons from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";

// A type guard to check if a key is a valid icon name
function isIconName(key: string): key is keyof typeof LucideIcons {
    return key in LucideIcons;
}

async function getMetrics() {
    const fallbackData = [
        { id: 1, icon_name: 'Users', value: "3+", label: "Local Partners" },
        { id: 2, icon_name: 'CheckCircle', value: "4+", label: "Services Completed" },
        { id: 3, icon_name: 'Star', value: "4.8", label: "Average Rating" },
    ];

    if (!supabaseAdmin) {
        console.warn("Supabase admin client not initialized. Falling back to default metrics. Please check server environment variables.");
        return fallbackData;
    }
    
    const { data, error } = await supabaseAdmin
        .from('metrics')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error("Error fetching metrics:", error);
        return fallbackData;
    }
    return data;
}

export default async function Metrics() {
    const metrics = await getMetrics();

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
                    {metrics.map((metric) => {
                        const IconComponent = isIconName(metric.icon_name)
                            ? LucideIcons[metric.icon_name]
                            : LucideIcons.AlertCircle; // Fallback icon

                        return (
                            <div key={metric.id} className="flex flex-col items-center">
                                <IconComponent className="w-12 h-12 text-primary mb-4" />
                                <p className="text-5xl font-bold font-headline">
                                    {metric.value}
                                </p>
                                <p className="text-muted-foreground mt-2 text-lg">
                                    {metric.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
