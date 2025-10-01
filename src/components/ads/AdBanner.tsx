
"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

const AdBanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="mx-auto text-center">
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3223413296044209"
                data-ad-slot="YOUR_AD_SLOT_ID"       // Replace with your Ad Slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdBanner;
