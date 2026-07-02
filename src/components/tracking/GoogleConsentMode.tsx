"use client";

import { useEffect } from "react";

import { initializeGoogleConsentMode } from "@/lib/tracking/google";

export function GoogleConsentMode() {
  useEffect(() => {
    initializeGoogleConsentMode();
  }, []);

  return null;
}
