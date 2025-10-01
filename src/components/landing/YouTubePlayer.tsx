
"use client";

import React from 'react';
import YouTube from 'react-youtube';

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl shadow-primary/20">
      <YouTube videoId={videoId} opts={opts} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default YouTubePlayer;
