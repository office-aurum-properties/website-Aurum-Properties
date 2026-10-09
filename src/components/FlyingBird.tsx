import React, { useEffect, useRef, useState, useCallback } from 'react';
import './flyingBird.css';

/**
 * ============================================================================
 * FLYING BIRD COMPONENT (HOME PAGE DECORATIVE FEATURE)
 * ============================================================================
 * A realistic, vibrant Scarlet Macaw parrot (Ara macao) that gracefully
 * glides diagonally across the screen as the user explores the Home page.
 *
 * KEY CRAFTSMANSHIP DETAILS:
 * - Iconic tri-color plumage: vivid scarlet red body & mantle, brilliant golden-yellow
 *   covert band with emerald margins, and rich cobalt blue flight feathers.
 * - Long, elegant tapering scarlet-to-blue tail with natural aerodynamic wave motion.
 * - Characteristic bare white facial eye patch, hooked ivory & black parrot beak,
 *   and alert amber-gold eye.
 * - GPU-accelerated wing flap and tail wave cycle running at 60/120 FPS.
 * - Natural undulating wave / bobbing motion during flight.
 * - Throttled scroll observer via requestAnimationFrame.
 * - Respects prefers-reduced-motion (disables completely for accessibility).
 * - Fixed positioning with pointer-events: none and z-index below navigation.
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION: Easily tweak flight speed, size, and trigger frequency here
// ============================================================================
export const BIRD_CONFIG = {
  // Flight duration: time in milliseconds for the macaw to cross the screen
  // (Slowed down to 9600ms for a peaceful, leisurely, majestic soaring glide)
  flightDurationMs: 9600,

  // Cooldown: minimum seconds between flights so it feels like a delightful
  // subtle natural encounter rather than a repetitive loop.
  cooldownSeconds: 5,

  // Scroll distance: cumulative pixels scrolled before a flight is triggered
  // (e.g. 600-800px corresponds to roughly one major content section)
  scrollThresholdPx: 650,

  // Visual size (width in pixels) - increased size for clear visibility
  sizeDesktopPx: 128,
  sizeMobilePx: 86,

  // Wing flap animation cycle speed in seconds (0.40s = gentle, rhythmic soaring flap)
  wingFlapSpeedSec: 0.40,
};

interface FlightTrajectory {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotationDeg: number;
}

export default function FlyingBird() {
  // Respect user's OS preference for reduced motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isFlying, setIsFlying] = useState(false);
  const [flightCoords, setFlightCoords] = useState<FlightTrajectory | null>(null);
  const [inMotion, setInMotion] = useState(false);

  // Tracking refs to throttle scroll and prevent redundant re-renders
  const accumulatedScrollRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastFlightTimeRef = useRef(0);
  const isFlyingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const flightTimerRef = useRef<NodeJS.Timeout | null>(null);
  const flightVariantRef = useRef(0);

  // Keep ref in sync with state for zero-lag scroll event checking
  isFlyingRef.current = isFlying;

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }
  }, []);

  /**
   * Launch a single diagonal flight across the viewport.
   * Alternates between two natural flight paths:
   * 1. Ascending cross-screen glide (bottom-left to top-right)
   * 2. Gentle descending canopy sweep (top-left to mid-right)
   */
  const triggerFlight = useCallback(() => {
    if (isFlyingRef.current || typeof window === 'undefined') return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const birdSize = vw < 480 ? BIRD_CONFIG.sizeMobilePx : BIRD_CONFIG.sizeDesktopPx;
    const offset = birdSize * 1.5;

    // Alternate flight trajectories for organic variety
    const variant = flightVariantRef.current % 2;
    flightVariantRef.current += 1;

    let startX = -offset;
    let startY = vh * 0.72;
    let endX = vw + offset;
    let endY = vh * 0.12;

    if (variant === 1) {
      // Gentle sweep trajectory
      startX = -offset;
      startY = vh * 0.25;
      endX = vw + offset;
      endY = vh * 0.52;
    }

    // Compute angle of trajectory for natural banking
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const angleRad = Math.atan2(deltaY, deltaX);
    const rotationDeg = Math.round((angleRad * 180) / Math.PI);

    const trajectory: FlightTrajectory = {
      startX,
      startY,
      endX,
      endY,
      rotationDeg,
    };

    setFlightCoords(trajectory);
    setIsFlying(true);
    setInMotion(false);

    // Double-rAF ensures the initial offscreen position is rendered before transitioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setInMotion(true);
      });
    });

    // Reset when the bird has exited the opposite side of the screen
    flightTimerRef.current = setTimeout(() => {
      setIsFlying(false);
      setInMotion(false);
      setFlightCoords(null);
      lastFlightTimeRef.current = Date.now();
      accumulatedScrollRef.current = 0;
    }, BIRD_CONFIG.flightDurationMs + 100);
  }, []);

  /**
   * Scroll listener with requestAnimationFrame throttling.
   * Tracks cumulative scroll distance and checks cooldown.
   */
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        const currentY = window.scrollY;
        const delta = Math.abs(currentY - lastScrollYRef.current);
        lastScrollYRef.current = currentY;

        // Only accumulate while not currently in flight
        if (!isFlyingRef.current) {
          accumulatedScrollRef.current += delta;

          const now = Date.now();
          const timeSinceLast = (now - lastFlightTimeRef.current) / 1000;

          // Check if both the distance and cooldown requirements are met
          if (
            accumulatedScrollRef.current >= BIRD_CONFIG.scrollThresholdPx &&
            timeSinceLast >= BIRD_CONFIG.cooldownSeconds
          ) {
            triggerFlight();
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (flightTimerRef.current) {
        clearTimeout(flightTimerRef.current);
      }
    };
  }, [reducedMotion, triggerFlight]);

  // If user requested reduced motion or bird is idle, render nothing
  if (reducedMotion || !isFlying || !flightCoords) {
    return null;
  }

  // Calculate position transform: from start to end coordinates
  const currentX = inMotion ? flightCoords.endX : flightCoords.startX;
  const currentY = inMotion ? flightCoords.endY : flightCoords.startY;

  return (
    <div
      id="home-flying-bird"
      className="flying-bird-wrapper"
      style={{
        transform: `translate3d(${currentX}px, ${currentY}px, 0) rotate(${flightCoords.rotationDeg}deg)`,
        transition: inMotion
          ? `transform ${BIRD_CONFIG.flightDurationMs}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
          : 'none',
        opacity: inMotion ? 1 : 0,
      }}
      aria-hidden="true"
    >
      {/* Secondary bobbing container for sinusoidal wave undulation */}
      <div className="flying-bird-bob">
        <div
          className="relative"
          style={{
            width: typeof window !== 'undefined' && window.innerWidth < 480 
              ? `${BIRD_CONFIG.sizeMobilePx}px` 
              : `${BIRD_CONFIG.sizeDesktopPx}px`,
            height: typeof window !== 'undefined' && window.innerWidth < 480 
              ? `${Math.round(BIRD_CONFIG.sizeMobilePx * 0.57)}px` 
              : `${Math.round(BIRD_CONFIG.sizeDesktopPx * 0.57)}px`,
          }}
        >
          {/* ==================================================================
              CUSTOM ASSET SWAP POINT:
              To replace this SVG with your own bird image or PNG sprite sheet:
              1. Uncomment the <img> tag below and comment out the <svg> element.
              2. Point src to your asset, e.g.: src="/assets/scarlet-macaw.png"
              ================================================================== */}
          {/* <img src="/assets/scarlet-macaw.png" alt="Scarlet Macaw" className="w-full h-full object-contain" /> */}

          {/* REALISTIC SCARLET MACAW PARROT (Ara macao) INLINE SVG */}
          <svg
            viewBox="0 0 150 85"
            className="w-full h-full drop-shadow-md overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Brilliant Scarlet Red Body, Crown & Mantle Gradient */}
              <linearGradient id="macawScarlet" x1="50" y1="20" x2="120" y2="65" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF2E36" />
                <stop offset="45%" stopColor="#E6121B" />
                <stop offset="85%" stopColor="#BA0A11" />
                <stop offset="100%" stopColor="#8A040A" />
              </linearGradient>

              {/* Radiant Golden Yellow Wing Covert Gradient */}
              <linearGradient id="macawYellow" x1="55" y1="25" x2="95" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF23B" />
                <stop offset="45%" stopColor="#FFD200" />
                <stop offset="100%" stopColor="#F5A300" />
              </linearGradient>

              {/* Royal Cerulean & Cobalt Blue Flight Feathers Gradient */}
              <linearGradient id="macawBlue" x1="20" y1="5" x2="85" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2979FF" />
                <stop offset="35%" stopColor="#1565C0" />
                <stop offset="75%" stopColor="#0D47A1" />
                <stop offset="100%" stopColor="#072A63" />
              </linearGradient>

              {/* Long Tail Gradient: Scarlet red base graduating into rich royal blue tips */}
              <linearGradient id="macawTail" x1="72" y1="52" x2="2" y2="68" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E6121B" />
                <stop offset="55%" stopColor="#D00D14" />
                <stop offset="78%" stopColor="#5E35B1" />
                <stop offset="100%" stopColor="#1565C0" />
              </linearGradient>

              {/* Arched Ivory / Horn Upper Beak Gradient */}
              <linearGradient id="macawBeak" x1="124" y1="36" x2="137" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="60%" stopColor="#F4EADB" />
                <stop offset="100%" stopColor="#D8C8B0" />
              </linearGradient>

              {/* Amber / Golden Iris Radial Gradient */}
              <radialGradient id="macawEye" cx="45%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#FFF59D" />
                <stop offset="60%" stopColor="#FBC02D" />
                <stop offset="100%" stopColor="#E65100" />
              </radialGradient>
            </defs>

            {/* AFT WING (Background Wing - Tri-Color Flight Feathers) */}
            <g
              style={{
                transformOrigin: '76px 44px',
                animation: `wingFlapUpper ${BIRD_CONFIG.wingFlapSpeedSec}s ease-in-out infinite alternate`,
              }}
            >
              {/* Primary Flight Feathers - High sweeping Cobalt Blue */}
              <path
                d="M72 40 C62 23 48 8 28 2 C26 1 25 4 27 6 C38 18 54 32 68 45 Z"
                fill="url(#macawBlue)"
                stroke="#092B60"
                strokeWidth="0.5"
              />
              <path
                d="M74 42 C66 27 54 13 38 7 C36 6 35 9 37 11 C47 21 59 34 70 46 Z"
                fill="url(#macawBlue)"
                stroke="#092B60"
                strokeWidth="0.5"
              />
              {/* Secondary tier - Golden Yellow covert band */}
              <path
                d="M76 43 C70 33 60 21 48 16 C46 15 45 18 47 20 C56 27 66 38 74 47 Z"
                fill="url(#macawYellow)"
                stroke="#D98200"
                strokeWidth="0.5"
              />
              {/* Covert base - Scarlet Red */}
              <path
                d="M78 44 C72 38 65 30 56 26 C60 33 70 41 76 46 Z"
                fill="url(#macawScarlet)"
              />
            </g>

            {/* LONG GRADUATED SCARLET-TO-BLUE TAIL (Iconic hallmark of the Macaw) */}
            <g
              style={{
                transformOrigin: '72px 52px',
                animation: 'macawTailWave 1.8s ease-in-out infinite alternate',
              }}
            >
              {/* Central Primary Streamers (Reaching far back with pointed tips) */}
              <path
                d="M72 50 C55 53 32 59 2 68 C0 69 1 70 4 70 C35 64 58 56 74 54 Z"
                fill="url(#macawTail)"
                stroke="#A8070E"
                strokeWidth="0.4"
              />
              <path
                d="M71 49 C56 51 35 56 6 65 C4 66 5 67 8 67 C37 62 59 54 73 52 Z"
                fill="url(#macawTail)"
              />
              {/* Tier 2 Graduated Tail Feather */}
              <path
                d="M70 48 C58 48 42 51 18 58 C16 59 17 60 20 60 C42 56 59 51 72 50 Z"
                fill="url(#macawTail)"
              />
              {/* Tier 3 Upper Tail Coverts (Scarlet red) */}
              <path
                d="M69 47 C60 46 48 47 32 52 C30 53 31 54 34 54 C48 51 60 48 70 48 Z"
                fill="#D00D14"
              />
              {/* Subtle feather shaft vein */}
              <path d="M72 51 C52 56 30 62 5 69" stroke="#FF5252" strokeWidth="0.4" opacity="0.6" />
            </g>

            {/* TUCKED ZYGODACTYL CLAWS (Dark slate claws held tight to belly) */}
            <g transform="translate(68, 62)">
              <ellipse cx="4" cy="2" rx="4" ry="1.6" fill="#374151" />
              <path d="M1 2 L-1 4 M4 2 L3 5 M7 2 L8 4" stroke="#1F2937" strokeWidth="0.8" strokeLinecap="round" />
            </g>

            {/* TORSO & BODY CORE */}
            {/* Vivid Cobalt Blue Lower Back & Rump */}
            <path
              d="M58 48 C66 44 76 43 82 43 C78 49 70 53 60 54 Z"
              fill="#1565C0"
              stroke="#0D47A1"
              strokeWidth="0.5"
            />

            {/* Scarlet Body, Mantle & Breast */}
            <path
              d="M56 50 C65 43 82 38 102 38 C116 38 124 43 126 48 C122 58 108 65 88 65 C70 65 58 58 56 50 Z"
              fill="url(#macawScarlet)"
            />

            {/* Plump Breast & Underbelly Shading */}
            <path
              d="M72 52 C84 54 100 56 114 49 C111 58 101 64 88 64 C76 64 71 58 72 52 Z"
              fill="#BA0A11"
            />

            {/* HEAD, CROWN & NAPE */}
            <path
              d="M104 38 C109 31 120 32 126 38 C128 42 125 46 118 47 C110 46 104 42 104 38 Z"
              fill="url(#macawScarlet)"
            />

            {/* BARE WHITE FACIAL SKIN PATCH (Distinctive white unfeathered mask around eye) */}
            <path
              d="M116 38 C122 38 126 41 127 45 C124 48 118 48 115 45 C114 42 115 39 116 38 Z"
              fill="#FBF9F5"
              stroke="#E8E2D5"
              strokeWidth="0.5"
            />
            {/* Delicate crimson facial feather tracks */}
            <path
              d="M117 41 Q121 42 125 43 M117 44 Q120 45 124 46"
              stroke="#D32F2F"
              strokeWidth="0.4"
              strokeOpacity="0.75"
            />

            {/* GOLDEN-AMBER EYE */}
            {/* Eye Ring */}
            <circle cx="120" cy="42" r="2.6" fill="#FFF9C4" />
            {/* Golden Amber Iris */}
            <circle cx="120" cy="42" r="2.0" fill="url(#macawEye)" />
            {/* Pupil */}
            <circle cx="120" cy="42" r="1.0" fill="#0F0F12" />
            {/* Specular White Spark */}
            <circle cx="120.6" cy="41.5" r="0.45" fill="#FFFFFF" />

            {/* CHARACTERISTIC HOOKED PARROT BEAK */}
            {/* Ivory Curved Upper Mandible */}
            <path
              d="M125 39 C130 39 135 42 136 47 C135 48 132 48 129 46 C126 46 125 45 125 44 Z"
              fill="url(#macawBeak)"
              stroke="#D5C7B0"
              strokeWidth="0.4"
            />
            {/* Black Tip of Upper Beak */}
            <path
              d="M133 45 C135 46 136 47 136 47 C135 48 133 47.5 132 46.5 Z"
              fill="#1A1A1A"
            />
            {/* Black basal cutting mark */}
            <path
              d="M125 44 L128 45 L125 46 Z"
              fill="#1E1E1E"
            />
            {/* Scoop-shaped Charcoal Lower Mandible */}
            <path
              d="M125 46 C128 47 130 47 131 46 C130 49 127 50 124 49 Z"
              fill="#1E1E22"
            />

            {/* FORE WING (Foreground Wing - Stunning Tri-Color: Scarlet -> Yellow -> Cobalt) */}
            <g
              style={{
                transformOrigin: '82px 46px',
                animation: `wingFlapLower ${BIRD_CONFIG.wingFlapSpeedSec}s ease-in-out infinite alternate`,
              }}
            >
              {/* Primary Flight Feathers - Long Sweeping Royal/Cobalt Blue */}
              <path
                d="M78 44 C68 26 50 8 30 1 C28 0 27 3 29 6 C42 18 60 34 75 48 Z"
                fill="url(#macawBlue)"
                stroke="#092B60"
                strokeWidth="0.5"
              />
              <path
                d="M80 45 C71 29 55 14 38 8 C36 7 35 10 37 12 C49 23 64 37 77 49 Z"
                fill="url(#macawBlue)"
                stroke="#0D3B82"
                strokeWidth="0.5"
              />
              <path
                d="M82 46 C74 33 60 20 46 15 C44 14 43 17 45 19 C56 28 69 40 79 50 Z"
                fill="url(#macawBlue)"
                stroke="#10499C"
                strokeWidth="0.5"
              />

              {/* Greater Covert Band - Cerulean / Turquoise Edge */}
              <path
                d="M83 46 C76 36 65 26 54 23 C52 22 51 25 53 27 C62 33 73 42 81 51 Z"
                fill="#0288D1"
                stroke="#01579B"
                strokeWidth="0.4"
              />

              {/* Median Wing Coverts - Radiant Golden Yellow Band */}
              <path
                d="M84 45 C78 37 68 29 58 26 C62 33 74 42 82 48 Z"
                fill="url(#macawYellow)"
              />
              {/* Emerald Green Feather Tipping on Yellow Coverts */}
              <path
                d="M82 48 C76 43 68 36 60 33 C64 37 73 44 80 49 Z"
                fill="#2E9E48"
                opacity="0.85"
              />

              {/* Lesser Coverts & Shoulder - Brilliant Scarlet Red */}
              <path
                d="M85 45 C79 39 72 34 64 32 C68 38 78 44 84 47 Z"
                fill="url(#macawScarlet)"
              />
              <path
                d="M86 44 C81 40 76 37 70 35 C73 39 80 44 85 46 Z"
                fill="#FF333B"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
