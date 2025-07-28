'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Analytics configuration
const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  
  // Google Tag Manager
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  
  // Other analytics services
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
  MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  
  // Enable/disable in development
  ENABLED: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true'
};

// Google Analytics functions
const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

const pageview = (url) => {
  if (!ANALYTICS_CONFIG.ENABLED) return;
  
  gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
    page_location: url,
  });
};

const event = ({ action, category, label, value }) => {
  if (!ANALYTICS_CONFIG.ENABLED) return;
  
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom analytics tracking
const analytics = {
  // Page tracking
  page: (pageName, properties = {}) => {
    if (!ANALYTICS_CONFIG.ENABLED) return;
    
    // Google Analytics
    pageview(window.location.pathname + window.location.search);
    
    // Custom analytics logic
    console.log('Page view:', pageName, properties);
  },

  // Event tracking
  track: (eventName, properties = {}) => {
    if (!ANALYTICS_CONFIG.ENABLED) return;
    
    // Google Analytics
    event({
      action: eventName,
      category: properties.category || 'General',
      label: properties.label,
      value: properties.value
    });
    
    // Custom event logic
    console.log('Event tracked:', eventName, properties);
  },

  // User identification
  identify: (userId, traits = {}) => {
    if (!ANALYTICS_CONFIG.ENABLED) return;
    
    gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      user_id: userId,
      custom_map: traits
    });
    
    console.log('User identified:', userId, traits);
  },

  // Section interactions
  trackSectionView: (sectionName) => {
    analytics.track('Section Viewed', {
      category: 'Navigation',
      label: sectionName,
      section: sectionName
    });
  },

  // Form interactions
  trackFormStart: (formName) => {
    analytics.track('Form Started', {
      category: 'Form',
      label: formName,
      form_name: formName
    });
  },

  trackFormSubmit: (formName, success = true) => {
    analytics.track('Form Submitted', {
      category: 'Form',
      label: formName,
      form_name: formName,
      success: success
    });
  },

  // Button clicks
  trackButtonClick: (buttonName, location) => {
    analytics.track('Button Clicked', {
      category: 'Interaction',
      label: buttonName,
      button_name: buttonName,
      button_location: location
    });
  },

  // Download tracking
  trackDownload: (fileName, fileType) => {
    analytics.track('File Downloaded', {
      category: 'Download',
      label: fileName,
      file_name: fileName,
      file_type: fileType
    });
  },

  // External link clicks
  trackExternalLink: (url, linkText) => {
    analytics.track('External Link Clicked', {
      category: 'Outbound',
      label: url,
      link_url: url,
      link_text: linkText
    });
  }
};

// Main Analytics component
const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams ? '?' + searchParams.toString() : '');
      analytics.page(pathname, { path: url });
    }
  }, [pathname, searchParams]);

  // Load analytics scripts
  useEffect(() => {
    if (!ANALYTICS_CONFIG.ENABLED) return;

    // Google Analytics 4
    if (ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
        page_location: window.location.href,
        page_title: document.title
      });
    }

    // Google Tag Manager
    if (ANALYTICS_CONFIG.GTM_ID) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_ID}');
      `;
      document.head.appendChild(script);
    }

    // Hotjar
    if (ANALYTICS_CONFIG.HOTJAR_ID) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${ANALYTICS_CONFIG.HOTJAR_ID},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      document.head.appendChild(script);
    }

  }, []);

  return null; // This component doesn't render anything
};

// Export both the component and analytics functions
export default Analytics;
export { analytics };

// Utility hook for tracking
export const useAnalytics = () => {
  return analytics;
}; 