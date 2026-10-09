import React, { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

export interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 30, className }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1400;
    const styles = [...new Array(number)].map(() => ({
      top: "-10px",
      left: Math.floor(Math.random() * (width + 300) - 100) + "px",
      animationDelay: (Math.random() * 2 + 0.2).toFixed(2) + "s",
      animationDuration: (Math.floor(Math.random() * 8 + 3)) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute size-1 rotate-[215deg] animate-meteor rounded-full bg-white shadow-[0_0_0_1px_#ffffff30]",
            className
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-white via-amber-200/50 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
