
"use client";

import { useEffect, useState } from 'react';
import { getAndIncrementVisitorCount } from '../app/actions';
import { Users } from 'lucide-react';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCount = async () => {
      try {
        const hasBeenCounted = sessionStorage.getItem('visitorCounted');
        const visitorCount = await getAndIncrementVisitorCount();

        if (visitorCount === -1) {
          // This indicates a server-side configuration issue with Supabase
          setError("Counter not available");
          setCount(null);
          return;
        }

        if (!hasBeenCounted) {
          setCount(visitorCount);
          sessionStorage.setItem('visitorCounted', 'true');
        } else {
          // If already counted, just display the fetched count without re-incrementing.
          // The action now returns the current count even if it doesn't increment.
          setCount(visitorCount);
        }
      } catch (err) {
        console.error("Failed to fetch visitor count:", err);
        setError("Error");
        setCount(null);
      }
    };

    initializeCount();
  }, []); // Empty dependency array ensures this runs only once on mount.

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-background p-4 text-center text-lg shadow-inner">
      <Users className="h-6 w-6 text-primary" />
      <span className="font-bold text-foreground">Total Visitors:</span>
      {count !== null ? (
        <span className="font-mono font-bold text-primary">{count}</span>
      ) : error ? (
         <span className="font-mono text-destructive">{error}</span>
      ) : (
        <span className="font-mono">...</span>
      )}
    </div>
  );
};

export default VisitorCounter;
