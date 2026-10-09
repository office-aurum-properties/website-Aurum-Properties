import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Trust reverse proxy (for rate limiting IP checks)
app.set('trust proxy', 1);

// Disable X-Powered-By header to prevent fingerprinting
app.disable('x-powered-by');

// Simple In-Memory Rate Limiter to protect against DDoS / Bot spam
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 300; // max requests per IP in 15 mins

// Clean up expired rate limiter IPs every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      requestCounts.delete(ip);
    }
  }
}, 10 * 60 * 1000);

const rateLimiter = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, startTime: now });
  } else {
    const data = requestCounts.get(ip);
    if (now - data.startTime < RATE_LIMIT_WINDOW_MS) {
      data.count += 1;
      if (data.count > MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          error: 'Too many requests from this IP, please try again after 15 minutes.'
        });
      }
    } else {
      requestCounts.set(ip, { count: 1, startTime: now });
    }
  }
  next();
};

app.use(rateLimiter);

// Comprehensive Security Headers Middleware
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Protect against clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Cross-Site Scripting Filter
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Strict Transport Security (HSTS)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy (CSP)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https:; " +
    "connect-src 'self' https:; " +
    "frame-ancestors 'self';"
  );

  next();
});

// Serve static assets with Gzip support and immutable Caching
const distPath = path.join(__dirname, 'dist');

// Static assets caching (CSS, JS, Images, WebP, SVG)
app.use('/assets', express.static(path.join(distPath, 'assets'), {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    if (filePath.endsWith('.webp') || filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Serve other root static files (favicon, metadata, etc.)
app.use(express.static(distPath, {
  maxAge: '1h'
}));

// Dedicated Brochure Download Endpoints with explicit headers
app.get(['/Aurum-Sre-Nagar-Extension-Brochure.pdf', '/download/brochure'], (req, res) => {
  const distPdf = path.join(distPath, 'Aurum-Sre-Nagar-Extension-Brochure.pdf');
  const publicPdf = path.join(__dirname, 'public', 'Aurum-Sre-Nagar-Extension-Brochure.pdf');
  const targetPdf = fs.existsSync(distPdf) ? distPdf : (fs.existsSync(publicPdf) ? publicPdf : null);

  if (targetPdf) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Aurum-Sre-Nagar-Extension-Brochure.pdf"');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(targetPdf);
  }
  res.status(404).send('Brochure file not found');
});

// Sitemaps & SEO files with canonical Content-Type
app.get('/sitemap.xml', (req, res) => {
  const distSitemap = path.join(distPath, 'sitemap.xml');
  const publicSitemap = path.join(__dirname, 'public', 'sitemap.xml');
  const target = fs.existsSync(distSitemap) ? distSitemap : publicSitemap;
  res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(target);
});

app.get('/robots.txt', (req, res) => {
  const distRobots = path.join(distPath, 'robots.txt');
  const publicRobots = path.join(__dirname, 'public', 'robots.txt');
  const target = fs.existsSync(distRobots) ? distRobots : publicRobots;
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(target);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Single Page Application (SPA) Fallback
app.get('*', (req, res) => {
  // If request is for a missing file with an extension (e.g. .jpg, .css, .js), return 404
  if (path.extname(req.path) && !req.path.endsWith('.html')) {
    return res.status(404).send('Asset not found');
  }

  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Production build not found. Please run `npm run build` first.');
  }
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Aurum Properties secure server running on http://0.0.0.0:${PORT}`);
});
