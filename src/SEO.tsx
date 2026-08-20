import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
}

const SITE_URL = 'https://power-bi-dashboard-templates.vercel.app';
const SITE_NAME = 'Power BI Dashboard Templates';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
}) => {
  useEffect(() => {
    // =========================================
    // PAGE TITLE
    // =========================================
    document.title = title;

    // =========================================
    // META TAG HELPER
    // =========================================
    const setMeta = (
      name: string,
      content: string,
      attribute: 'name' | 'property' = 'name'
    ) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // =========================================
    // CANONICAL URL
    // =========================================
    const currentPath =
      window.location.pathname === '/'
        ? ''
        : window.location.pathname;

    const url =
      canonical || `${SITE_URL}${currentPath}`;

    // =========================================
    // BASIC SEO
    // =========================================
    setMeta('description', description);

    setMeta(
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // =========================================
    // OPEN GRAPH
    // =========================================
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:image', image, 'property');

    // =========================================
    // TWITTER / X
    // =========================================
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // =========================================
    // CANONICAL LINK
    // =========================================
    let canonicalElement =
      document.head.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }

    canonicalElement.href = url;

    // =========================================
    // STRUCTURED DATA
    // =========================================
    let schemaElement = document.getElementById(
      'seo-schema'
    ) as HTMLScriptElement | null;

    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'seo-schema';
      schemaElement.type = 'application/ld+json';
      document.head.appendChild(schemaElement);
    }

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'Professional Power BI dashboard templates for sales, finance, HR, ecommerce, DAX and business analytics.',
    };

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      url: url,
      image: [image],
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    };

    schemaElement.textContent = JSON.stringify(
      type === 'article'
        ? articleSchema
        : websiteSchema
    );

    // =========================================
    // CLEANUP
    // =========================================
    return () => {
      document.title = SITE_NAME;
    };
  }, [
    title,
    description,
    canonical,
    type,
    image,
  ]);

  return null;
};
