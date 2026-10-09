// Ultra-fast route preloading engine
// Downloads and caches code chunks in memory during idle time and on hover

const loaders: Record<string, () => Promise<unknown>> = {
  about: () => import('../components/About'),
  projects: () => import('../components/ProjectsListing'),
  'project-detail': () => import('../components/ProjectDetail'),
  'build-assist': () => import('../components/BuildAssist'),
  blogs: () => import('../components/Blogs'),
  'blog-detail': () => import('../components/BlogDetail'),
  contact: () => import('../components/ContactSection'),
  privacy: () => import('../components/LegalDocs'),
  terms: () => import('../components/LegalDocs'),
  legal: () => import('../components/LegalDocs'),
};

const preloadedCache = new Set<string>();

/**
 * Preload a single route on-demand (e.g. mouse hover or touch start)
 */
export function preloadRoute(routeId: string): void {
  const normalized = routeId.replace(/^\//, '').split('/')[0] || 'home';
  if (preloadedCache.has(normalized)) return;

  const loader = loaders[normalized];
  if (loader) {
    preloadedCache.add(normalized);
    loader().catch(() => {
      // Allow retry if failed
      preloadedCache.delete(normalized);
    });
  }
}

/**
 * Idle background prefetcher: preloads all remaining routes when browser is idle
 */
export function initIdleRoutePrefetch(): () => void {
  if (typeof window === 'undefined') return () => {};

  const routesToPrefetch = ['projects', 'about', 'contact', 'blogs', 'build-assist', 'project-detail', 'privacy'];
  let timerId: any = null;

  const runIdle = () => {
    let index = 0;
    const prefetchNext = () => {
      if (index >= routesToPrefetch.length) return;
      const route = routesToPrefetch[index++];
      preloadRoute(route);
      // Small 150ms gap between chunk downloads to prevent bandwidth contention
      timerId = setTimeout(prefetchNext, 150);
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => prefetchNext(), { timeout: 2500 });
    } else {
      timerId = setTimeout(prefetchNext, 800);
    }
  };

  // Wait 1s after initial mount before starting idle prefetch
  const initialTimer = setTimeout(runIdle, 1000);

  return () => {
    clearTimeout(initialTimer);
    if (timerId) clearTimeout(timerId);
  };
}
