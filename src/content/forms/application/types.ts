export type ApplicationFormContent = {
    backLink: string;
    badge: string;
    title: string;
    highlight: string;
    intro: string;
  
    sectionTitle: string;
  
    labels: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      location: string;
      desiredPosition: string;
      experience: string;
      earliestStart: string;
      salaryExpectation: string;
      languages: string;
      hasDrivingLicense: string;
      message: string;
      upload: string;
      privacy: string;
      submit: string;
      submitting: string;
      successBack: string;
      selectPlaceholder: string;
      noSelection: string;
    };
  
    placeholders: {
      desiredPosition: string;
      earliestStart: string;
      salaryExpectation: string;
      languages: string;
      message: string;
    };
  
    experienceOptions: string[];
    drivingLicenseOptions: string[];
  
    upload: {
      hint: string;
      removeLabel: string;
    };
  
    validation: {
      requiredFields: string;
      fileRequired: string;
      privacyRequired: string;
      invalidFileType: string;
      fileTooLarge: string;
      submitError: string;
    };
  
    success: {
      title: string;
      text: string;
    };
  };