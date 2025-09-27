
"use client";

import { useEffect, useState } from 'react';
import { getAndIncrementVisitorCount } from '../app/actions';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const visitorCount = await getAndIncrementVisitorCount();
        setCount(visitorCount);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        // Optionally, set a fallback or error state
        setCount(-1); 
      }
    };

    fetchVisitorCount();
  }, []);

  if (count === null) {
    return <div>Loading visitors...</div>;
  }

  if (count === -1) {
    return <div>Error loading count.</div>;
  }

  return <div>Total Visitors: {count}</div>;
};

export default VisitorCounter;
