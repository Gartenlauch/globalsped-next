"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollHandler() {
  const pathname = usePathname();

  const scrollToHash = () => {
    const hash = window.location.hash;
    if (!hash) return;

    const element = document.querySelector(hash);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const timeout = window.setTimeout(scrollToHash, 80);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}