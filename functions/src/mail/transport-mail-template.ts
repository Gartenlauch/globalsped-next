export type TransportUploadedDocument = {
  name: string;
  path: string;
  downloadUrl: string;
  contentType: string;
  size: number;
};

type TransportMailLead = {
  contact: {
    company?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    country?: string;
    message?: string;
  };
  transport?: Record<string, unknown>;
  cargo?: Record<string, unknown>;
  documents?: {
    standardDocs?: TransportUploadedDocument[];
    adrDocs?: TransportUploadedDocument[];
  };
};

type BuildInternalTransportMailHtmlParams = {
  leadId: string;
  functionVersion: string;
  lead: TransportMailLead;
};

type MailRow = {
  label: string;
  value: string;
};

const numberFormatter = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 2,
});

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatHtmlText(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function toRecord(value: unknown): Record<string, unknown> {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, unknown>;
  }

  return {};
}

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return true;
}

function displayValue(value: unknown): string {
  if (!hasValue(value)) {
    return "–";
  }

  if (typeof value === "boolean") {
    return value ? "Ja" : "Nein";
  }

  return String(value);
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string" && value.trim()) {
    const normalized = value
      .trim()
      .replace(",", ".");

    const number = Number(normalized);

    return Number.isFinite(number) ? number : null;
  }

  return null;
}

function formatNumber(value: unknown): string {
  const number = toFiniteNumber(value);

  if (number === null) {
    return displayValue(value);
  }

  return numberFormatter.format(number);
}

function formatNumberWithUnit(
  value: unknown,
  unit: string,
): string {
  if (!hasValue(value)) {
    return "–";
  }

  const number = toFiniteNumber(value);

  if (number === null) {
    return displayValue(value);
  }

  return `${numberFormatter.format(number)} ${unit}`;
}

function formatDate(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return "–";
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(
    value.trim(),
  );

  if (!match) {
    return value;
  }

  const [, year, month, day] = match;

  return `${day}.${month}.${year}`;
}

function formatShipmentType(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return "–";
  }

  const normalized = value
    .trim()
    .toLowerCase();

  const labels: Record<string, string> = {
    ftl: "FTL / Komplettladung",
    ltl: "LTL / Teilladung",
    groupage: "Sammelgut",
  };

  return labels[normalized] ?? value;
}

function formatBooleanLike(value: unknown): string {
  if (typeof value === "boolean") {
    return value ? "Ja" : "Nein";
  }

  if (typeof value !== "string") {
    return displayValue(value);
  }

  const normalized = value
    .trim()
    .toLowerCase();

  if (
    ["true", "yes", "ja", "1", "on"].includes(normalized)
  ) {
    return "Ja";
  }

  if (
    ["false", "no", "nein", "0", "off"].includes(normalized)
  ) {
    return "Nein";
  }

  return displayValue(value);
}

function firstValue(
  ...values: unknown[]
): unknown {
  return values.find((value) => hasValue(value));
}

