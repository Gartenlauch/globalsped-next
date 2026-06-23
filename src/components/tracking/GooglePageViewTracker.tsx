"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/tracking/google";

function GooglePageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    trackPageView(path);
  }, [pathname, searchParams]);

  return null;
}

export function GooglePageViewTracker() {
  return (
    <Suspense fallback={null}>
      <GooglePageViewTrackerInner />
    </Suspense>
  );
}