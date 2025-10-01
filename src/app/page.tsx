
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Partners from "@/components/landing/Partners";
import AdBanner from "@/components/ads/AdBanner";
import Careers from "@/components/landing/Careers";
import Investors from "@/components/landing/Investors";
import Metrics from "@/components/landing/Metrics";
import Mission from "@/components/landing/Mission";
import YouTubePlayer from "@/components/landing/YouTubePlayer";
import { supabaseAdmin } from "@/lib/supabase";

function getYouTubeID(url: string): string | null {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            return urlObj.searchParams.get('v');
        }
    } catch (e) {
        console.error("Could not parse URL:", url, e);
        return null;
    }
    return null;
}

async function getYouTubeVideoId(): Promise<string> {
    const fallbackVideoId = "Ht8K2hhX7Io"; 

    if (!supabaseAdmin) {
        console.warn("Supabase admin client not initialized. Falling back to default YouTube video.");
        return fallbackVideoId;
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('youtube_videos')
            .select('video_url')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error("Error fetching YouTube video URL:", error.message);
            return fallbackVideoId;
        }

        const videoId = data?.video_url ? getYouTubeID(data.video_url) : null;
        
        return videoId || fallbackVideoId;

    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        console.error('An unexpected error occurred while fetching YouTube video ID:', errorMessage);
        return fallbackVideoId;
    }
}


export default async function Home() {
  const videoId = await getYouTubeVideoId();

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
                <YouTubePlayer videoId={videoId} />
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
