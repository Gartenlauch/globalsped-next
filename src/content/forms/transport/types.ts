export type SelectOption = {
  value: string;
  label: string;
};

export type AdrClassOption = {
  value: string;
  label: string;
  description: string;
};

export type TransportRequestContent = {
  badge: string;
  title: string;
  highlight: string;
  intro: string;

  steps: {
    transport: string;
    contact: string;
    summary: string;
  };

  shipmentTypes: {
    ltl: string;
    loadingMeters: string;
    ftl: string;
  };

  packagingTypes: string[];
  destinationCountries: string[];
  europeanCountries: string[];
  vehicleTypes: string[];
  temperatureOptions: SelectOption[];
  adrClasses: AdrClassOption[];
  destinationCities: Record<string, string[]>;

  labels: {
    pickupLocation: string;
    deliveryCountry: string;
    destinationCity: string;
    shipmentType: string;
    packagingType: string;
    quantity: string;
    length: string;
    width: string;
    height: string;
    weight: string;
    loadingMeters: string;
    goodsDescription: string;
    vehicleType: string;
    pickupDate: string;
    dangerousGoods: string;
    temperatureControlled: string;
    notes: string;
    company: string;
    contactPerson: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    privacy: string;
    yes: string;
    no: string;
    none: string;
    next: string;
    back: string;
    submit: string;
    addUnit: string;
    removeUnit: string;
  };

  hints: {
    adrUnavailable: string;
    destinationCity: string;
    pickupLocation: string;
    temperatureControlled: string;
  };

  placeholders: {
    pickupLocation: string;
    destinationCity: string;
    goodsDescription: string;
    notes: string;
    company: string;
    contactPerson: string;
    email: string;
    phone: string;
    message: string;
  };

  summary: {
    title: string;
    transportData: string;
    goodsData: string;
    contactData: string;
    totalWeight: string;
    totalVolume: string;
    pieces: string;
  };

  success: {
    title: string;
    text: string;
    close: string;
  };

  validation: {
    requiredFields: string;
    privacyRequired: string;
  };
};