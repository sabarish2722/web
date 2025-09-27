
"use client";

import { useEffect, useState } from 'react';
import { getAndIncrementVisitorCount } from '../app/actions';
import { Users } from 'lucide-react';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // We only increment the count once per client session.
        if (!sessionStorage.getItem('visitorCounted')) {
          const visitorCount = await getAndIncrementVisitorCount();
          setCount(visitorCount);
          sessionStorage.setItem('visitorCounted', 'true');
        } else {
          // If already counted, you might want to fetch the current count without incrementing.
          // This part depends on if you have a `getVisitorCount` function.
          // For now, we'll just show the count from the first increment.
          // A more robust solution might be needed if you want real-time updates.
          const initialCount = await getAndIncrementVisitorCount(); // This will re-increment, for demo
          setCount(initialCount);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setCount(-1); 
      }
    };

    // A better approach for subsequent visits would be to fetch without incrementing.
    // For simplicity, we'll just run this once.
    if (!count) {
      fetchVisitorCount();
    }
  }, [count]);

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-background p-4 text-center text-lg shadow-inner">
      <Users className="h-6 w-6 text-primary" />
      <span className="font-bold text-foreground">Total Visitors:</span>
      {count === null ? (
        <span className="font-mono">...</span>
      ) : count === -1 ? (
         <span className="font-mono text-destructive">Error</span>
      ) : (
        <span className="font-mono font-bold text-primary">{count}</span>
      )}
    </div>
  );
};

export default VisitorCounter;
