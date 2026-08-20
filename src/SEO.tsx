import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
}

const SITE_URL = 'https://yourdomain.com';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
}) => {
  useEffect(() => {
    document.title = title;

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

    setMeta('description', description);

    const url =
      canonical ||
      `${SITE_URL}${window.location.pathname}`;

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

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

    return () => {
      document.title =
        'Power BI Dashboard Templates';
    };
  }, [title, description, canonical, type]);

  return null;
};
