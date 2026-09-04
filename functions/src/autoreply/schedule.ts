export type AutoReplyScheduleSettings = {
    enabled: boolean;
    delayMinutes: number;
    timezone: string;
    businessDays: number[];
    businessStart: string;
    businessEnd: string;
    deferredSendTime: string;
};

export type AutoReplyScheduleReason =
    | "within_business_hours"
    | "deferred_same_business_day"
    | "deferred_next_business_day";

export type AutoReplyScheduleDecision =
    | {
        enabled: false;
        scheduledFor: null;
        reason: "disabled";
    }
    | {
        enabled: true;
        scheduledFor: Date;
        reason: AutoReplyScheduleReason;
    };

type ZonedParts = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    isoWeekday: number;
};

type LocalDateTime = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};

function parseTime(
    value: string,
): {
    hour: number;
    minute: number;
} {
    const match =
        /^([01]\d|2[0-3]):([0-5]\d)$/.exec(
            value,
        );

    if (!match) {
        throw new Error(
            `Ungültige Uhrzeit: ${value}`,
        );
    }

    return {
        hour: Number(match[1]),
        minute: Number(match[2]),
    };
}

function isoWeekdayFromDate(
    year: number,
    month: number,
    day: number,
): number {
    /*
     * UTC wird hier ausschließlich benutzt,
     * um den Kalendertag eindeutig einem
     * Wochentag zuzuordnen.
     *
     * JS: Sonntag = 0
     * ISO: Montag = 1 ... Sonntag = 7
     */
    const jsDay =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            ),
        ).getUTCDay();

    return jsDay === 0
        ? 7
        : jsDay;
}

function getZonedParts(
    date: Date,
    timezone: string,
): ZonedParts {
    const formatter =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone: timezone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23",
            },
        );

    const parts =
        formatter.formatToParts(
            date,
        );

    const values =
        new Map<string, string>();

    for (const part of parts) {
        if (part.type !== "literal") {
            values.set(
                part.type,
                part.value,
            );
        }
    }

    const year =
        Number(values.get("year"));

    const month =
        Number(values.get("month"));

    const day =
        Number(values.get("day"));

    const hour =
        Number(values.get("hour"));

    const minute =
        Number(values.get("minute"));

    const second =
        Number(values.get("second"));

    return {
        year,
        month,
        day,
        hour,
        minute,
        second,

        isoWeekday:
            isoWeekdayFromDate(
                year,
                month,
                day,
            ),
    };
}

function localDateTimeToUtc(
    local:
        LocalDateTime,
    timezone: string,
): Date {
    /*
     * Intl besitzt keine direkte
     * "lokale Uhrzeit in Zone -> UTC"
     * Funktion.
     *
     * Deshalb nähern wir den UTC-Zeitpunkt
     * iterativ an. Das funktioniert auch
     * über CET/CEST-Wechsel hinweg.
     */
    let timestamp =
        Date.UTC(
            local.year,
            local.month - 1,
            local.day,
            local.hour,
            local.minute,
            local.second,
        );

    for (
        let attempt = 0;
        attempt < 4;
        attempt += 1
    ) {
        const candidate =
            new Date(timestamp);

        const zoned =
            getZonedParts(
                candidate,
                timezone,
            );

        const representedLocalAsUtc =
            Date.UTC(
                zoned.year,
                zoned.month - 1,
                zoned.day,
                zoned.hour,
                zoned.minute,
                zoned.second,
            );

        const desiredLocalAsUtc =
            Date.UTC(
                local.year,
                local.month - 1,
                local.day,
                local.hour,
                local.minute,
                local.second,
            );

        const difference =
            desiredLocalAsUtc -
            representedLocalAsUtc;

        if (difference === 0) {
            return candidate;
        }

        timestamp += difference;
    }

    return new Date(timestamp);
}

function addLocalDays(
    parts: ZonedParts,
    days: number,
): LocalDateTime {
    const date =
        new Date(
            Date.UTC(
                parts.year,
                parts.month - 1,
                parts.day + days,
            ),
        );

    return {
        year:
            date.getUTCFullYear(),

        month:
            date.getUTCMonth() + 1,

        day:
            date.getUTCDate(),

        hour: 0,
        minute: 0,
        second: 0,
    };
}

function minutesOfDay(
    hour: number,
    minute: number,
): number {
    return (
        hour * 60 +
        minute
    );
}

function isBusinessDay(
    isoWeekday: number,
    businessDays: number[],
): boolean {
    return businessDays.includes(
        isoWeekday,
    );
}

