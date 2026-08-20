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

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  image = `${SITE_URL}/og-image.png`,
}) => {
  useEffect(() => {
    // -----------------------------------------
    // PAGE TITLE
    // -----------------------------------------
    document.title = title;

    // -----------------------------------------
    // META TAG HELPER
    // -----------------------------------------
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

    // -----------------------------------------
    // CANONICAL URL
    // -----------------------------------------
    const url =
      canonical ||
      `${SITE_URL}${window.location.pathname === '/'
        ? ''
        : window.location.pathname}`;

    // -----------------------------------------
    // BASIC SEO
    // -----------------------------------------
    setMeta('description', description);
    setMeta('robots', 'index, follow');

    // -----------------------------------------
    // GOOGLE / SEARCH ENGINE
    // -----------------------------------------
    setMeta(
      'keywords',
      'Power BI dashboard templates, Power BI templates, Power BI dashboards, Power BI DAX, Power BI finance dashboard, Power BI sales dashboard, Power BI HR dashboard, Power BI ecommerce dashboard'
    );

    // -----------------------------------------
    // OPEN GRAPH
    // -----------------------------------------
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:image', image, 'property');

    // -----------------------------------------
    // TWITTER / X
    // -----------------------------------------
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // -----------------------------------------
    // CANONICAL
    // -----------------------------------------
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

    // -----------------------------------------
    // JSON-LD STRUCTURED DATA
    // -----------------------------------------
    let schemaElement = document.getElementById(
      'website-schema'
    ) as HTMLScriptElement | null;

    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'website-schema';
      schemaElement.type = 'application/ld+json';
      document.head.appendChild(schemaElement);
    }

    schemaElement.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'Professional Power BI dashboard templates for sales, finance, HR, ecommerce, DAX and business analytics.',
    });

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------
    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, canonical, type, image]);

  return null;
};
