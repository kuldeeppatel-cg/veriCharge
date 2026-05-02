import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Set Document Title
    document.title = title ? `${title} | VeriCharge` : 'VeriCharge - Smart EV Charging Network';
    
    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Find, navigate, and manage EV charging seamlessly with VeriCharge.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = description || 'Find, navigate, and manage EV charging seamlessly with VeriCharge.';
      document.head.appendChild(metaDescription);
    }

    // Set Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const defaultKeywords = "EV charging, electric vehicle, EV map, charge points, Tesla Supercharger, EV navigation";
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || defaultKeywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = keywords || defaultKeywords;
      document.head.appendChild(metaKeywords);
    }

    // Open Graph / Social Media tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription.content);

  }, [title, description, keywords]);

  return null;
}
