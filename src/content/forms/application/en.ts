import type { ApplicationFormContent } from "./types";

export const applicationFormEn: ApplicationFormContent = {
  backLink: "Back to homepage",
  badge: "Careers at GLOBALSPED",
  title: "Apply",
  highlight: "now",
  intro:
    "Send us your application directly online. We will personally review your documents and get back to you as soon as possible.",

  routes: {
  pagePath: "/en/careers/application",
  homePath: "/en",
  careersPath: "/en/careers",
},

tracking: {
  source: "homepage",
},

structuredData: {
  pageName: "Application",
  pageDescription:
    "Online application at GLOBALSPED for careers, logistics, dispatch and administration.",
},

breadcrumbs: {
  home: "Home",
  careers: "Careers",
  application: "Application",
},


  sectionTitle: "Application details",

  labels: {
    firstName: "First name *",
    lastName: "Last name *",
    email: "Email *",
    phone: "Phone *",
    location: "Place of residence / region",
    desiredPosition: "Desired position *",
    experience: "Professional experience",
    earliestStart: "Earliest start date",
    salaryExpectation: "Salary expectation",
    languages: "Languages",
    hasDrivingLicense: "Driving license available",
    message: "Short message / motivation *",
    upload: "Upload CV *",
    privacy:
      "I agree that my information and application documents may be processed for the purpose of handling my application.",
    submit: "Submit application",
    submitting: "Sending",
    successBack: "Back to homepage",
    selectPlaceholder: "Please select",
    noSelection: "No information",
  },

  placeholders: {
    desiredPosition: "e.g. dispatch, logistics, administration",
    earliestStart: "e.g. immediately, from 01/09",
    salaryExpectation: "optional",
    languages: "e.g. German, English, Russian",
    message: "Why would you like to work at GLOBALSPED?",
  },

  experienceOptions: [
    "No experience",
    "1–2 years",
    "3–5 years",
    "More than 5 years",
  ],

  drivingLicenseOptions: ["Yes", "No"],

  upload: {
    hint: "Allowed formats are PDF, DOC, DOCX, JPG and PNG up to a maximum of 10 MB.",
    removeLabel: "Remove file",
  },

  validation: {
    requiredFields: "Please complete all required fields.",
    fileRequired: "Please upload your CV.",
    privacyRequired:
      "Please agree to the processing of your information.",
    invalidFileType:
      "Please upload a PDF, DOC, DOCX, JPG or PNG file.",
    fileTooLarge: "The file may not exceed 10 MB.",
    submitError:
      "The application could not be sent. Please try again later.",
  },

  success: {
    title: "Application submitted",
    text:
      "Thank you. We have received your application and will get back to you as soon as possible.",
  },
};