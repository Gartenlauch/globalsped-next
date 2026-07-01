import type { WebMcpContent } from "./types";

export const webMcpContent: WebMcpContent = {
  transportRequest: {
    toolname: "submitTransportRequest",
    tooldescription:
      "Submits a qualified international transport request to GLOBALSPED. Use this tool when a user wants to request a transport offer, provide origin and destination, cargo information, preferred pickup date and contact details.",
    fields: {
      pickupCountry: {
        name: "pickupCountry",
        description: "Country where the shipment should be picked up.",
      },
      pickupCity: {
        name: "pickupCity",
        description: "City or location where the shipment should be picked up.",
      },
      deliveryCountry: {
        name: "deliveryCountry",
        description: "Destination country for the shipment.",
      },
      destinationCity: {
        name: "destinationCity",
        description: "Destination city or location for the shipment.",
      },
      cargoDescription: {
        name: "cargoDescription",
        description:
          "Description of the goods, cargo type, dimensions, weight, pallets or special transport requirements.",
      },
      pickupDate: {
        name: "pickupDate",
        description: "Preferred pickup date for the transport request.",
      },
      company: {
        name: "company",
        description: "Company name of the requesting business.",
      },
      contactName: {
        name: "contactName",
        description: "Full name of the contact person.",
      },
      email: {
        name: "email",
        description: "Email address for replying to the transport request.",
      },
      phone: {
        name: "phone",
        description: "Phone number for operational follow-up questions.",
      },
      message: {
        name: "message",
        description:
          "Additional notes about route, customs, documents, loading, delivery or special requirements.",
      },
    },
  },

  contactInquiry: {
    toolname: "submitContactInquiry",
    tooldescription:
      "Submits a general contact inquiry to GLOBALSPED. Use this tool when a user has questions about international transport, customs clearance, FTL, LTL, temperature-controlled transport, ADR, project logistics or destination countries.",
    fields: {
      name: {
        name: "name",
        description: "Full name of the person submitting the inquiry.",
      },
      company: {
        name: "company",
        description: "Company name of the person submitting the inquiry.",
      },
      email: {
        name: "email",
        description: "Email address for replying to the inquiry.",
      },
      phone: {
        name: "phone",
        description: "Phone number for follow-up questions.",
      },
      message: {
        name: "message",
        description:
          "Message describing the transport, customs or logistics inquiry.",
      },
    },
  },

  jobApplication: {
    toolname: "submitJobApplication",
    tooldescription:
      "Submits a job application to GLOBALSPED. Use this tool when a user wants to apply for a job, provide applicant contact information and send application details.",
    fields: {
      name: {
        name: "name",
        description: "Full name of the applicant.",
      },
      email: {
        name: "email",
        description: "Email address of the applicant.",
      },
      phone: {
        name: "phone",
        description: "Phone number of the applicant.",
      },
      message: {
        name: "message",
        description:
          "Application message, motivation or additional information from the applicant.",
      },
    },
  },
};