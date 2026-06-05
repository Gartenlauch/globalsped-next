"use client";
import { httpsCallable } from "firebase/functions";
import { functions, storage } from "@/lib/firebase/client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Mail,
  Package,
  Plus,
  Send,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getTransportRequestContent } from "@/content/forms/transport";


const initialTransport = {
  pickupLocation: "",
  deliveryCountry: "",
  destinationCity: "",
  loadingMeters: "",
  goodsDescription: "",
  vehicleType: "",
  pickupDate: "",
  adrClass: "",
  unNumber: "",
  packingGroup: "",
  adrPoints: "",
  limitedQuantity: "",
  temperatureControlled: "",
  notes: "",
};

const initialContact = {
  company: "",
  contactPerson: "",
  email: "",
  phone: "",
  country: "",
  message: "",
  privacy: false,
};

const allowedUploadTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const maxUploadSize = 10 * 1024 * 1024;



type Props = {
  locale: string;
};

type ShipmentType = "ltl" | "loadingMeters" | "ftl";

type Unit = {
  packagingType: string;
  quantity: number;
  length: number;
  width: number;
  height: number;
  weight: number;
};

type UploadedFileMeta = {
  name: string;
  path: string;
  downloadUrl: string;
  contentType: string;
  size: number;
};

type UploadKind = "standardDocs" | "adrDocs";

