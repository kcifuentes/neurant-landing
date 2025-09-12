'use client';

import { useEffect } from 'react';
import { trackPageScroll, trackSectionView } from '@/components/analytics/google-analytics';

// Track scroll depth and section views
export function ScrollTracker() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollDepth = 0;
    const scrollDepthThresholds = [25, 50, 75, 90, 100];
    const trackedSections = new Set<string>();

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

        // Track scroll depth milestones
        for (const threshold of scrollDepthThresholds) {
          if (scrollPercent >= threshold && lastScrollDepth < threshold) {
            trackPageScroll(threshold);
            lastScrollDepth = threshold;
            break;
          }
        }

        // Track section views using Intersection Observer alternative
        const sections = ['hero', 'features', 'integrations', 'use-cases', 'momentum', 'waitlist'];
        
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element && !trackedSections.has(sectionId)) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            
            // Element is visible if any part is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
              trackSectionView(sectionId);
              trackedSections.add(sectionId);
            }
          }
        });
      }, 150); // Throttle scroll events
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check for sections in viewport
    setTimeout(handleScroll, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null; // This component doesn't render anything
}

// Enhanced scroll tracking with Intersection Observer for better performance
export function EnhancedScrollTracker() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollDepth = 0;
    const scrollDepthThresholds = [25, 50, 75, 90, 100];

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

        for (const threshold of scrollDepthThresholds) {
          if (scrollPercent >= threshold && lastScrollDepth < threshold) {
            trackPageScroll(threshold);
            lastScrollDepth = threshold;
            break;
          }
        }
      }, 150);
    };

    // Intersection Observer for section tracking
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% of element is visible
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before element fully enters viewport
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id || 'unnamed_section';
          trackSectionView(sectionName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all main sections
    const sections = ['hero', 'features', 'integrations', 'use-cases', 'momentum', 'waitlist'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
}