import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const siteUrl = 'https://www.advocamed.com';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Array of JSON-LD schemas
  const jsonLdSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AdvocaMed.ai",
      "url": siteUrl,
      "description": "AI-powered medical bill analysis tool helping patients find billing errors and apply for charity care.",
      "applicationCategory": "MedicalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": "Medical Bill Analysis, CPT Code Check, Charity Care Calculator, Appeal Letter Generation",
      "author": {
        "@type": "Organization",
        "name": "AdvocaMed"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "url": fullUrl,
      "reviewedBy": {
        "@type": "Person",
        "name": "Alex Chen",
        "jobTitle": "Lead Biotech Architect & Clinical Informatics Specialist",
        "url": "https://www.advocamed.com/about",
        "sameAs": [
           "https://www.linkedin.com/in/alexc"
        ]
      },
      "lastReviewed": new Date().toISOString().split('T')[0],
      "audience": {
        "@type": "Patients",
        "audienceType": "Patients seeking financial assistance and medical billing transparency."
      }
    }
  ];

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title} | AdvocaMed.ai</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="AdvocaMed.ai" />
      {/* Ensure you have an og-image.png in your public folder */}
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      {jsonLdSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
