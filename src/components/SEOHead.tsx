import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { siteSEOConfig, primaryKeywordsString } from '../seoConfig';
import { projectsData, blogPostsData } from '../data';

export default function SEOHead() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    let title = siteSEOConfig.home.title;
    let description = siteSEOConfig.home.description;
    let keywords = siteSEOConfig.home.keywords;
    let canonical = `https://aurumproperties.in${pathname}`;

    if (pathname === '/') {
      title = siteSEOConfig.home.title;
      description = siteSEOConfig.home.description;
      keywords = siteSEOConfig.home.keywords;
    } else if (pathname === '/projects') {
      title = siteSEOConfig.projects.title;
      description = siteSEOConfig.projects.description;
      keywords = siteSEOConfig.projects.keywords;
    } else if (pathname.startsWith('/projects/')) {
      const projectId = pathname.replace('/projects/', '');
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        // e.g. "Aurum Green Valley | Plots for Sale in Chennai" (48 chars)
        const cityKeyword = project.city.toLowerCase() === 'chennai' ? 'in Chennai' : `in ${project.city}, TN`;
        title = `${project.name} | Plots for Sale ${cityKeyword}`.slice(0, 60);
        // Approx 150-155 chars
        const approvalText = project.dtcpApproved ? 'DTCP approved' : 'legally verified clear-title';
        description = `Explore ${approvalText} property at ${project.name}, ${project.location}. Premium gated community land with clear documentation.`.slice(0, 160);
        keywords = `${project.name}, plots for sale in ${project.city.toLowerCase()}, residential plots for sale, gated community villa plots for sale, cmda approved plots for sale, low budget land for sale, Aurum Properties`;
      } else {
        title = siteSEOConfig.projects.title;
        description = siteSEOConfig.projects.description;
        keywords = siteSEOConfig.projects.keywords;
      }
    } else if (pathname === '/about') {
      title = siteSEOConfig.about.title;
      description = siteSEOConfig.about.description;
      keywords = siteSEOConfig.about.keywords;
    } else if (pathname === '/build-assist') {
      title = siteSEOConfig.buildAssist.title;
      description = siteSEOConfig.buildAssist.description;
      keywords = siteSEOConfig.buildAssist.keywords;
    } else if (pathname === '/blogs') {
      title = siteSEOConfig.blogs.title;
      description = siteSEOConfig.blogs.description;
      keywords = siteSEOConfig.blogs.keywords;
    } else if (pathname.startsWith('/blogs/')) {
      const blogId = pathname.replace('/blogs/', '');
      const blog = blogPostsData.find(b => b.id === blogId);
      if (blog) {
        // Truncated title to ~55 chars
        title = `${blog.title.slice(0, 36)}... | Aurum Insights`;
        // Excerpt ~150-155 chars
        description = `${blog.excerpt.slice(0, 140)}... Expert tips from Aurum Properties.`;
        keywords = `${blog.title.toLowerCase()}, plots for sale in chennai, residential plots for sale, property developers Tamil Nadu, Aurum Properties`;
      } else {
        title = siteSEOConfig.blogs.title;
        description = siteSEOConfig.blogs.description;
        keywords = siteSEOConfig.blogs.keywords;
      }
    } else if (pathname === '/contact') {
      title = siteSEOConfig.contact.title;
      description = siteSEOConfig.contact.description;
      keywords = siteSEOConfig.contact.keywords;
    } else if (pathname === '/privacy') {
      title = siteSEOConfig.privacy.title;
      description = siteSEOConfig.privacy.description;
      keywords = siteSEOConfig.privacy.keywords;
    } else if (pathname === '/terms') {
      title = siteSEOConfig.terms.title;
      description = siteSEOConfig.terms.description;
      keywords = siteSEOConfig.terms.keywords;
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create meta tags
    const setMetaTag = (nameAttr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Set Standard and Open Graph / Twitter Meta Tags
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 4. Update or create Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

  }, [pathname]);

  return null;
}
