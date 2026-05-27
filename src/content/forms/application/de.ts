import type { ApplicationFormContent } from "./types";

export const applicationFormDe: ApplicationFormContent = {
  backLink: "Zurück zur Startseite",
  badge: "Karriere bei GLOBALSPED",
  title: "Jetzt",
  highlight: "bewerben",
  intro:
    "Senden Sie uns Ihre Bewerbung direkt online. Wir prüfen Ihre Unterlagen persönlich und melden uns schnellstmöglich bei Ihnen.",

  sectionTitle: "Bewerbungsdaten",

  labels: {
    firstName: "Vorname *",
    lastName: "Nachname *",
    email: "E-Mail *",
    phone: "Telefon *",
    location: "Wohnort / Region",
    desiredPosition: "Gewünschte Position *",
    experience: "Berufserfahrung",
    earliestStart: "Frühester Eintrittstermin",
    salaryExpectation: "Gehaltsvorstellung",
    languages: "Sprachen",
    hasDrivingLicense: "Führerschein vorhanden",
    message: "Kurze Nachricht / Motivation *",
    upload: "Lebenslauf hochladen *",
    privacy: "Ich stimme zu, dass meine Angaben und Bewerbungsunterlagen zur Bearbeitung meiner Bewerbung verarbeitet werden.",
    submit: "Bewerbung absenden",
    submitting: "Wird gesendet",
    successBack: "Zurück zur Startseite",
    selectPlaceholder: "Bitte wählen",
    noSelection: "Keine Angabe",
  },

  placeholders: {
    desiredPosition: "z. B. Disposition, Logistik, Verwaltung",
    earliestStart: "z. B. sofort, ab 01.09.",
    salaryExpectation: "optional",
    languages: "z. B. Deutsch, Englisch, Russisch",
    message: "Warum möchten Sie bei GLOBALSPED arbeiten?",
  },

  experienceOptions: [
    "Keine Erfahrung",
    "1–2 Jahre",
    "3–5 Jahre",
    "Mehr als 5 Jahre",
  ],

  drivingLicenseOptions: ["Ja", "Nein"],

  upload: {
    hint: "Erlaubt sind PDF, DOC, DOCX, JPG und PNG bis maximal 10 MB.",
    removeLabel: "Datei entfernen",
  },

  validation: {
    requiredFields: "Bitte füllen Sie alle Pflichtfelder aus.",
    fileRequired: "Bitte laden Sie Ihren Lebenslauf hoch.",
    privacyRequired:
      "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.",
    invalidFileType:
      "Bitte laden Sie eine PDF-, DOC-, DOCX-, JPG- oder PNG-Datei hoch.",
    fileTooLarge: "Die Datei darf maximal 10 MB groß sein.",
    submitError:
      "Die Bewerbung konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
  },

  success: {
    title: "Bewerbung gesendet",
    text:
      "Vielen Dank. Wir haben Ihre Bewerbung erhalten und melden uns schnellstmöglich bei Ihnen.",
  },
};