"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}