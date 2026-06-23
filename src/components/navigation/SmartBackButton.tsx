"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getContent } from "@/content";

type SmartBackButtonProps = {
    locale: string;
};

const STORAGE_KEY = "globalsped:navigation-history";

type StoredHistory = {
    currentPath: string;
    previousPath: string | null;
};

function getStoredHistory(): StoredHistory | null {
    try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return null;
        }

        return JSON.parse(raw) as StoredHistory;
    } catch {
        return null;
    }
}

function setStoredHistory(value: StoredHistory) {
    try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
        // Safari Private Mode oder blockierter Storage: Button fällt dann sauber auf Startseite zurück.
    }
}

export function SmartBackButton({ locale }: SmartBackButtonProps) {
    const pathname = usePathname();
    const router = useRouter();
    const t = getContent(locale).navigationActions;

    const [previousPath, setPreviousPath] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    const homePath = `/${locale}`;

    const shouldHide = useMemo(() => {
        return pathname === homePath || pathname === `${homePath}/`;
    }, [pathname, homePath]);

    useEffect(() => {
        const storedHistory = getStoredHistory();

        const nextPreviousPath =
            storedHistory?.currentPath &&
                storedHistory.currentPath !== pathname &&
                storedHistory.currentPath.startsWith(homePath)
                ? storedHistory.currentPath
                : null;

        setPreviousPath(nextPreviousPath);

        setStoredHistory({
            currentPath: pathname,
            previousPath: nextPreviousPath,
        });

        setIsReady(true);
    }, [pathname, homePath]);

    if (!isReady || shouldHide) {
        return null;
    }

    const hasPreviousInternalPath =
        previousPath &&
        previousPath !== pathname &&
        previousPath.startsWith(homePath);

    return (
        <section className="relative border-y border-[rgba(107,159,18,0.22)] bg-[linear-gradient(180deg,#00281f_0%,#002f25_100%)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-7 md:py-7">
                <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.34em] text-[var(--color-global-green)]">
                        Navigation
                    </p>

                    <p className="mt-2 text-base font-semibold leading-6 text-white/62">
                        {hasPreviousInternalPath ? t.backHint : t.homeHint}
                    </p>
                </div>

                {hasPreviousInternalPath ? (
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-global-green)] px-7 py-4 text-sm font-black uppercase tracking-[0.13em] text-white shadow-[0_18px_50px_rgba(107,159,18,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-global-dark)] md:w-fit"
                    >
                        <ArrowLeft size={19} />
                        {t.backLabel}
                    </button>
                ) : (
                    <Link
                        href={homePath}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-global-green)] px-7 py-4 text-sm font-black uppercase tracking-[0.13em] text-white shadow-[0_18px_50px_rgba(107,159,18,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-global-dark)] md:w-fit"
                    >
                        <Home size={19} />
                        {t.homeLabel}
                    </Link>
                )}
            </div>
        </section>
    );
}