const assert = require("node:assert/strict");

const { calculateAutoReplySchedule } = require("../lib/autoreply/schedule.js");

const settings = {
  enabled: true,
  delayMinutes: 10,
  timezone: "Europe/Berlin",
  businessDays: [1, 2, 3, 4, 5],
  businessStart: "08:00",
  businessEnd: "17:00",
  deferredSendTime: "08:30",
};

function berlinDate(year, month, day, hour, minute) {
  /*
   * Testdaten liegen im September 2026.
   * Europe/Berlin = CEST = UTC+2.
   */
  return new Date(Date.UTC(year, month - 1, day, hour - 2, minute, 0));
}

function formatBerlin(date) {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function runCase({ name, receivedAt, expected, expectedReason }) {
  const result = calculateAutoReplySchedule(receivedAt, settings);

  assert.equal(
    result.enabled,
    true,
    `${name}: AutoReply sollte aktiviert sein`,
  );

  if (!result.enabled) {
    throw new Error(`${name}: Unerwartet deaktiviert`);
  }

  const actual = formatBerlin(result.scheduledFor);

  assert.equal(actual, expected, `${name}: falscher Versandzeitpunkt`);

  assert.equal(result.reason, expectedReason, `${name}: falscher reason-Wert`);

  console.log(`✓ ${name}: ${actual} (${result.reason})`);
}

const cases = [
  {
    name: "Montag 10:20",
    receivedAt: berlinDate(2026, 9, 7, 10, 20),
    expected: "07.09.2026, 10:30",
    expectedReason: "within_business_hours",
  },

  {
    name: "Montag 16:30",
    receivedAt: berlinDate(2026, 9, 7, 16, 30),
    expected: "07.09.2026, 16:40",
    expectedReason: "within_business_hours",
  },

  {
    name: "Montag 16:55",
    receivedAt: berlinDate(2026, 9, 7, 16, 55),
    expected: "08.09.2026, 08:30",
    expectedReason: "deferred_next_business_day",
  },

  {
    name: "Montag 19:00",
    receivedAt: berlinDate(2026, 9, 7, 19, 0),
    expected: "08.09.2026, 08:30",
    expectedReason: "deferred_next_business_day",
  },

  {
    name: "Freitag 18:00",
    receivedAt: berlinDate(2026, 9, 11, 18, 0),
    expected: "14.09.2026, 08:30",
    expectedReason: "deferred_next_business_day",
  },

  {
    name: "Samstag 11:00",
    receivedAt: berlinDate(2026, 9, 12, 11, 0),
    expected: "14.09.2026, 08:30",
    expectedReason: "deferred_next_business_day",
  },

  {
    name: "Montag 07:30",
    receivedAt: berlinDate(2026, 9, 7, 7, 30),
    expected: "07.09.2026, 08:30",
    expectedReason: "deferred_same_business_day",
  },
];

for (const testCase of cases) {
  runCase(testCase);
}

/*
 * AutoReply deaktiviert
 */
const disabled = calculateAutoReplySchedule(berlinDate(2026, 9, 7, 10, 20), {
  ...settings,
  enabled: false,
});

assert.equal(disabled.enabled, false);

assert.equal(disabled.scheduledFor, null);

assert.equal(disabled.reason, "disabled");

console.log("✓ AutoReply deaktiviert");

console.log("");
console.log("Alle AutoReply-Schedule-Tests erfolgreich.");
