import Head from 'next/head';

const SEO = ({
  title = 'Zero Earth - Let every carbon tell a good story',
  description = 'Transform your environmental impact into compelling narratives. Track, verify, and share your carbon journey with transparency and innovation.',
  keywords = 'carbon tracking, sustainability, blockchain verification, environmental impact, carbon accounting, climate tech',
  author = 'Zero Earth',
  url = 'https://zeroearth.com',
  image = '/assets/images/og-image.jpg',
  type = 'website',
  twitterCard = 'summary_large_image',
  locale = 'en_US',
  siteName = 'Zero Earth'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zero Earth",
    "description": description,
    "url": url,
    "logo": `${url}/assets/logos/logo-colored.png`,
    "sameAs": [
      "https://twitter.com/zeroearth",
      "https://linkedin.com/company/zeroearth",
      "https://github.com/zeroearth"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "hello@zeroearth.com"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Sarah Chen",
        "jobTitle": "CEO & Co-Founder"
      },
      {
        "@type": "Person", 
        "name": "Marcus Rodriguez",
        "jobTitle": "CTO & Co-Founder"
      }
    ],
    "industry": "Environmental Technology",
    "keywords": keywords
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@zeroearth" />
      <meta name="twitter:creator" content="@zeroearth" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#16a34a" />
      <meta name="msapplication-TileColor" content="#16a34a" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      
      {/* Additional Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
    </Head>
  );
};

export default SEO;