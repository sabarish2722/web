
import { cn } from "@/lib/utils";
import Image from "next/image";
import type React from "react";

interface MobileAppSimulatorProps {
  imageUrl: string;
  imageAlt?: string;
  className?: string;
}

export default function MobileAppSimulator({
  imageUrl,
  imageAlt = "App Screenshot",
  className,
}: MobileAppSimulatorProps) {
  return (
    <div
      className={cn(
        "relative mx-auto border-muted bg-muted border-[12px] rounded-[2.5rem] h-[550px] w-[270px] md:h-[600px] md:w-[300px] shadow-2xl shadow-primary/10",
        className
      )}
    >
      <div className="w-[120px] h-[18px] bg-muted top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
      <div className="h-[46px] w-[3px] bg-muted absolute -left-[15px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-muted absolute -left-[15px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-muted absolute -right-[15px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background relative">
        <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
        />
      </div>
    </div>
  );
}
