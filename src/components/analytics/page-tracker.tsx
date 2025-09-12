'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/components/analytics/google-analytics';
import { Suspense } from 'react';

// Internal component that uses useSearchParams
function PageTrackerInternal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Extract UTM parameters and referral data
    const utmSource = searchParams?.get('utm_source');
    const utmMedium = searchParams?.get('utm_medium');
    const utmCampaign = searchParams?.get('utm_campaign');
    const utmTerm = searchParams?.get('utm_term');
    const utmContent = searchParams?.get('utm_content');
    const referrer = document.referrer;

    // Enhanced page view tracking
    const pageViewData: Record<string, unknown> = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    };

    // Add UTM parameters if available
    if (utmSource) pageViewData.utm_source = utmSource;
    if (utmMedium) pageViewData.utm_medium = utmMedium;
    if (utmCampaign) pageViewData.utm_campaign = utmCampaign;
    if (utmTerm) pageViewData.utm_term = utmTerm;
    if (utmContent) pageViewData.utm_content = utmContent;
    if (referrer) pageViewData.referrer = referrer;

    // Detect page type for enhanced tracking
    let pageType = 'general';
    if (pathname === '/') {
      pageType = 'home';
    } else if (pathname.includes('pymes') || pathname.includes('empresas')) {
      pageType = 'landing_page';
    } else if (pathname.includes('whatsapp')) {
      pageType = 'feature_page';
    } else if (pathname.includes('confirmed')) {
      pageType = 'confirmation';
    }

    pageViewData.page_type = pageType;

    // Track enhanced page view
    trackEvent('enhanced_page_view', pageViewData);

    // Track specific page types with custom events
    if (pageType === 'landing_page') {
      trackEvent('landing_page_view', {
        landing_page_path: pathname,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });
    }

    // Track session data on home page load
    if (pageType === 'home') {
      const sessionData = {
        session_start: true,
        user_agent: navigator.userAgent,
        language: navigator.language,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      trackEvent('session_start', sessionData);
    }

    // Track return visits
    const lastVisit = localStorage.getItem('neurant_last_visit');
    const currentTime = Date.now();
    
    if (lastVisit) {
      const daysSinceLastVisit = Math.floor((currentTime - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
      
      trackEvent('return_visit', {
        days_since_last_visit: daysSinceLastVisit,
        returning_visitor: true,
      });
    } else {
      trackEvent('first_visit', {
        new_visitor: true,
      });
    }
    
    localStorage.setItem('neurant_last_visit', currentTime.toString());

    // Track time spent on page (on page unload)
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('page_engagement', {
        time_on_page: timeSpent,
        page_path: pathname,
        page_type: pageType,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, searchParams]);

  return null;
}

// Enhanced page tracking with custom dimensions wrapped in Suspense
export function PageTracker() {
  return (
    <Suspense fallback={null}>
      <PageTrackerInternal />
    </Suspense>
  );
}

// Device and context tracking
export function DeviceTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect device capabilities and context
    const deviceData = {
      is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      is_tablet: /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
      connection_type: (navigator as { connection?: { effectiveType?: string } }).connection?.effectiveType || 'unknown',
      device_memory: (navigator as { deviceMemory?: number }).deviceMemory || 'unknown',
      hardware_concurrency: navigator.hardwareConcurrency || 'unknown',
      cookie_enabled: navigator.cookieEnabled,
      do_not_track: navigator.doNotTrack === '1',
    };

    trackEvent('device_context', deviceData);

    // Track page visibility changes
    const handleVisibilityChange = () => {
      trackEvent('page_visibility', {
        is_visible: !document.hidden,
        visibility_state: document.visibilityState,
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}