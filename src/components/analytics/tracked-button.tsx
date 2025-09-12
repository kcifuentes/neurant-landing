'use client';

import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/components/analytics/google-analytics";
import { forwardRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface TrackedButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // Analytics props
  trackingName?: string;
  trackingLocation?: string;
  trackingCategory?: string;
  // Auto-detect tracking from children or aria-label
  autoTrack?: boolean;
}

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  (
    {
      onClick,
      trackingName,
      trackingLocation,
      autoTrack = true,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Execute original onClick first
      if (onClick) {
        onClick(e);
      }

      // Track the click
      if (autoTrack) {
        const buttonText = trackingName || 
          (typeof children === 'string' ? children : '') ||
          props['aria-label'] ||
          'button_click';

        const location = trackingLocation || 
          window.location.pathname || 
          'unknown';

        trackCTAClick(buttonText, location);
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

TrackedButton.displayName = "TrackedButton";