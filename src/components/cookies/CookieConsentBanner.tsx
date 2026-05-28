"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

import { getCookieConsentContent } from "@/content/cookies";

type Props = {
    locale: string;
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

function updateGoogleConsent(consent: {
    analytics: boolean;
    marketing: boolean;
}) {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    window.gtag =
        window.gtag ||
        function gtag() {
            window.dataLayer?.push(arguments);
        };

    window.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
    });
}

export function CookieConsentBanner({ locale }: Props) {
    const t = getCookieConsentContent(locale);

    useEffect(() => {
        CookieConsent.run({
            guiOptions: {
                consentModal: {
                    layout: "box wide",
                    position: "middle center",
                    equalWeightButtons: true,
                    flipButtons: false,
                },
                preferencesModal: {
                    layout: "box wide",
                    position: "middle center",
                    equalWeightButtons: true,
                    flipButtons: false,
                },
            },

            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true,
                },
                analytics: {
                    enabled: false,
                    readOnly: false,
                },
                marketing: {
                    enabled: false,
                    readOnly: false,
                },
            },

            language: {
                default: "de",
                translations: {
                    de: {
                        consentModal: {
                            title: t.modal.title,
                            description: t.modal.description,
                            acceptAllBtn: t.modal.acceptAll,
                            acceptNecessaryBtn: t.modal.acceptNecessary,
                            showPreferencesBtn: t.modal.manage,
                        },
                        preferencesModal: {
                            title: t.preferences.title,
                            acceptAllBtn: t.preferences.acceptAll,
                            acceptNecessaryBtn: t.preferences.acceptNecessary,
                            savePreferencesBtn: t.preferences.save,
                            closeIconLabel: t.preferences.close,
                            sections: [
                                {
                                    title: t.preferences.sections.intro.title,
                                    description: t.preferences.sections.intro.description,
                                },
                                {
                                    title: t.preferences.sections.necessary.title,
                                    description: t.preferences.sections.necessary.description,
                                    linkedCategory: "necessary",
                                },
                                {
                                    title: t.preferences.sections.analytics.title,
                                    description: t.preferences.sections.analytics.description,
                                    linkedCategory: "analytics",
                                },
                                {
                                    title: t.preferences.sections.marketing.title,
                                    description: t.preferences.sections.marketing.description,
                                    linkedCategory: "marketing",
                                },
                                {
                                    title: t.preferences.sections.more.title,
                                    description: t.preferences.sections.more.description,
                                },
                            ],
                        },
                    },
                },
            },

            onFirstConsent: ({ cookie }) => {
                updateGoogleConsent({
                    analytics: cookie.categories.includes("analytics"),
                    marketing: cookie.categories.includes("marketing"),
                });
            },

            onConsent: ({ cookie }) => {
                updateGoogleConsent({
                    analytics: cookie.categories.includes("analytics"),
                    marketing: cookie.categories.includes("marketing"),
                });
            },

            onChange: ({ cookie }) => {
                updateGoogleConsent({
                    analytics: cookie.categories.includes("analytics"),
                    marketing: cookie.categories.includes("marketing"),
                });
            },
        });
    }, [locale, t]);

    return null;
}