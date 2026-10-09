import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export interface LightLinesProps {
    /** Additional CSS classes */
    className?: string;
    /** Lines opacity (0-1) */
    linesOpacity?: number;
    /** Lights opacity (0-1) */
    lightsOpacity?: number;
    /** Animation speed multiplier */
    speedMultiplier?: number;
    /** Primary gradient color (from) */
    gradientFrom?: string;
    /** Primary gradient color (to) */
    gradientTo?: string;
    /** Light color */
    lightColor?: string;
    /** Line color */
    lineColor?: string;
    /** Children content to overlay */
    children?: React.ReactNode;
}

interface LightConfig {
    selector: string;
    yMin: number;
    yMax: number;
    speedFactor: number;
    initialOffset: number; // 0 to 1 progress offset
}

interface ActiveLightAnimation {
    element: SVGElement | null;
    from: number;
    to: number;
    distance: number;
    duration: number;
    initialOffsetSeconds: number;
}

export function LightLines({
    className,
    linesOpacity = 0.12,
    lightsOpacity = 0.85,
    speedMultiplier = 0.55,
    gradientFrom = "#062114",
    gradientTo = "#0D3E26",
    lightColor = "#34D399",
    lineColor = "rgba(52, 211, 153, 0.22)",
    children,
}: LightLinesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationsRef = useRef<ActiveLightAnimation[]>([]);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Exact measured Y boundaries for all SVG light paths and beams
        // to guarantee full top-to-bottom traversal without premature cutoffs
        const lightConfigs: LightConfig[] = [
            // Original SVG light clusters with calibrated bounding boxes
            { selector: ".light1", yMin: 55.5, yMax: 684.8, speedFactor: 0.95, initialOffset: 0.05 },
            { selector: ".light2", yMin: 0.0, yMax: 540.0, speedFactor: 1.05, initialOffset: 0.55 },
            { selector: ".light3", yMin: 0.0, yMax: 313.5, speedFactor: 0.90, initialOffset: 0.28 },
            { selector: ".light4", yMin: 851.0, yMax: 1080.0, speedFactor: 1.10, initialOffset: 0.75 },
            { selector: ".light5", yMin: 822.7, yMax: 1080.0, speedFactor: 0.98, initialOffset: 0.38 },
            { selector: ".light6", yMin: 519.6, yMax: 1080.0, speedFactor: 1.02, initialOffset: 0.18 },
            { selector: ".light7", yMin: 48.0, yMax: 707.7, speedFactor: 0.92, initialOffset: 0.68 },
            { selector: ".light8", yMin: 184.7, yMax: 514.5, speedFactor: 1.08, initialOffset: 0.48 },
            { selector: ".light9", yMin: 381.2, yMax: 1080.0, speedFactor: 1.00, initialOffset: 0.02 },
            { selector: ".light10", yMin: 0.0, yMax: 441.9, speedFactor: 1.12, initialOffset: 0.78 },
            { selector: ".light11", yMin: 331.5, yMax: 991.2, speedFactor: 0.96, initialOffset: 0.24 },
            { selector: ".light12", yMin: 0.0, yMax: 508.1, speedFactor: 1.04, initialOffset: 0.58 },
            { selector: ".light13", yMin: 0.0, yMax: 520.4, speedFactor: 0.94, initialOffset: 0.14 },
            { selector: ".light14", yMin: 655.3, yMax: 1080.0, speedFactor: 1.06, initialOffset: 0.44 },
            { selector: ".light15", yMin: 568.0, yMax: 898.1, speedFactor: 0.88, initialOffset: 0.88 },
            { selector: ".light16", yMin: 398.0, yMax: 1010.8, speedFactor: 1.15, initialOffset: 0.22 },
            { selector: ".light17", yMin: 0.0, yMax: 441.9, speedFactor: 0.97, initialOffset: 0.65 },
            // Continuous flowing laser beams
            { selector: ".beam1", yMin: 0.0, yMax: 240.0, speedFactor: 1.00, initialOffset: 0.0 },
            { selector: ".beam2", yMin: 0.0, yMax: 280.0, speedFactor: 1.04, initialOffset: 0.42 },
            { selector: ".beam3", yMin: 0.0, yMax: 180.0, speedFactor: 0.92, initialOffset: 0.20 },
            { selector: ".beam4", yMin: 0.0, yMax: 320.0, speedFactor: 1.08, initialOffset: 0.70 },
            { selector: ".beam5", yMin: 0.0, yMax: 220.0, speedFactor: 0.96, initialOffset: 0.35 },
            { selector: ".beam6", yMin: 0.0, yMax: 260.0, speedFactor: 1.04, initialOffset: 0.82 },
            { selector: ".beam7", yMin: 0.0, yMax: 300.0, speedFactor: 0.98, initialOffset: 0.10 },
            { selector: ".beam8", yMin: 0.0, yMax: 200.0, speedFactor: 1.10, initialOffset: 0.52 },
            { selector: ".beam9", yMin: 0.0, yMax: 260.0, speedFactor: 0.90, initialOffset: 0.30 },
            { selector: ".beam10", yMin: 0.0, yMax: 290.0, speedFactor: 1.06, initialOffset: 0.76 },
        ];

        // Adjusted base speed for serene, luxurious real-estate feel: ~75 SVG coordinate units/sec
        const baseSpeed = 55 * Math.max(0.10, speedMultiplier);

        animationsRef.current = lightConfigs.map((config) => {
            const element = container.querySelector(config.selector) as SVGElement | null;
            // Travel starting point: element's bottom is completely above viewport top (y <= 0)
            const from = -(config.yMax + 40);
            // Travel ending point: element's top is completely below viewport bottom (y >= 1080)
            const to = 1080 - config.yMin + 40;
            const distance = to - from;
            const speed = baseSpeed * config.speedFactor;
            const duration = distance / speed; // in seconds
            const initialOffsetSeconds = config.initialOffset * duration;

            return {
                element,
                from,
                to,
                distance,
                duration,
                initialOffsetSeconds,
            };
        });

        let isVisible = false;
        let lastTime: number | null = null;
        let virtualTime = 0;
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;

        const onScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            // Add momentum proportional to scroll direction & velocity
            scrollVelocity += delta * 0.003;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        const animate = (time: number) => {
            if (lastTime === null) {
                lastTime = time;
            }
            const dt = Math.min((time - lastTime) / 1000, 0.1); // clamp delta time to avoid jumps
            lastTime = time;

            if (isVisible) {
                // Decay scroll velocity smoothly (spring momentum effect)
                scrollVelocity *= 0.70;
                if (Math.abs(scrollVelocity) < 0.0001) scrollVelocity = 0;

                // Advance virtual time naturally + user scroll momentum
                virtualTime += dt + scrollVelocity;

                animationsRef.current.forEach((anim) => {
                    if (!anim.element) return;

                    // Compute normalized continuous cycle progress from 0 to 1
                    let progress = ((virtualTime + anim.initialOffsetSeconds) % anim.duration) / anim.duration;
                    if (progress < 0) progress += 1; // handle reverse scroll smoothly

                    const currentY = anim.from + anim.distance * progress;
                    anim.element.style.transform = `translateY(${currentY.toFixed(2)}px)`;
                });
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );

        observer.observe(container);
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            observer.disconnect();
        };
    }, [speedMultiplier]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "absolute inset-0 h-full w-full flex justify-center overflow-hidden pointer-events-none",
                className
            )}
            style={{
                background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            }}
        >
            <svg
                className="absolute inset-0 h-full w-full opacity-90 overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Glowing filter for light streaks */}
                    <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Linear Gradients for Full-Pass Beams */}
                    <linearGradient id="beamGradDown" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
                        <stop offset="60%" stopColor="#34D399" stopOpacity="0.8" />
                        <stop offset="95%" stopColor="#A7F3D0" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                    </linearGradient>
                    
                    <linearGradient id="beamGradSoft" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                        <stop offset="70%" stopColor="#34D399" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.95" />
                    </linearGradient>
                </defs>

                {/* Static Vertical Grid Lines - Full Height */}
                <g className="lines" style={{ opacity: linesOpacity }}>
                    <rect className="line" x="70.3" y="-200" width="3.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="124.2" y="-200" width="1.2" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="300.8" y="-200" width="3.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="328.7" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="455.9" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="615" y="-200" width="3.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="684.6" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="873.3" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1100" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1233.4" y="-200" width="1.2" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1253.6" y="-200" width="3.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1310.2" y="-200" width="1.2" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1369.4" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1547.1" y="-200" width="3.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1618.6" y="-200" width="1.5" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1666.4" y="-200" width="1.2" height="1480" style={{ fill: lineColor }} />
                    <rect className="line" x="1818.4" y="-200" width="3.5" height="1480" style={{ fill: lineColor }} />
                </g>

                {/* Animated Light Trails and Sweeping Beams with Persistent Full-Pass Trajectory */}
                <g className="lights" style={{ opacity: lightsOpacity }} filter="url(#emeraldGlow)">
                    
                    {/* Continuous Streaming Vertical Laser Beams */}
                    <rect className="beam1" x="70.3" y="0" width="3.5" height="240" fill="url(#beamGradDown)" />
                    <rect className="beam2" x="300.8" y="0" width="3.5" height="280" fill="url(#beamGradDown)" />
                    <rect className="beam3" x="455.9" y="0" width="1.8" height="180" fill="url(#beamGradSoft)" />
                    <rect className="beam4" x="615" y="0" width="3.5" height="320" fill="url(#beamGradDown)" />
                    <rect className="beam5" x="873.3" y="0" width="2" height="220" fill="url(#beamGradSoft)" />
                    <rect className="beam6" x="1100" y="0" width="2" height="260" fill="url(#beamGradSoft)" />
                    <rect className="beam7" x="1253.6" y="0" width="3.5" height="300" fill="url(#beamGradDown)" />
                    <rect className="beam8" x="1369.4" y="0" width="1.8" height="200" fill="url(#beamGradSoft)" />
                    <rect className="beam9" x="1547.1" y="0" width="3.5" height="260" fill="url(#beamGradDown)" />
                    <rect className="beam10" x="1818.4" y="0" width="3.5" height="290" fill="url(#beamGradDown)" />

                    {/* Geometric Light Clusters */}
                    <path
                        className="light1 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M619.5,298.4H615v19.5h4.5V298.4z M619.5,674.8H615v9.8h4.5V674.8z M619.5,135.1H615v5.6h4.5V135.1z M619.5,55.5H615v68.7h4.5V55.5z"
                    />
                    <path
                        className="light2 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1258.2,531.9h-4.5v8.1h4.5V531.9z M1258.2,497.9h-4.5v17.9h4.5V497.9z M1258.2,0h-4.5v25.3h4.5V0z M1258.2,252.2h-4.5v42.4h4.5V252.2z"
                    />
                    <path
                        className="light3 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M875.1,123.8h-1.8v4h1.8V123.8z M875.1,289.4h-1.8v24.1h1.8V289.4z M875.1,0h-1.8v31.4h1.8V0z M875.1,50.2h-1.8v11.5h1.8V50.2z"
                    />
                    <path
                        className="light4 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1101.8,983.8h-1.8v8.2h1.8V983.8z M1101.8,1075.9h-1.8v4.1h1.8V1075.9z M1101.8,873.7h-1.8v4.2h1.8V873.7z M1101.8,851h-1.8v18.2h1.8V851z"
                    />
                    <path
                        className="light5 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M686.4,822.7h-1.8v3.8h1.8V822.7z M686.4,928.4h-1.8v23h1.8V928.4z M686.4,1043.8h-1.8v36.2h1.8V1043.8z"
                    />
                    <path
                        className="light6 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1551.6,860.9h-4.4v-34.1h4.4V860.9z M1551.6,533.5h-4.4v-13.9h4.4V533.5z M1551.6,1080h-4.4v-89.1h4.4V1080z"
                    />
                    <path
                        className="light7 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1311.1,707.7h-0.9V698h0.9V707.7z M1311.1,436.8h-0.9v-58.9h0.9V436.8z M1311.1,140.7h-0.9V48h0.9V140.7z"
                    />
                    <path
                        className="light8 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M125.1,514.5h-0.9v-9.7h0.9V514.5z M125.1,243.6h-0.9v-58.9h0.9V243.6z"
                    />
                    <path
                        className="light9 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M305.4,806.7h-4.6v-42.5h4.6V806.7z M305.4,398.5h-4.6v-17.3h4.6V398.5z M305.4,1080h-4.6V968.8h4.6V1080z"
                    />
                    <path
                        className="light10 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1822.9,170.7h-4.5v13.7h4.5V170.7z M1822.9,435.1h-4.5v6.8h4.5V435.1z M1822.9,55.9h-4.5v4h4.5V55.9z M1822.9,0h-4.5v48.3h4.5V0z"
                    />
                    <path
                        className="light11 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1666.4,331.5h0.9v9.7h-0.9V331.5z M1666.4,602.4h0.9v58.9h-0.9V602.4z M1666.4,898.5h0.9v92.7h-0.9V898.5z"
                    />
                    <path
                        className="light12 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1620.4,200.7h-1.8v6.4h1.8V200.7z M1620.4,469.1h-1.8v39h1.8V469.1z M1620.4,0h-1.8v51h1.8V0z M1620.4,81.3h-1.8V100h1.8V81.3z"
                    />
                    <path
                        className="light13 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M74.8,201h-4.5v16.2h4.5V201z M74.8,512.3h-4.5v8.1h4.5V512.3z M74.8,65.8h-4.5v4.6h4.5V65.8z M74.8,0h-4.5v56.8h4.5V0z"
                    />
                    <path
                        className="light14 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1371.2,655.3h-1.8v6.3h1.8V655.3z M1371.2,829.7h-1.8v37.9h1.8V829.7z M1371.2,1020.3h-1.8v59.7h1.8V1020.3z"
                    />
                    <path
                        className="light15 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M1234.3,898.1h-0.9v-4.9h0.9V898.1z M1234.3,762.5h-0.9v-29.5h0.9V762.5z M1234.3,614.4h-0.9v-46.4h0.9V614.4z"
                    />
                    <path
                        className="light16 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M457.7,1010.8h-1.8v-18.1h1.8V1010.8z M457.7,507.5h-1.8V398h1.8V507.5z"
                    />
                    <path
                        className="light17 light"
                        style={{ fill: lightColor, fillRule: "evenodd", clipRule: "evenodd" }}
                        d="M330.5,170.7h-1.8v13.7h1.8V170.7z M330.5,435.1h-1.8v6.8h1.8V435.1z M330.5,55.9h-1.8v4h1.8V55.9z M330.5,0h-1.8v48.3h1.8V0z"
                    />
                </g>
            </svg>

            {/* Content overlay */}
            {children && (
                <div className="relative z-10 w-full h-full">{children}</div>
            )}
        </div>
    );
}

export default LightLines;