function buildInfoTable(rows: MailRow[]): string {
  const tableRows = rows
    .map(
      (row) => `
        <tr>
          <td
            style="
              padding: 8px 12px;
              border-bottom: 1px solid #e5e7eb;
              width: 190px;
              vertical-align: top;
              font-weight: bold;
            "
          >
            ${escapeHtml(row.label)}
          </td>
          <td
            style="
              padding: 8px 12px;
              border-bottom: 1px solid #e5e7eb;
              vertical-align: top;
            "
          >
            ${formatHtmlText(row.value)}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      style="
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e5e7eb;
        margin-bottom: 24px;
      "
    >
      ${tableRows}
    </table>
  `;
}

function addOptionalRow(
  rows: MailRow[],
  label: string,
  value: unknown,
  formatter: (value: unknown) => string = displayValue,
): void {
  if (!hasValue(value)) {
    return;
  }

  rows.push({
    label,
    value: formatter(value),
  });
}

function formatDimensions(
  unit: Record<string, unknown>,
): string {
  const length = unit.length;
  const width = unit.width;
  const height = unit.height;

  if (
    !hasValue(length) &&
    !hasValue(width) &&
    !hasValue(height)
  ) {
    return "–";
  }

  return [
    formatNumber(length),
    formatNumber(width),
    formatNumber(height),
  ].join(" × ") + " cm";
}

function buildCargoUnitsTable(
  cargo: Record<string, unknown>,
): string {
  if (!Array.isArray(cargo.units) || cargo.units.length === 0) {
    return `
      <p style="margin: 0 0 24px;">
        Keine einzelnen Ladeeinheiten angegeben.
      </p>
    `;
  }

  const units = cargo.units
    .map((unit) => toRecord(unit))
    .filter((unit) => Object.keys(unit).length > 0);

  if (units.length === 0) {
    return `
      <p style="margin: 0 0 24px;">
        Keine einzelnen Ladeeinheiten angegeben.
      </p>
    `;
  }

  const rows = units
    .map(
      (unit, index) => `
        <tr>
          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e5e7eb;
              text-align: center;
            "
          >
            ${index + 1}
          </td>

          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e5e7eb;
            "
          >
            ${escapeHtml(displayValue(unit.packagingType))}
          </td>

          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e5e7eb;
              text-align: center;
            "
          >
            ${escapeHtml(formatNumber(unit.quantity))}
          </td>

          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e5e7eb;
            "
          >
            ${escapeHtml(formatDimensions(unit))}
          </td>

          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e5e7eb;
              text-align: right;
            "
          >
            ${escapeHtml(
              formatNumberWithUnit(unit.weight, "kg"),
            )}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      style="
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e5e7eb;
        margin-bottom: 24px;
      "
    >
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th
            style="
              padding: 8px;
              text-align: center;
            "
          >
            Pos.
          </th>
          <th
            style="
              padding: 8px;
              text-align: left;
            "
          >
            Packmittel
          </th>
          <th
            style="
              padding: 8px;
              text-align: center;
            "
          >
            Anzahl
          </th>
          <th
            style="
              padding: 8px;
              text-align: left;
            "
          >
            Abmessungen
          </th>
          <th
            style="
              padding: 8px;
              text-align: right;
            "
          >
            Gewicht
          </th>
        </tr>
      </thead>

      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function getSafeDocumentUrl(
  document: TransportUploadedDocument,
): string | null {
  if (!document.downloadUrl) {
    return null;
  }

  try {
    const url = new URL(document.downloadUrl);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    return document.downloadUrl;
  } catch {
    return null;
  }
}

function buildDocumentLinks(
  title: string,
  documents:
    | TransportUploadedDocument[]
    | undefined,
): string {
  if (!documents || documents.length === 0) {
    return `
      <h4 style="margin-bottom: 6px;">
        ${escapeHtml(title)}
      </h4>

      <p style="margin-top: 0;">
        Keine Dokumente
      </p>
    `;
  }

  const links = documents
    .map((document, index) => {
      const label =
        document.name?.trim() ||
        `Dokument ${index + 1}`;

      const url = getSafeDocumentUrl(document);

      if (!url) {
        return `
          <li style="margin-bottom: 6px;">
            ${escapeHtml(label)}
            – kein Download-Link vorhanden
          </li>
        `;
      }

      return `
        <li style="margin-bottom: 6px;">
          <a
            href="${escapeHtml(url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${escapeHtml(label)}
          </a>
        </li>
      `;
    })
    .join("");

  return `
    <h4 style="margin-bottom: 6px;">
      ${escapeHtml(title)}
    </h4>

    <ul style="margin-top: 0;">
      ${links}
    </ul>
  `;
}

export function buildInternalTransportMailHtml({
  leadId,
  functionVersion,
  lead,
}: BuildInternalTransportMailHtmlParams): string {
  const transport = toRecord(lead.transport);
  const cargo = toRecord(lead.cargo);

  const message = lead.contact.message?.trim()
    ? formatHtmlText(lead.contact.message)
    : "Keine Nachricht angegeben";

  const transportRows: MailRow[] = [
    {
      label: "Transportart",
      value: formatShipmentType(transport.shipmentType),
    },
    {
      label: "Abholort",
      value: displayValue(transport.pickupLocation),
    },
    {
      label: "Abholdatum",
      value: formatDate(transport.pickupDate),
    },
    {
      label: "Zielland",
      value: displayValue(transport.deliveryCountry),
    },
    {
      label: "Zielort",
      value: displayValue(transport.destinationCity),
    },
    {
      label: "Warenbeschreibung",
      value: displayValue(transport.goodsDescription),
    },
    {
      label: "Fahrzeugtyp",
      value: displayValue(transport.vehicleType),
    },
  ];

  addOptionalRow(
    transportRows,
    "Lademeter",
    transport.loadingMeters,
    (value) => formatNumberWithUnit(value, "Ldm"),
  );

  addOptionalRow(
    transportRows,
    "Temperaturgeführt",
    transport.temperatureControlled,
    formatBooleanLike,
  );

  addOptionalRow(
    transportRows,
    "Notizen",
    transport.notes,
  );

  const adrClass = firstValue(
    transport.adrClassValue,
    transport.adrClass,
  );

  const adrRows: MailRow[] = [];

  addOptionalRow(
    adrRows,
    "ADR-Klasse",
    adrClass,
  );

  addOptionalRow(
    adrRows,
    "ADR-Bezeichnung",
    transport.adrDescription,
  );

  addOptionalRow(
    adrRows,
    "UN-Nummer",
    transport.unNumber,
  );

  addOptionalRow(
    adrRows,
    "Verpackungsgruppe",
    transport.packingGroup,
  );

  addOptionalRow(
    adrRows,
    "ADR-Punkte",
    transport.adrPoints,
  );

  addOptionalRow(
    adrRows,
    "Limited Quantity",
    transport.limitedQuantity,
    formatBooleanLike,
  );

  const cargoRows: MailRow[] = [
    {
      label: "Gesamtgewicht",
      value: formatNumberWithUnit(
        cargo.totalWeight,
        "kg",
      ),
    },
    {
      label: "Gesamtvolumen",
      value: formatNumberWithUnit(
        cargo.totalVolume,
        "m³",
      ),
    },
    {
      label: "Packstücke",
      value: formatNumber(cargo.pieces),
    },
  ];

  const adrHtml = adrRows.length > 0
    ? `
        <h3
          style="
            margin-top: 28px;
            margin-bottom: 10px;
          "
        >
          Gefahrgut / ADR
        </h3>

        ${buildInfoTable(adrRows)}
      `
    : "";

  return `
    <div
      style="
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
        line-height: 1.5;
        max-width: 800px;
      "
    >
      <h2 style="margin-bottom: 8px;">
        Neue Transportanfrage
      </h2>

      <p style="margin-top: 0;">
        <strong>Lead-ID:</strong>
        ${escapeHtml(leadId)}
        <br />

        <span
          style="
            color: #6b7280;
            font-size: 12px;
          "
        >
          Function-Version:
          ${escapeHtml(functionVersion)}
        </span>
      </p>

      <h3
        style="
          margin-top: 28px;
          margin-bottom: 10px;
        "
      >
        Kontaktdaten
      </h3>

      ${buildInfoTable([
        {
          label: "Firma",
          value: displayValue(lead.contact.company),
        },
        {
          label: "Ansprechpartner",
          value: displayValue(
            lead.contact.contactPerson,
          ),
        },
        {
          label: "E-Mail",
          value: displayValue(lead.contact.email),
        },
        {
          label: "Telefon",
          value: displayValue(lead.contact.phone),
        },
        {
          label: "Land",
          value: displayValue(lead.contact.country),
        },
      ])}

      <h3
        style="
          margin-top: 28px;
          margin-bottom: 10px;
        "
      >
        Nachricht
      </h3>

      <div
        style="
          padding: 12px;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          margin-bottom: 24px;
        "
      >
        ${message}
      </div>

      <h3
        style="
          margin-top: 28px;
          margin-bottom: 10px;
        "
      >
        Transportdaten
      </h3>

      ${buildInfoTable(transportRows)}

      ${adrHtml}

      <h3
        style="
          margin-top: 28px;
          margin-bottom: 10px;
        "
      >
        Ladungsdaten
      </h3>

      ${buildInfoTable(cargoRows)}

      <h4 style="margin-bottom: 10px;">
        Ladeeinheiten
      </h4>

      ${buildCargoUnitsTable(cargo)}

      <h3
        style="
          margin-top: 28px;
          margin-bottom: 10px;
        "
      >
        Dokumente
      </h3>

      ${buildDocumentLinks(
        "Standard-Dokumente",
        lead.documents?.standardDocs,
      )}

      ${buildDocumentLinks(
        "ADR-Dokumente",
        lead.documents?.adrDocs,
      )}
    </div>
  `;
}