function isWithinBusinessHours(
    parts: ZonedParts,
    settings:
        AutoReplyScheduleSettings,
): boolean {
    if (
        !isBusinessDay(
            parts.isoWeekday,
            settings.businessDays,
        )
    ) {
        return false;
    }

    const start =
        parseTime(
            settings.businessStart,
        );

    const end =
        parseTime(
            settings.businessEnd,
        );

    const currentMinutes =
        minutesOfDay(
            parts.hour,
            parts.minute,
        );

    const startMinutes =
        minutesOfDay(
            start.hour,
            start.minute,
        );

    const endMinutes =
        minutesOfDay(
            end.hour,
            end.minute,
        );

    /*
     * Ende ist exklusiv:
     * 17:00 gehört nicht mehr zur
     * Geschäftszeit 08:00–17:00.
     */
    return (
        currentMinutes >=
        startMinutes &&
        currentMinutes <
        endMinutes
    );
}

function buildDeferredTime(
    year: number,
    month: number,
    day: number,
    settings:
        AutoReplyScheduleSettings,
): Date {
    const deferred =
        parseTime(
            settings.deferredSendTime,
        );

    return localDateTimeToUtc(
        {
            year,
            month,
            day,
            hour:
                deferred.hour,
            minute:
                deferred.minute,
            second: 0,
        },
        settings.timezone,
    );
}

function findNextDeferredTime(
    candidate: Date,
    settings:
        AutoReplyScheduleSettings,
): {
    date: Date;
    sameBusinessDay: boolean;
} {
    const candidateParts =
        getZonedParts(
            candidate,
            settings.timezone,
        );

    /*
     * Sonderfall morgens:
     *
     * 07:30 + 10 Minuten = 07:40.
     * Dieser Tag ist zwar Geschäftstag,
     * aber die Zielzeit liegt vor 08:00.
     *
     * Ist 08:30 noch nicht vorbei,
     * wird am selben Tag 08:30 gesendet.
     */
    if (
        isBusinessDay(
            candidateParts.isoWeekday,
            settings.businessDays,
        )
    ) {
        const sameDayDeferred =
            buildDeferredTime(
                candidateParts.year,
                candidateParts.month,
                candidateParts.day,
                settings,
            );

        if (
            sameDayDeferred.getTime() >
            candidate.getTime()
        ) {
            return {
                date:
                    sameDayDeferred,

                sameBusinessDay:
                    true,
            };
        }
    }

    /*
     * Sonst nächsten zulässigen
     * Geschäftstag suchen.
     *
     * 14 Iterationen sind bewusst
     * großzügig, falls später ungewöhnliche
     * Geschäftstags-Konfigurationen
     * verwendet werden.
     */
    for (
        let offset = 1;
        offset <= 14;
        offset += 1
    ) {
        const localDay =
            addLocalDays(
                candidateParts,
                offset,
            );

        const weekday =
            isoWeekdayFromDate(
                localDay.year,
                localDay.month,
                localDay.day,
            );

        if (
            !isBusinessDay(
                weekday,
                settings.businessDays,
            )
        ) {
            continue;
        }

        return {
            date:
                buildDeferredTime(
                    localDay.year,
                    localDay.month,
                    localDay.day,
                    settings,
                ),

            sameBusinessDay:
                false,
        };
    }

    throw new Error(
        "Es konnte kein nächster Geschäftstag für die Autoantwort ermittelt werden.",
    );
}

export function calculateAutoReplySchedule(
    receivedAt: Date,
    settings:
        AutoReplyScheduleSettings,
): AutoReplyScheduleDecision {
    if (!settings.enabled) {
        return {
            enabled: false,
            scheduledFor: null,
            reason: "disabled",
        };
    }

    if (
        Number.isNaN(
            receivedAt.getTime(),
        )
    ) {
        throw new Error(
            "receivedAt ist kein gültiges Datum.",
        );
    }

    if (
        !Number.isInteger(
            settings.delayMinutes,
        ) ||
        settings.delayMinutes < 0
    ) {
        throw new Error(
            "delayMinutes ist ungültig.",
        );
    }

    if (
        settings.businessDays
            .length === 0
    ) {
        throw new Error(
            "Es ist kein Geschäftstag konfiguriert.",
        );
    }

    /*
     * Zuerst immer die normale
     * Verzögerung addieren.
     */
    const delayedCandidate =
        new Date(
            receivedAt.getTime() +
            settings.delayMinutes *
            60_000,
        );

    const candidateParts =
        getZonedParts(
            delayedCandidate,
            settings.timezone,
        );

    if (
        isWithinBusinessHours(
            candidateParts,
            settings,
        )
    ) {
        return {
            enabled: true,

            scheduledFor:
                delayedCandidate,

            reason:
                "within_business_hours",
        };
    }

    const deferred =
        findNextDeferredTime(
            delayedCandidate,
            settings,
        );

    return {
        enabled: true,

        scheduledFor:
            deferred.date,

        reason:
            deferred.sameBusinessDay
                ? "deferred_same_business_day"
                : "deferred_next_business_day",
    };
}