import { ftlService } from "./ftl";
import { ltlService } from "./ltl";
import { thermoService } from "./thermo";
import { adrService } from "./adr";
import { customsService } from "./customs";
import { projectService } from "./project";

const services = [
  ftlService,
  ltlService,
  thermoService,
  adrService,
  customsService,
  projectService,
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceSlugs() {
  return services.map((service) => service.slug);
}