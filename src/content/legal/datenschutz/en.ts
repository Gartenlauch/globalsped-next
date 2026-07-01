import type { DatenschutzContent } from "./types";

export const datenschutzEn: DatenschutzContent = {
  meta: {
    title: "Privacy Policy | GLOBALSPED",
    description:
      "Privacy policy of Globalsped Internationale Spedition GmbH regarding the processing of personal data on the website.",
  },

  badge: "Privacy",
  title: "Privacy Policy",
  intro:
    "In this privacy policy, we inform you about which personal data we process when you visit our website, use our forms and interact with our online services.",

  backLink: {
    label: "Back to homepage",
    href: "/en",
  },

  lastUpdated: "Last updated: January 2026",

  sections: [
    {
      id: "overview",
      title: "1. Privacy at a glance",
      paragraphs: [
        "The following information provides an overview of what happens to your personal data when you visit our website or use one of our online forms.",
        "Personal data means any data that can be used to personally identify you, for example your name, email address, phone number, company data, application data, transport data or technical access data.",
      ],
    },
    {
      id: "controller",
      title: "2. Controller",
      paragraphs: [
        "The controller responsible for data processing on this website is:",
      ],
      lists: [
        {
          items: [
            "Globalsped Internationale Spedition GmbH",
            "Pendelhagen 1",
            "D-83416 Saaldorf-Surheim",
            "Germany",
            "Phone: +49 (0)8654 5762-0",
            "Email: info@globalsped.de",
            "Managing Director: Robert Tiefenthaler",
          ],
        },
      ],
    },
    {
      id: "hosting",
      title: "3. Hosting and technical provision",
      paragraphs: [
        "Our website is provided via Firebase App Hosting and Google Cloud services. The app hosting location is europe-west4.",
        "When the website is accessed, technically required data is processed so that the website can be delivered securely, reliably and without errors.",
        "This data may include, in particular, IP address, date and time of access, browser type, operating system, referrer URL, pages accessed and technical status information.",
        "Processing is carried out on the basis of Art. 6 para. 1 lit. f GDPR. Our legitimate interest lies in the secure, stable and efficient operation of our website.",
      ],
      lists: [
        {
          title: "Technical services used may include in particular:",
          items: [
            "Firebase App Hosting",
            "Google Cloud Functions",
            "Cloud Firestore",
            "Firebase Storage",
            "Firebase Trigger Email Extension or comparable email processing services",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies and consent management",
      paragraphs: [
        "Our website uses a cookie consent banner. Through this banner, you can choose which categories of cookies and external services you would like to allow.",
        "Necessary cookies and comparable technologies are required to provide basic website functions. Statistics and marketing services are only activated if you have given your prior consent.",
        "The storage of information on your device or access to such information for non-essential services is carried out only on the basis of your consent pursuant to Section 25 TDDDG and Art. 6 para. 1 lit. a GDPR.",
      ],
      lists: [
        {
          title: "Cookie categories",
          items: [
            "Necessary: technical functions, security and storage of your cookie selection.",
            "Statistics: analysis of how our website is used, in particular via Google Analytics 4.",
            "Marketing: conversion tracking and campaign analysis, in particular via Google Ads and Google Conversion Tracking.",
          ],
        },
        {
          title: "Withdrawal",
          items: [
            "You can change or withdraw your consent at any time via the cookie settings on the website.",
          ],
        },
      ],
    },
    {
      id: "contact-form",
      title: "5. Contact and general request forms",
      paragraphs: [
        "If you contact us via contact form, email or phone, we process the information you provide in order to handle your request.",
        "This may include, in particular, name, company, email address, phone number, message text and technical transmission metadata.",
        "Depending on the content of the request, processing is carried out on the basis of Art. 6 para. 1 lit. b GDPR where pre-contractual measures or contract processing are concerned, or on the basis of Art. 6 para. 1 lit. f GDPR for handling general business requests.",
        "The data will be deleted as soon as it is no longer required for processing, unless statutory retention obligations prevent deletion.",
      ],
    },
    {
      id: "transport-request",
      title: "6. Transport request form",
      paragraphs: [
        "If you use our transport request form, we process the transport and contact data you enter in order to handle your request and prepare a suitable transport quote.",
        "The information is stored in our lead capture system and marked with the source “homepage”. In addition, automated email notifications may be generated for GLOBALSPED and for the email address you provide.",
        "Processing is carried out on the basis of Art. 6 para. 1 lit. b GDPR if your request is aimed at concluding or carrying out a transport contract. Where processing serves the organization, tracking and internal handling of business requests, it is additionally carried out on the basis of Art. 6 para. 1 lit. f GDPR.",
      ],
      lists: [
        {
          title: "Processed data may include in particular:",
          items: [
            "Pickup location and destination country",
            "Destination city",
            "Shipment type, packages, weight, loading meters or vehicle type",
            "Information on dangerous goods, temperature control and goods description",
            "Pickup date and further instructions",
            "Company name, contact person, email address, phone number and country",
          ],
        },
        {
          title: "Internal recipients",
          items: [
            "Transport requests may be forwarded internally to logistik@globalsped.de or to the responsible specialist departments.",
          ],
        },
      ],
    },
    {
      id: "application-form",
      title: "7. Application form and file upload",
      paragraphs: [
        "If you apply via our application form, we process your application data exclusively for the purpose of handling your application and carrying out the application process.",
        "Submitted application documents are stored in Firebase Storage. The application data is also recorded in Firestore or a comparable system for internal processing.",
        "When an application is received, email notifications may be triggered to bewerbung@globalsped.de and, where applicable, to the email address you provided.",
        "The legal basis is Art. 6 para. 1 lit. b GDPR in connection with pre-contractual measures as part of the application process and, where applicable, Section 26 of the German Federal Data Protection Act (BDSG).",
        "Application data is generally stored only for as long as necessary to make a decision on the application. After completion of the application process, the data will be deleted unless statutory retention obligations apply or you have expressly consented to longer storage.",
      ],
      lists: [
        {
          title: "Processed application data may include in particular:",
          items: [
            "First name and last name",
            "Email address and phone number",
            "Place of residence or region",
            "Desired position",
            "Professional experience, language skills and driving license information",
            "Earliest start date and salary expectation",
            "Motivation text",
            "Uploaded application documents such as CV, certificates or other attachments",
          ],
        },
      ],
    },
    {
      id: "firebase",
      title: "8. Processing via Firebase, Firestore, Storage and Cloud Functions",
      paragraphs: [
        "For processing form requests and applications, we use technical services from Firebase and Google Cloud. These include, in particular, Cloud Firestore for storing structured datasets, Firebase Storage for storing uploaded files and Cloud Functions for server-side processing.",
        "Where emails are triggered automatically, technical mail documents may be created for this purpose and subsequently processed by an email service.",
        "Processing serves the secure collection, technical forwarding and internal handling of requests and applications.",
      ],
    },
    {
      id: "analytics",
      title: "9. Google Analytics 4",
      paragraphs: [
        "This website uses Google Analytics 4, a web analytics service provided by Google. Google Analytics helps us understand how visitors use our website, which content is particularly relevant and how we can improve our website.",
        "Google Analytics is only activated if you have previously given your consent to the Statistics category via our cookie consent banner.",
        "The legal basis for use is your consent pursuant to Art. 6 para. 1 lit. a GDPR and Section 25 TDDDG. You can withdraw your consent at any time via the cookie settings.",
        "In the course of use, usage data, device information, browser information, shortened or processed IP addresses, interactions with the website and technical identifiers may be processed in particular.",
      ],
    },
    {
      id: "google-ads",
      title: "10. Google Ads and Google Conversion Tracking",
      paragraphs: [
        "This website uses Google Ads and Google Conversion Tracking to measure the effectiveness of advertising measures and optimize campaigns.",
        "Google Ads and Conversion Tracking are only activated if you have given your consent to the Marketing category via our cookie consent banner.",
        "The legal basis is your consent pursuant to Art. 6 para. 1 lit. a GDPR and Section 25 TDDDG. You can withdraw your consent at any time via the cookie settings.",
      ],
    },
    {
      id: "consent-mode",
      title: "11. Google Consent Mode",
      paragraphs: [
        "We use Google Consent Mode to control Google services depending on your cookie selection. Consent signals are transmitted to Google, for example whether statistics or marketing services have been permitted.",
        "Consent Mode does not replace consent. Statistics and marketing services are only activated according to your selection in the cookie consent banner.",
      ],
      lists: [
        {
          title: "The following consent signals may be used in particular:",
          items: [
            "analytics_storage",
            "ad_storage",
            "ad_user_data",
            "ad_personalization",
          ],
        },
      ],
    },
    {
      id: "search-console",
      title: "12. Google Search Console",
      paragraphs: [
        "We use Google Search Console to monitor the technical visibility of our website in Google Search and to carry out search engine optimization.",
        "To our knowledge, Google Search Console does not set cookies on our website and does not provide us with personal data of individual website visitors. The analyses are aggregated and relate to search queries, clicks, technical indexing data and similar SEO-relevant information.",
      ],
    },
    {
      id: "google-maps",
      title: "13. Google Maps",
      paragraphs: [
        "This website uses Google Maps to display locations and make it easier to find our company.",
        "When a page with an embedded Google Maps map is accessed, data, in particular IP address, location and usage data as well as technical information, may be transmitted to Google.",
        "Google Maps is only loaded if corresponding consent has been given or if the integration is designed in a privacy-compliant way so that no personal data is transmitted to Google before consent is given.",
        "Where consent is obtained, the legal basis is Art. 6 para. 1 lit. a GDPR and Section 25 TDDDG.",
      ],
    },
    {
      id: "recipients",
      title: "14. Recipients and categories of recipients",
      paragraphs: [
        "Within our company, only those departments that need personal data to handle the respective request, application or technical task are given access to it.",
        "In addition, technical service providers may be used to support us in operating the website, hosting, data storage, email delivery, analytics and marketing services or IT security.",
      ],
    },
    {
      id: "third-country",
      title: "15. Transfers to third countries",
      paragraphs: [
        "When using certain services, in particular Google services, the processing of personal data outside the European Union or the European Economic Area cannot be excluded.",
        "Where data is transferred to third countries, this is carried out on the basis of appropriate safeguards, in particular adequacy decisions, standard contractual clauses or other mechanisms provided for under data protection law.",
      ],
    },
    {
      id: "storage-periods",
      title: "16. Storage periods",
      paragraphs: [
        "We store personal data only for as long as necessary for the respective purposes or as long as statutory retention obligations exist.",
        "Request data is generally deleted once processing has been completed and no statutory retention obligations prevent deletion.",
        "Application data is deleted after completion of the application process unless longer storage is legally required or expressly agreed.",
        "Technical server data is stored only for as long as necessary for security, error analysis and operation of the website.",
      ],
    },
    {
      id: "rights",
      title: "17. Your rights",
      paragraphs: [
        "Within the scope of the applicable statutory provisions, you have the right at any time to obtain information about the personal data stored about you.",
      ],
      lists: [
        {
          title: "In particular, you have the following rights:",
          items: [
            "Right of access pursuant to Art. 15 GDPR",
            "Right to rectification pursuant to Art. 16 GDPR",
            "Right to erasure pursuant to Art. 17 GDPR",
            "Right to restriction of processing pursuant to Art. 18 GDPR",
            "Right to data portability pursuant to Art. 20 GDPR",
            "Right to object pursuant to Art. 21 GDPR",
            "Right to withdraw consent given with effect for the future",
          ],
        },
      ],
    },
    {
      id: "complaint",
      title: "18. Right to lodge a complaint with a supervisory authority",
      paragraphs: [
        "You have the right to lodge a complaint with a data protection supervisory authority if you believe that the processing of your personal data violates data protection law.",
        "In particular, you may contact the data protection supervisory authority of your place of residence, your workplace or the place of the alleged infringement.",
      ],
    },
    {
      id: "ssl",
      title: "19. SSL or TLS encryption",
      paragraphs: [
        "For security reasons and to protect the transmission of confidential content, this website uses SSL or TLS encryption.",
        "You can recognize an encrypted connection by the address bar of your browser and the lock symbol in your browser bar.",
      ],
    },
    {
      id: "updates",
      title: "20. Validity and changes to this privacy policy",
      paragraphs: [
        "We reserve the right to amend this privacy policy so that it always complies with current legal requirements or to reflect changes to our services in the privacy policy.",
      ],
    },
  ],
};