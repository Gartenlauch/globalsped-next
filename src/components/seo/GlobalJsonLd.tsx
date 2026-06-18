// src/components/seo/GlobalJsonLd.tsx
// src/components/seo/GlobalJsonLd.tsx

import { JsonLd } from "./JsonLd";
import {
  globalspedOrganization,
  globalspedProfessionalService,
  globalspedWebSite,
} from "@/content/schema/organization";

export function GlobalJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          globalspedOrganization,
          globalspedProfessionalService,
          globalspedWebSite,
        ],
      }}
    />
  );
}