import type { TransportRequestContent } from "./types";

export const transportRequestDe: TransportRequestContent = {
  badge: "Transport Anfrage",
  title: "Transport unverbindlich",
  highlight: "anfragen",
  intro: "Senden Sie uns Ihre Transportdaten für internationale Transporte, LTL, FTL, Palettenware, Projektlogistik oder Sondertransporte. Unser Team prüft Ihre Anfrage persönlich und meldet sich schnellstmöglich.",

  steps: {
    transport: "Transportdaten",
    contact: "Kontaktdaten",
    summary: "Zusammenfassung",
  },

  shipmentTypes: {
    ltl: "Paletten & Pakete (LTL)",
    loadingMeters: "Lademeter eingeben",
    ftl: "Fahrzeugbuchung (FTL)",
  },

  packagingTypes: [
    "Palette",
    "Halbpalette",
    "Paket / Karton",
    "Gitterbox",
    "Holzkiste",
    "Sonstiges",
  ],

  destinationCountries: [
    "Kasachstan",
    "Usbekistan",
    "Kirgisistan",
    "Turkmenistan",
    "Tadschikistan",
    "Mongolei",
    "Aserbaidschan",
    "Georgien",
    "Armenien",
    "Irak",
    "Afghanistan",
    "Ukraine",
    "Sonstiges Land"
  ],

  vehicleTypes: [
    "Planen-LKW",
    "Koffer-LKW",
    "Kühlfahrzeug",
    "Mega-Trailer",
    "Sattelzug",
    "Sonstiges",
  ],

  labels: {
    pickupLocation: "Abholort in Europa",
    deliveryCountry: "Zustellland",
    shipmentType: "Wie wird die Ware versendet?",
    packagingType: "Verpackungsart",
    quantity: "Anzahl",
    length: "Länge cm",
    width: "Breite cm",
    height: "Höhe cm",
    weight: "Gewicht kg",
    loadingMeters: "Lademeter",
    goodsDescription: "Warenbeschreibung",
    vehicleType: "Fahrzeugtyp",
    pickupDate: "Gewünschtes Abholdatum",
    stackable: "Stapelbar",
    dangerousGoods: "Gefahrgut",
    temperatureControlled: "Temperaturgeführt",
    notes: "Besondere Hinweise",

    company: "Firma",
    contactPerson: "Ansprechpartner",
    email: "E-Mail",
    phone: "Telefon",
    country: "Land",
    message: "Nachricht",
    privacy:
      "Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden.",

    yes: "Ja",
    no: "Nein",

    next: "Weiter",
    back: "Zurück",
    submit: "Anfrage absenden",
    addUnit: "Weitere Einheit hinzufügen",
    removeUnit: "Entfernen",
  },

  placeholders: {
    pickupLocation: "z. B. München, Deutschland",
    goodsDescription: "z. B. Maschinenbauteile, Handelsware, Ersatzteile",
    notes: "Zusätzliche Informationen zur Abholung, Ware oder Lieferung",
    company: "Ihre Firma",
    contactPerson: "Vorname Nachname",
    email: "name@firma.de",
    phone: "+49 ...",
    message: "Ihre Nachricht an GLOBALSPED",
  },

  summary: {
    title: "Ihre Transportübersicht",
    transportData: "Transportdaten",
    goodsData: "Warendaten",
    contactData: "Kontaktdaten",
    totalWeight: "Gesamtgewicht",
    totalVolume: "Gesamtvolumen",
    pieces: "Packstücke",
  },

  success: {
    title: "Anfrage versendet",
    text: "Vielen Dank. Ihre Transportanfrage wurde vorbereitet. Unser Team meldet sich schnellstmöglich bei Ihnen.",
    close: "Schließen",
  },

  validation: {
    requiredFields: "Bitte füllen Sie alle Pflichtfelder aus.",
    privacyRequired: "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.",
  },
};