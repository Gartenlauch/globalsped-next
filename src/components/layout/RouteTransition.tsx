"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./RouteTransition.module.css";

type RouteTransitionProps = {
  children: ReactNode;
};

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  return (
    <main key={pathname} className={styles.routeTransition}>
      {children}
    </main>
  );
}