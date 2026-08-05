"use client";

import { useEffect, useRef } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { updateGoogleConsent } from "@/lib/tracking/google";
import { getCookieConsentContent } from "@/content/cookies";
import { captureAttributionFromCurrentUrl } from "@/lib/tracking/attribution";

type Props = {
    locale: string;
};



export function CookieConsentBanner({ locale }: Props) {
    const t = getCookieConsentContent(locale);
    const consentLocale = locale === "en" ? "en" : "de";

    const initializedRef = useRef(false);

    const applyConsent = (categories: string[]) => {
        const analytics = categories.includes("analytics");
        const marketing = categories.includes("marketing");

        updateGoogleConsent({
            analytics,
            marketing,
        });

        if (marketing) {
            captureAttributionFromCurrentUrl();
        }
    };
    useEffect(() => {
        if (initializedRef.current) return;

        initializedRef.current = true;
        CookieConsent.run({
            autoShow: false,
            guiOptions: {
                consentModal: {
                    layout: "bar",
                    position: "middle center",
                    equalWeightButtons: false,
                    flipButtons: false,
                },
                preferencesModal: {
                    layout: "box",
                    position: "right",
                    equalWeightButtons: false,
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
                default: consentLocale,
                translations: {
                    [consentLocale]: {
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
                applyConsent(cookie.categories);
            },

            onConsent: ({ cookie }) => {
                applyConsent(cookie.categories);
            },

            onChange: ({ cookie }) => {
                applyConsent(cookie.categories);
            },
            disablePageInteraction: true

        });
        const showTimer = window.setTimeout(() => {
            if (!CookieConsent.validConsent()) {
                CookieConsent.show(true);
            }
        }, 350);

        return () => {
            window.clearTimeout(showTimer);
        };
    }, [consentLocale, locale, t]);

    return null;
}