export function TransportRequestPage({ locale }: Props) {
  const t = getTransportRequestContent(locale);
  const createInitialUnits = () => [
    {
      packagingType: t.packagingTypes[0],
      quantity: 1,
      length: 120,
      width: 80,
      height: 120,
      weight: 0,
    },
  ];
  const formTopRef = useRef<HTMLDivElement>(null);

  const pickupLocationRef = useRef<HTMLInputElement>(null);
  const deliveryCountryRef = useRef<HTMLSelectElement>(null);
  const loadingMetersRef = useRef<HTMLInputElement>(null);
  const vehicleTypeRef = useRef<HTMLSelectElement>(null);

  const companyRef = useRef<HTMLInputElement>(null);
  const contactPersonRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);



  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [shipmentType, setShipmentType] = useState<ShipmentType>("ltl");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transport, setTransport] = useState(initialTransport);
  const [contact, setContact] = useState(initialContact);
  const [units, setUnits] = useState<Unit[]>(createInitialUnits);
  const [standardDocs, setStandardDocs] = useState<File[]>([]);
  const [adrDocs, setAdrDocs] = useState<File[]>([]);

  const selectedAdrClass = useMemo(
    () => t.adrClasses.find((item) => item.value === transport.adrClass),
    [t.adrClasses, transport.adrClass]
  );

  const selectedTemperature = useMemo(
    () =>
      t.temperatureOptions.find(
        (item) => item.value === transport.temperatureControlled
      ),
    [t.temperatureOptions, transport.temperatureControlled]
  );

  const destinationCityOptions = useMemo(() => {
    return t.destinationCities[transport.deliveryCountry] ?? [];
  }, [t.destinationCities, transport.deliveryCountry]);

  const totals = useMemo(() => {
    const totalWeight = units.reduce(
      (sum, unit) =>
        sum + Number(unit.weight || 0) * Number(unit.quantity || 0),
      0
    );

    const totalVolume = units.reduce((sum, unit) => {
      const volume =
        (Number(unit.length || 0) *
          Number(unit.width || 0) *
          Number(unit.height || 0)) /
        1_000_000;

      return sum + volume * Number(unit.quantity || 0);
    }, 0);

    const pieces = units.reduce(
      (sum, unit) => sum + Number(unit.quantity || 0),
      0
    );

    return {
      totalWeight,
      totalVolume,
      pieces,
    };
  }, [units]);

  const showVolume = shipmentType === "ltl";

  useEffect(() => {
    formTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [step]);

  const scrollToInvalidField = (field: string) => {
    const fieldRefs: Record<string, React.RefObject<HTMLElement | null>> = {
      pickupLocation: pickupLocationRef,
      deliveryCountry: deliveryCountryRef,
      loadingMeters: loadingMetersRef,
      vehicleType: vehicleTypeRef,
      company: companyRef,
      contactPerson: contactPersonRef,
      email: emailRef,
      phone: phoneRef,
      privacy: privacyRef,
    };

    window.setTimeout(() => {
      const element = fieldRefs[field]?.current;

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.focus({
        preventScroll: true,
      });
    }, 80);
  };

  const hasFieldError = (field: string) => invalidFields.includes(field);

  const getInputClassName = (field: string, additionalClasses = "") => {
    return [
      "input-premium",
      additionalClasses,
      hasFieldError(field)
        ? "border-red-300 bg-red-50 text-red-950 shadow-[0_0_0_4px_rgba(252,165,165,0.18)]"
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const updateTransport = (key: keyof typeof transport, value: string) => {
    setTransport((current) => ({
      ...current,
      [key]: value,
    }));

    setInvalidFields((current) => current.filter((field) => field !== key));
  };

  const updateAdrClass = (value: string) => {
    setTransport((current) => ({
      ...current,
      adrClass: value,
      unNumber: value ? current.unNumber : "",
      packingGroup: value ? current.packingGroup : "",
      adrPoints: value ? current.adrPoints : "",
      limitedQuantity: value ? current.limitedQuantity : "",
    }));
    if (!value) {
      setAdrDocs([]);
    }
  };

  const updateAdrPoints = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const limitedValue = Math.min(Number(numericValue || 0), 1000);

    setTransport((current) => ({
      ...current,
      adrPoints: numericValue ? String(limitedValue) : "",
    }));
  };

  const updateUnNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    setTransport((current) => ({
      ...current,
      unNumber: digits ? `UN ${digits}` : "",
    }));
  };

  const updateDeliveryCountry = (value: string) => {
    setTransport((current) => ({
      ...current,
      deliveryCountry: value,
      destinationCity: "",
    }));

    setInvalidFields((current) =>
      current.filter(
        (field) => field !== "deliveryCountry" && field !== "destinationCity"
      )
    );
  };

  const updateContact = (key: keyof typeof contact, value: string | boolean) => {
    setContact((current) => ({
      ...current,
      [key]: value,
    }));

    setInvalidFields((current) => current.filter((field) => field !== key));
  };

  const updateUnit = (index: number, key: keyof Unit, value: string) => {
    setUnits((current) =>
      current.map((unit, unitIndex) =>
        unitIndex === index
          ? {
            ...unit,
            [key]:
              key === "packagingType"
                ? value
                : Number(value.replace(",", ".")),
          }
          : unit
      )
    );
  };

  const getTotalFileSize = (files: File[]) => {
    return files.reduce((sum, file) => sum + file.size, 0);
  };

  const updateFiles = (kind: UploadKind, selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const currentFiles = kind === "standardDocs" ? standardDocs : adrDocs;
    const nextFiles = [...currentFiles, ...newFiles];

    const hasInvalidType = nextFiles.some(
      (file) => !allowedUploadTypes.includes(file.type)
    );

    if (hasInvalidType) {
      setValidationMessage(t.validation.fileType);
      return;
    }

    if (getTotalFileSize(nextFiles) > maxUploadSize) {
      setValidationMessage(t.validation.fileSize);
      return;
    }

    setValidationMessage("");

    if (kind === "standardDocs") {
      setStandardDocs(nextFiles);
      return;
    }

    setAdrDocs(nextFiles);
  };

  const removeFile = (kind: UploadKind, fileIndex: number) => {
    if (kind === "standardDocs") {
      setStandardDocs((current) =>
        current.filter((_, index) => index !== fileIndex)
      );
      return;
    }

    setAdrDocs((current) => current.filter((_, index) => index !== fileIndex));
  };

  const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  };

  const uploadTransportFiles = async (
    requestId: string,
    kind: UploadKind,
    files: File[]
  ): Promise<UploadedFileMeta[]> => {
    const uploads = files.map(async (file) => {
      const cleanFileName = sanitizeFileName(file.name);
      const filePath = `transportRequest/${requestId}/${kind}/${cleanFileName}`;
      const fileRef = ref(storage, filePath);

      await uploadBytes(fileRef, file, {
        contentType: file.type,
      });

      const downloadUrl = await getDownloadURL(fileRef);

      return {
        name: file.name,
        path: filePath,
        downloadUrl,
        contentType: file.type,
        size: file.size,
      };
    });

    return Promise.all(uploads);
  };

  const addUnit = () => {
    setUnits((current) => [
      ...current,
      {
        packagingType: t.packagingTypes[0],
        quantity: 1,
        length: 120,
        width: 80,
        height: 120,
        weight: 0,
      },
    ]);
  };

  const removeUnit = (index: number) => {
    setUnits((current) => current.filter((_, unitIndex) => unitIndex !== index));
  };

  const validateStepOne = () => {
    const errors: string[] = [];

    if (!transport.pickupLocation) {
      errors.push("pickupLocation");
    }

    if (!transport.deliveryCountry) {
      errors.push("deliveryCountry");
    }

    if (shipmentType === "ltl") {
      const invalidUnit = units.some(
        (unit) =>
          !unit.packagingType ||
          !unit.quantity ||
          !unit.length ||
          !unit.width ||
          !unit.height ||
          !unit.weight
      );

      if (invalidUnit) {
        errors.push("units");
      }
    }

    if (shipmentType === "loadingMeters" && !transport.loadingMeters) {
      errors.push("loadingMeters");
    }

    if (shipmentType === "ftl" && !transport.vehicleType) {
      errors.push("vehicleType");
    }

    if (errors.length > 0) {
      setInvalidFields(errors);
      setValidationMessage(t.validation.requiredFields);
      scrollToInvalidField(errors[0]);
      return false;
    }

    setInvalidFields([]);
    setValidationMessage("");
    return true;
  };

  const validateStepTwo = () => {
    const errors: string[] = [];

    if (!contact.company) {
      errors.push("company");
    }

    if (!contact.contactPerson) {
      errors.push("contactPerson");
    }

    if (!contact.email) {
      errors.push("email");
    }

    if (!contact.phone) {
      errors.push("phone");
    }

    if (!contact.privacy) {
      errors.push("privacy");
    }

    if (errors.length > 0) {
      setInvalidFields(errors);
      setValidationMessage(
        errors.includes("privacy")
          ? t.validation.privacyRequired
          : t.validation.requiredFields
      );
      scrollToInvalidField(errors[0]);
      return false;
    }

    setInvalidFields([]);
    setValidationMessage("");
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStepOne()) return;
    if (step === 2 && !validateStepTwo()) return;

    setStep((current) => Math.min(current + 1, 3));
  };

  const previousStep = () => {
    setValidationMessage("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const resetForm = () => {
    setSubmitted(false);
    setValidationMessage("");
    setInvalidFields([]);
    setStep(1);
    setShipmentType("ltl");
    setTransport(initialTransport);
    setContact(initialContact);
    setUnits(createInitialUnits());
    setStandardDocs([]);
    setAdrDocs([]);
    setIsSubmitting(false);
    window.setTimeout(() => {
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const submitRequest = async () => {
    if (!validateStepTwo()) {
      setStep(2);
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    setValidationMessage("");

    try {
      const requestId = crypto.randomUUID();

      const [uploadedStandardDocs, uploadedAdrDocs] = await Promise.all([
        uploadTransportFiles(requestId, "standardDocs", standardDocs),
        selectedAdrClass
          ? uploadTransportFiles(requestId, "adrDocs", adrDocs)
          : Promise.resolve([]),
      ]);

      const submitTransportLead = httpsCallable(
        functions,
        "submitTransportLead"
      );
      await submitTransportLead({
        locale,
        pagePath: `/${locale}/transport-anfrage`,

        contact,

        transport: {
          ...transport,
          shipmentType,
          adrClassValue: transport.adrClass,
          adrClass: selectedAdrClass?.label ?? "",
          adrDescription: selectedAdrClass?.description ?? "",
          unNumber: transport.unNumber,
          packingGroup: transport.packingGroup,
          adrPoints: transport.adrPoints,
          limitedQuantity: transport.limitedQuantity,
          temperatureControlled: selectedTemperature?.label ?? "",
        },

        cargo: {
          units,
          totalWeight: totals.totalWeight,
          totalVolume: showVolume ? totals.totalVolume : null,
          pieces: totals.pieces,
        },
        documents: {
          standardDocs: uploadedStandardDocs,
          adrDocs: uploadedAdrDocs,
        },
      });

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setValidationMessage(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-global-deep)] text-white">
      <section className="relative overflow-hidden px-5 py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-lime-300">
              {t.badge}
            </p>

            <h1 className="mt-4 text-4xl font-black uppercase leading-tight md:text-6xl">
              {t.title}{" "}
              <span className="text-lime-300">{t.highlight}</span>
            </h1>

            <p className="mt-5 whitespace-pre-line text-base leading-7 text-white/72 md:text-lg">
              {t.intro}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]" ref={formTopRef}>
            <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-7">
              <div className="mb-7 grid gap-3 md:grid-cols-3">
                {[t.steps.transport, t.steps.contact, t.steps.summary].map(
                  (label, index) => {
                    const active = step === index + 1;
                    const done = step > index + 1;

                    return (
                      <div
                        key={label}
                        className={`rounded-2xl border px-4 py-3 text-sm font-black uppercase tracking-wide transition ${active
                          ? "border-lime-300/45 bg-lime-300/12 text-white"
                          : done
                            ? "border-lime-300/25 bg-lime-300/8 text-white/80"
                            : "border-white/10 bg-white/5 text-white/45"
                          }`}
                      >
                        <span className="mr-2 text-lime-300">{index + 1}</span>
                        {label}
                      </div>
                    );
                  }
                )}
              </div>

              {validationMessage && (
                <div className="mb-5 rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
                  {validationMessage}
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <Truck className="text-lime-300" />
                    <h2 className="text-2xl font-black uppercase">
                      {t.steps.transport}
                    </h2>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <Field label={t.labels.pickupLocation}>
                      <div className="relative">
                        <input
                          ref={pickupLocationRef}
                          list="europe-countries"
                          value={transport.pickupLocation}
                          onChange={(event) =>
                            updateTransport("pickupLocation", event.target.value)
                          }
                          placeholder={t.placeholders.pickupLocation}
                          className={getInputClassName("pickupLocation", "pr-11")}
                        />

                        {transport.pickupLocation && (
                          <button
                            type="button"
                            onClick={() => updateTransport("pickupLocation", "")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-emerald-950/50 transition hover:bg-emerald-950/10 hover:text-emerald-950"
                            aria-label="Abholort löschen"
                          >
                            <X size={18} strokeWidth={2.75} />
                          </button>
                        )}
                      </div>

                      <datalist id="europe-countries">
                        {t.europeanCountries.map((country) => (
                          <option key={country} value={country} />
                        ))}
                      </datalist>

                      <FieldHint>{t.hints.pickupLocation}</FieldHint>
                    </Field>

                    <Field label={t.labels.deliveryCountry}>
                      <div className="relative">
                        <select
                          ref={deliveryCountryRef}
                          value={transport.deliveryCountry}
                          onChange={(event) =>
                            updateDeliveryCountry(event.target.value)
                          }
                          className={getInputClassName("deliveryCountry", "pr-11")}
                        >
                          {t.destinationCountries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>

                        {transport.deliveryCountry && (
                          <button
                            type="button"
                            onClick={() => updateDeliveryCountry("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-emerald-950/50 transition hover:bg-emerald-950/10 hover:text-emerald-950"
                            aria-label="Zustellland löschen"
                          >
                            <X size={18} strokeWidth={2.75} />
                          </button>
                        )}
                      </div>

                      <FieldHint>&nbsp;</FieldHint>
                    </Field>

                    <Field label={t.labels.destinationCity}>
                      <div className="relative">
                        <input
                          list="destination-cities"
                          value={transport.destinationCity}
                          onChange={(event) =>
                            updateTransport("destinationCity", event.target.value)
                          }
                          placeholder={t.placeholders.destinationCity}
                          disabled={!transport.deliveryCountry}
                          className="input-premium pr-11 disabled:cursor-not-allowed disabled:opacity-45"
                        />

                        {transport.destinationCity && (
                          <button
                            type="button"
                            onClick={() => updateTransport("destinationCity", "")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-emerald-950/50 transition hover:bg-emerald-950/10 hover:text-emerald-950"
                            aria-label="Zielstadt löschen"
                          >
                            <X size={18} strokeWidth={2.75} />
                          </button>
                        )}
                      </div>

                      <datalist id="destination-cities">
                        {destinationCityOptions.map((city) => (
                          <option key={city} value={city} />
                        ))}
                      </datalist>

                      <FieldHint>
                        {transport.deliveryCountry
                          ? t.hints.destinationCity
                          : " "}
                      </FieldHint>
                    </Field>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-sm font-black uppercase tracking-wide text-white/74">
                      {t.labels.shipmentType}
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                      {(
                        [
                          ["ltl", t.shipmentTypes.ltl, Package],
                          [
                            "loadingMeters",
                            t.shipmentTypes.loadingMeters,
                            ClipboardList,
                          ],
                          ["ftl", t.shipmentTypes.ftl, Truck],
                        ] as const
                      ).map(([value, label, Icon]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setShipmentType(value)}
                          className={`rounded-2xl border p-4 text-left transition ${shipmentType === value
                            ? "border-lime-300/50 bg-lime-300/12 shadow-[0_0_30px_rgba(163,230,53,0.12)]"
                            : "border-white/12 bg-white/5 hover:border-lime-300/30"
                            }`}
                        >
                          <Icon className="mb-3 text-lime-300" size={22} />
                          <span className="text-sm font-black uppercase">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {shipmentType === "ltl" && (
                    <div className="mt-6 grid gap-4">
                      {units.map((unit, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="mb-4 flex items-center justify-between gap-4">
                            <h3 className="font-black uppercase text-lime-300">
                              Packstück {index + 1}
                            </h3>

                            {units.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeUnit(index)}
                                className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-lime-300"
                              >
                                <Trash2 size={16} />
                                {t.labels.removeUnit}
                              </button>
                            )}
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <Field label={t.labels.packagingType}>
                              <select
                                value={unit.packagingType}
                                onChange={(event) =>
                                  updateUnit(
                                    index,
                                    "packagingType",
                                    event.target.value
                                  )
                                }
                                className="input-premium"
                              >
                                {t.packagingTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </Field>

                            <Field label={t.labels.quantity}>
                              <input
                                type="number"
                                value={unit.quantity}
                                onChange={(event) =>
                                  updateUnit(
                                    index,
                                    "quantity",
                                    event.target.value
                                  )
                                }
                                className="input-premium"
                              />
                            </Field>

                            <Field label={t.labels.weight}>
                              <input
                                type="number"
                                value={unit.weight}
                                onChange={(event) =>
                                  updateUnit(index, "weight", event.target.value)
                                }
                                className="input-premium"
                              />
                            </Field>

                            <Field label={t.labels.length}>
                              <input
                                type="number"
                                value={unit.length}
                                onChange={(event) =>
                                  updateUnit(index, "length", event.target.value)
                                }
                                className="input-premium"
                              />
                            </Field>

                            <Field label={t.labels.width}>
                              <input
                                type="number"
                                value={unit.width}
                                onChange={(event) =>
                                  updateUnit(index, "width", event.target.value)
                                }
                                className="input-premium"
                              />
                            </Field>

                            <Field label={t.labels.height}>
                              <input
                                type="number"
                                value={unit.height}
                                onChange={(event) =>
                                  updateUnit(index, "height", event.target.value)
                                }
                                className="input-premium"
                              />
                            </Field>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addUnit}
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-lime-300/30 px-5 py-3 text-sm font-black uppercase tracking-wide text-lime-300 transition hover:bg-lime-300/10"
                      >
                        <Plus size={17} />
                        {t.labels.addUnit}
                      </button>
                    </div>
                  )}

                  {shipmentType === "loadingMeters" && (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <Field label={t.labels.loadingMeters}>
                        <input
                          type="number"
                          value={transport.loadingMeters}
                          onChange={(event) =>
                            updateTransport("loadingMeters", event.target.value)
                          }
                          className="input-premium"
                        />
                      </Field>

                      <Field label={t.labels.weight}>
                        <input
                          type="number"
                          value={units[0]?.weight ?? 0}
                          onChange={(event) =>
                            updateUnit(0, "weight", event.target.value)
                          }
                          className="input-premium"
                        />
                      </Field>
                    </div>
                  )}

                  {shipmentType === "ftl" && (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <Field label={t.labels.vehicleType}>
                        <select
                          ref={vehicleTypeRef}
                          value={transport.vehicleType}
                          onChange={(event) =>
                            updateTransport("vehicleType", event.target.value)
                          }
                          className={getInputClassName("vehicleType")}
                        >
                          <option value="">Bitte wählen</option>
                          {t.vehicleTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label={t.labels.weight}>
                        <input
                          type="number"
                          value={units[0]?.weight ?? 0}
                          onChange={(event) =>
                            updateUnit(0, "weight", event.target.value)
                          }
                          className="input-premium"
                        />
                      </Field>
                    </div>
                  )}

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Field label={t.labels.pickupDate}>
                      <input
                        type="date"
                        value={transport.pickupDate}
                        onChange={(event) =>
                          updateTransport("pickupDate", event.target.value)
                        }
                        className="input-premium min-w-0 max-w-full appearance-none"
                      />
                    </Field>

                    <Field label={t.labels.goodsDescription}>
                      <input
                        value={transport.goodsDescription}
                        onChange={(event) =>
                          updateTransport("goodsDescription", event.target.value)
                        }
                        placeholder={t.placeholders.goodsDescription}
                        className="input-premium"
                      />
                    </Field>
                    <Field label={t.labels.dangerousGoods}>
                      <select
                        value={transport.adrClass}
                        onChange={(event) => updateAdrClass(event.target.value)}
                        className="input-premium"
                      >
                        <option value="">{t.labels.noneADR}</option>
                        {t.adrClasses.map((adrClass) => (
                          <option key={adrClass.value} value={adrClass.value}>
                            {adrClass.label}
                          </option>
                        ))}
                      </select>

                      <FieldHint>{t.hints.adrUnavailable}</FieldHint>
                    </Field>

                    <Field label={t.labels.temperatureControlled}>
                      <select
                        value={transport.temperatureControlled}
                        onChange={(event) =>
                          updateTransport("temperatureControlled", event.target.value)
                        }
                        className="input-premium"
                      >
                        <option value="">{t.labels.noneThermo}</option>
                        {t.temperatureOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <FieldHint>{t.hints.temperatureControlled}</FieldHint>
                    </Field>

                    {selectedAdrClass && (
                      <>
                        <AdrDetailsFields
                          transport={transport}
                          t={t}
                          updateTransport={(key, value) => updateTransport(key, value)}
                          updateUnNumber={updateUnNumber}
                          updateAdrPoints={updateAdrPoints}
                        />

                        <div className="rounded-2xl border border-lime-300/20 bg-lime-300/8 px-4 py-3 text-sm leading-6 text-white/78 md:col-span-2">
                          <strong className="mr-2 text-lime-300">
                            {selectedAdrClass.label}
                          </strong>
                          <span>{selectedAdrClass.description}</span>
                        </div>
                        <div className="md:col-span-2">
                          <FileUploadField
                            label={t.labels.adrDocs}
                            hint={t.hints.adrDocs}
                            removeLabel={t.labels.removeFile}
                            formatsHint={t.hints.uploadFormats}
                            files={adrDocs}
                            onChange={(files) => updateFiles("adrDocs", files)}
                            onRemove={(index) => removeFile("adrDocs", index)}
                          />
                        </div>
                      </>
                    )}

                  </div>
                  <div className="mt-6">
                    <FileUploadField
                      label={t.labels.standardDocs}
                      removeLabel={t.labels.removeFile}
                      hint={t.hints.standardDocs}
                      formatsHint={t.hints.uploadFormats}
                      files={standardDocs}
                      onChange={(files) => updateFiles("standardDocs", files)}
                      onRemove={(index) => removeFile("standardDocs", index)}
                    />
                  </div>
                  <div className="mt-6">
                    <Field label={t.labels.notes}>
                      <textarea
                        value={transport.notes}
                        onChange={(event) =>
                          updateTransport("notes", event.target.value)
                        }
                        placeholder={t.placeholders.notes}
                        rows={3}
                        className="input-premium resize-none"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <Mail className="text-lime-300" />
                    <h2 className="text-2xl font-black uppercase">
                      {t.steps.contact}
                    </h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t.labels.company}>
                      <input
                        ref={companyRef}
                        value={contact.company}
                        onChange={(event) =>
                          updateContact("company", event.target.value)
                        }
                        placeholder={t.placeholders.company}
                        className={getInputClassName("company")}
                      />
                    </Field>

                    <Field label={t.labels.contactPerson}>
                      <input
                        ref={contactPersonRef}
                        value={contact.contactPerson}
                        onChange={(event) =>
                          updateContact("contactPerson", event.target.value)
                        }
                        placeholder={t.placeholders.contactPerson}
                        className={getInputClassName("contactPerson")}
                      />
                    </Field>

                    <Field label={t.labels.email}>
                      <input
                        ref={emailRef}
                        type="email"
                        value={contact.email}
                        onChange={(event) =>
                          updateContact("email", event.target.value)
                        }
                        placeholder={t.placeholders.email}
                        className={getInputClassName("email")}
                      />
                    </Field>

                    <Field label={t.labels.phone}>
                      <input
                        ref={phoneRef}
                        value={contact.phone}
                        onChange={(event) =>
                          updateContact("phone", event.target.value)
                        }
                        placeholder={t.placeholders.phone}
                        className={getInputClassName("phone")}
                      />
                    </Field>

                    <Field label={t.labels.country}>
                      <input
                        value={contact.country}
                        onChange={(event) =>
                          updateContact("country", event.target.value)
                        }
                        className="input-premium"
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label={t.labels.message}>
                      <textarea
                        value={contact.message}
                        onChange={(event) =>
                          updateContact("message", event.target.value)
                        }
                        placeholder={t.placeholders.message}
                        rows={4}
                        className="input-premium resize-none"
                      />
                    </Field>
                  </div>

                  <label
                    className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6 text-white/78 transition ${hasFieldError("privacy")
                      ? "border-red-300/60 bg-red-500/10"
                      : "border-white/10 bg-white/5"
                      }`}
                  >
                    <input
                      ref={privacyRef}
                      type="checkbox"
                      checked={contact.privacy}
                      onChange={(event) =>
                        updateContact("privacy", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-lime-300"
                    />

                    <span>{t.labels.privacy}</span>
                  </label>
                </div>
              )}


              {step === 3 && (
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <ClipboardList className="text-lime-300" />
                    <h2 className="text-2xl font-black uppercase">
                      {t.summary.title}
                    </h2>
                  </div>

                  <SummaryBlock title={t.summary.transportData}>
                    <SummaryLine
                      label={t.labels.pickupLocation}
                      value={transport.pickupLocation}
                    />
                    <SummaryLine
                      label={t.labels.deliveryCountry}
                      value={transport.deliveryCountry}
                    />
                    <SummaryLine
                      label={t.labels.destinationCity}
                      value={transport.destinationCity || "-"}
                    />
                    <SummaryLine
                      label={t.labels.shipmentType}
                      value={t.shipmentTypes[shipmentType]}
                    />
                    {shipmentType === "loadingMeters" && (
                      <SummaryLine
                        label={t.labels.loadingMeters}
                        value={`${transport.loadingMeters} m`}
                      />
                    )}
                    <SummaryLine
                      label={t.labels.pickupDate}
                      value={transport.pickupDate || "-"}
                    />
                  </SummaryBlock>

                  <SummaryBlock title={t.summary.goodsData}>
                    <SummaryLine
                      label={t.summary.pieces}
                      value={`${totals.pieces}`}
                    />
                    <SummaryLine
                      label={t.summary.totalWeight}
                      value={`${totals.totalWeight.toLocaleString("de-DE")} kg`}
                    />
                    {showVolume && (
                      <SummaryLine
                        label={t.summary.totalVolume}
                        value={`${totals.totalVolume.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                        })} m³`}
                      />
                    )}
                    <SummaryLine
                      label={t.labels.goodsDescription}
                      value={transport.goodsDescription || "-"}
                    />

                    <SummaryLine
                      label={t.labels.standardDocs}
                      value={standardDocs.length ? `${standardDocs.length}` : "-"}
                    />
                    <SummaryLine
                      label={t.labels.dangerousGoods}
                      value={
                        selectedAdrClass
                          ? `${selectedAdrClass.label}: ${selectedAdrClass.description}`
                          : t.labels.noneADR
                      }
                    />
                    {selectedAdrClass && (
                      <>
                        <SummaryLine
                          label={t.labels.unNumber}
                          value={transport.unNumber || "-"}
                        />
                        <SummaryLine
                          label={t.labels.packingGroup}
                          value={transport.packingGroup || "-"}
                        />
                        <SummaryLine
                          label={t.labels.adrPoints}
                          value={transport.adrPoints || "-"}
                        />
                        <SummaryLine
                          label={t.labels.limitedQuantity}
                          value={transport.limitedQuantity || "-"}
                        />
                        <SummaryLine
                          label={t.labels.adrDocs}
                          value={adrDocs.length ? `${adrDocs.length}` : "-"}
                        />
                      </>
                    )}
                    <SummaryLine
                      label={t.labels.temperatureControlled}
                      value={selectedTemperature?.label ?? t.labels.noneThermo}
                    />
                  </SummaryBlock>

                  <SummaryBlock title={t.summary.contactData}>
                    <SummaryLine
                      label={t.labels.company}
                      value={contact.company}
                    />
                    <SummaryLine
                      label={t.labels.contactPerson}
                      value={contact.contactPerson}
                    />
                    <SummaryLine label={t.labels.email} value={contact.email} />
                    <SummaryLine label={t.labels.phone} value={contact.phone} />
                  </SummaryBlock>
                </div>
              )}

              <div className="mt-8 flex flex-wrap justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
                  >
                    <ArrowLeft size={17} />
                    {t.labels.back}
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    {t.labels.next}
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitRequest}
                    disabled={isSubmitting}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : t.labels.submit}
                    <Send size={17} />
                  </button>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] border border-white/12 bg-[rgba(0,40,31,0.72)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.30)] backdrop-blur-xl lg:sticky lg:top-28">
              <h3 className="text-xl font-black uppercase text-lime-300">
                {t.summary.title}
              </h3>

              <div className="mt-5 grid gap-3 text-sm">
                <SummaryLine
                  label={t.labels.pickupLocation}
                  value={transport.pickupLocation || "-"}
                />
                <SummaryLine
                  label={t.labels.deliveryCountry}
                  value={transport.deliveryCountry || "-"}
                />
                <SummaryLine
                  label={t.labels.destinationCity}
                  value={transport.destinationCity || "-"}
                />
                <SummaryLine
                  label={t.labels.shipmentType}
                  value={t.shipmentTypes[shipmentType]}
                />
                {shipmentType === "loadingMeters" && (
                  <SummaryLine
                    label={t.labels.loadingMeters}
                    value={
                      transport.loadingMeters
                        ? `${transport.loadingMeters} m`
                        : "-"
                    }
                  />
                )}
                <SummaryLine
                  label={t.summary.pieces}
                  value={`${totals.pieces}`}
                />
                <SummaryLine
                  label={t.summary.totalWeight}
                  value={`${totals.totalWeight.toLocaleString("de-DE")} kg`}
                />
                {showVolume && (
                  <SummaryLine
                    label={t.summary.totalVolume}
                    value={`${totals.totalVolume.toLocaleString("de-DE", {
                      maximumFractionDigits: 2,
                    })} m³`}
                  />
                )}
                <SummaryLine
                  label={t.labels.goodsDescription}
                  value={transport.goodsDescription || "-"}
                />
                <SummaryLine
                  label={t.labels.standardDocs}
                  value={standardDocs.length ? `${standardDocs.length}` : "-"}
                />
                {selectedAdrClass && (
                  <>
                    <SummaryLine
                      label={t.labels.dangerousGoods}
                      value={`${selectedAdrClass.label}: ${selectedAdrClass.description}`}
                    />

                    <SummaryLine
                      label={t.labels.unNumber}
                      value={transport.unNumber || "-"}
                    />
                    <SummaryLine
                      label={t.labels.packingGroup}
                      value={transport.packingGroup || "-"}
                    />
                    <SummaryLine
                      label={t.labels.adrPoints}
                      value={transport.adrPoints || "-"}
                    />
                    <SummaryLine
                      label={t.labels.limitedQuantity}
                      value={transport.limitedQuantity || "-"}
                    />
                    <SummaryLine
                      label={t.labels.adrDocs}
                      value={adrDocs.length ? `${adrDocs.length}` : "-"}
                    />
                  </>
                )}

                {selectedTemperature && (
                  <SummaryLine
                    label={t.labels.temperatureControlled}
                    value={selectedTemperature.label}
                  />
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {submitted && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="max-w-[520px] rounded-[32px] border border-lime-300/25 bg-[var(--color-global-deep)] p-8 text-center shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
            <CheckCircle2 className="mx-auto text-lime-300" size={54} />

            <h2 className="mt-5 text-3xl font-black uppercase text-white">
              {t.success.title}
            </h2>

            <p className="mt-4 text-base leading-7 text-white/78">
              {t.success.text}
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="btn-primary mt-7"
            >
              {t.success.close}
              <X size={17} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-black uppercase tracking-wide text-white/74">
      {label}
      {children}
    </label>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <span className="min-h-[38px] text-xs font-medium normal-case leading-5 tracking-normal text-white/48">
      {children}
    </span>
  );
}

function AdrDetailsFields({
  transport,
  t,
  updateTransport,
  updateUnNumber,
  updateAdrPoints,
}: {
  transport: {
    unNumber: string;
    packingGroup: string;
    adrPoints: string;
    limitedQuantity: string;
  };
  t: ReturnType<typeof getTransportRequestContent>;
  updateTransport: (
    key: "packingGroup" | "limitedQuantity",
    value: string
  ) => void;
  updateUnNumber: (value: string) => void;
  updateAdrPoints: (value: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label={t.labels.unNumber}>
          <input
            value={transport.unNumber}
            onChange={(event) => updateUnNumber(event.target.value)}
            placeholder={t.placeholders.unNumber}
            inputMode="numeric"
            className="input-premium min-w-0 max-w-full"
          />
        </Field>

        <Field label={t.labels.packingGroup}>
          <select
            value={transport.packingGroup}
            onChange={(event) =>
              updateTransport("packingGroup", event.target.value)
            }
            className="input-premium min-w-0 max-w-full"
          >
            {t.packingGroups.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.labels.adrPoints}>
          <input
            type="number"
            min={0}
            max={1000}
            value={transport.adrPoints}
            onChange={(event) => updateAdrPoints(event.target.value)}
            placeholder={t.placeholders.adrPoints}
            className="input-premium min-w-0 max-w-full"
          />
        </Field>

        <Field label={t.labels.limitedQuantity}>
          <select
            value={transport.limitedQuantity}
            onChange={(event) =>
              updateTransport("limitedQuantity", event.target.value)
            }
            className="input-premium min-w-0 max-w-full"
          >
            <option value="">{t.labels.pleaseSelect}</option>
            {t.limitedQuantityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}

function FileUploadField({
  label,
  hint,
  formatsHint,
  files,
  removeLabel,
  onChange,
  onRemove,
}: {
  label: string;
  hint: string;
  formatsHint: string;
  files: File[];
  removeLabel: string;
  onChange: (files: FileList | null) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-white/74">
            {label}
          </p>

          <p className="mt-2 text-sm leading-6 text-white/58">{hint}</p>
          <p className="mt-1 text-xs leading-5 text-white/42">{formatsHint}</p>
        </div>

        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(event) => {
            onChange(event.target.files);
            event.currentTarget.value = "";
          }}
          className="block w-full max-w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-lime-300 file:px-5 file:py-3 file:text-sm file:font-black file:uppercase file:text-[var(--color-global-dark)] hover:file:bg-lime-200 md:max-w-[320px]"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-lime-300/20 bg-lime-300/10 px-4 py-3 text-sm text-white/82"
            >
              <span className="min-w-0 truncate">
                {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>

              <button
                type="button"
                aria-label={`${removeLabel}: ${file.name}`}
                onClick={() => onRemove(index)}
                className="shrink-0 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-4 font-black uppercase text-lime-300">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0">
      <span className="text-white/55">{label}</span>
      <span className="text-right font-bold text-white">{value}</span>
    </div>
  );
}