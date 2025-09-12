'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics configuration
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Type declarations are in src/types/google-analytics.d.ts

interface GoogleAnalyticsProps {
  gaId?: string;
}

export function GoogleAnalytics({ gaId = GA_ID }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!gaId || gaId === 'your_google_analytics_id') {
      console.warn('Google Analytics ID not configured or is placeholder');
      return;
    }

    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Configure gtag
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    // Set initial configuration with optimized settings
    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      // Enhanced e-commerce settings
      send_page_view: false, // We'll manually track page views with enhanced data
      // Privacy settings - GDPR compliant
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      // Performance settings
      transport_type: 'beacon',
      sample_rate: 100, // Track 100% of users for landing page analysis
      site_speed_sample_rate: 10, // Track site speed for 10% of users
      // Cookie settings
      cookie_flags: 'SameSite=Strict;Secure',
      cookie_expires: 60 * 60 * 24 * 30, // 30 days
    });

    // Track initial page view
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [gaId]);

  // Don't render scripts if GA_ID is not configured or is placeholder
  if (!gaId || gaId === 'your_google_analytics_id') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        onLoad={() => {
          console.log('Google Analytics script loaded successfully');
        }}
        onError={(error) => {
          console.error('Failed to load Google Analytics:', error);
        }}
      />
    </>
  );
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ID && GA_ID !== 'your_google_analytics_id') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...parameters,
    });
  }
};

// Specific tracking functions for NeurAnt Landing Page
export const trackWaitlistStep = (stepName: string, stepNumber: number) => {
  trackEvent('form_step_completed', {
    event_category: 'waitlist_form',
    step_name: stepName,
    step_number: stepNumber,
  });
};

export const trackWaitlistSubmission = (formData: {
  companySize: string;
  chatbotType: string;
  country: string;
  industryId?: string;
}) => {
  trackEvent('form_submitted', {
    event_category: 'conversion',
    form_name: 'waitlist',
    company_size: formData.companySize,
    chatbot_type: formData.chatbotType,
    country: formData.country,
    industry: formData.industryId,
    value: 100, // Assign conversion value
  });
};

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    cta_name: ctaName,
    cta_location: location,
  });
};

export const trackPageScroll = (scrollDepth: number) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    scroll_depth: scrollDepth,
  });
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    section_name: sectionName,
  });
};

// Enhanced e-commerce tracking for lead qualification
export const trackLeadQualification = (leadData: {
  leadScore?: number;
  companySize: string;
  industry?: string;
  country: string;
}) => {
  trackEvent('lead_qualification', {
    event_category: 'conversion',
    lead_score: leadData.leadScore || 50,
    company_size: leadData.companySize,
    industry: leadData.industry,
    country: leadData.country,
  });
};