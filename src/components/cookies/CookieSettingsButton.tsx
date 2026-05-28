"use client";

import * as CookieConsent from "vanilla-cookieconsent";

type Props = {
  label: string;
  className?: string;
};

export function CookieSettingsButton({ label, className }: Props) {
  return (
    <button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      className={className}
    >
      {label}
    </button>
  );
}