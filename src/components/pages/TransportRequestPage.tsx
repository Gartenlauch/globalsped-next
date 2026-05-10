"use client";

import { useMemo, useState } from "react";
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
import { getTransportRequestContent } from "@/content/forms/transport";

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

export function TransportRequestPage({ locale }: Props) {
  const t = getTransportRequestContent(locale);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const [shipmentType, setShipmentType] = useState<ShipmentType>("ltl");

  const [transport, setTransport] = useState({
    pickupLocation: "",
    deliveryCountry: "",
    loadingMeters: "",
    goodsDescription: "",
    vehicleType: "",
    pickupDate: "",
    stackable: "no",
    dangerousGoods: "no",
    temperatureControlled: "no",
    notes: "",
  });

  const [contact, setContact] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    privacy: false,
  });

  const [units, setUnits] = useState<Unit[]>([
    {
      packagingType: t.packagingTypes[0],
      quantity: 1,
      length: 120,
      width: 80,
      height: 120,
      weight: 0,
    },
  ]);

  const totals = useMemo(() => {
    const totalWeight = units.reduce(
      (sum, unit) => sum + Number(unit.weight || 0) * Number(unit.quantity || 0),
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

  const updateTransport = (key: keyof typeof transport, value: string) => {
    setTransport((current) => ({ ...current, [key]: value }));
  };

  const updateContact = (
    key: keyof typeof contact,
    value: string | boolean
  ) => {
    setContact((current) => ({ ...current, [key]: value }));
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
    if (!transport.pickupLocation || !transport.deliveryCountry) {
      setValidationMessage(t.validation.requiredFields);
      return false;
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
        setValidationMessage(t.validation.requiredFields);
        return false;
      }
    }

    if (shipmentType === "loadingMeters" && !transport.loadingMeters) {
      setValidationMessage(t.validation.requiredFields);
      return false;
    }

    if (shipmentType === "ftl" && !transport.vehicleType) {
      setValidationMessage(t.validation.requiredFields);
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const validateStepTwo = () => {
    if (
      !contact.company ||
      !contact.contactPerson ||
      !contact.email ||
      !contact.phone
    ) {
      setValidationMessage(t.validation.requiredFields);
      return false;
    }

    if (!contact.privacy) {
      setValidationMessage(t.validation.privacyRequired);
      return false;
    }

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

  const submitRequest = () => {
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-global-deep)] pt-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(163,230,53,0.14),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.06),transparent_28%)]" />

      <section className="container relative z-10 pb-28">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
            {t.badge}
          </p>

          <h1 className="text-[32px] font-black uppercase leading-[1.05] md:text-[46px]">
            {t.title}
            <span className="block text-lime-300">{t.highlight}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[760px] text-base leading-8 text-white/82 md:text-lg">
            {t.intro}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[1180px]">
          <div className="mb-8 grid gap-3 md:grid-cols-3">
            {[
              t.steps.transport,
              t.steps.contact,
              t.steps.summary,
            ].map((label, index) => {
              const active = step === index + 1;
              const done = step > index + 1;

              return (
                <div
                  key={label}
                  className={`rounded-2xl border px-5 py-4 text-sm font-black uppercase tracking-wide transition ${
                    active || done
                      ? "border-lime-300/40 bg-lime-300/12 text-lime-300"
                      : "border-white/10 bg-white/5 text-white/52"
                  }`}
                >
                  <span className="mr-2">{index + 1}</span>
                  {label}
                </div>
              );
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[32px] border border-white/12 bg-[rgba(0,40,31,0.76)] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
              {validationMessage && (
                <div className="mb-6 rounded-2xl border border-lime-300/25 bg-lime-300/10 px-5 py-4 text-sm font-bold text-lime-300">
                  {validationMessage}
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <Truck className="text-lime-300" />
                    <h2 className="text-2xl font-black uppercase">
                      {t.steps.transport}
                    </h2>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label={t.labels.pickupLocation}>
                      <input
                        value={transport.pickupLocation}
                        onChange={(event) =>
                          updateTransport("pickupLocation", event.target.value)
                        }
                        placeholder={t.placeholders.pickupLocation}
                        className="input-premium"
                      />
                    </Field>

                    <Field label={t.labels.deliveryCountry}>
                      <select
                        value={transport.deliveryCountry}
                        onChange={(event) =>
                          updateTransport("deliveryCountry", event.target.value)
                        }
                        className="input-premium"
                      >
                        <option value="">Bitte wählen</option>
                        {t.destinationCountries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-7">
                    <label className="mb-3 block text-sm font-black uppercase tracking-wide text-white/76">
                      {t.labels.shipmentType}
                    </label>

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
                          className={`rounded-2xl border p-5 text-left transition ${
                            shipmentType === value
                              ? "border-lime-300/50 bg-lime-300/12 shadow-[0_0_30px_rgba(163,230,53,0.12)]"
                              : "border-white/12 bg-white/5 hover:border-lime-300/30"
                          }`}
                        >
                          <Icon className="mb-4 text-lime-300" />
                          <div className="font-black uppercase">{label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {shipmentType === "ltl" && (
                    <div className="mt-8 grid gap-5">
                      {units.map((unit, index) => (
                        <div
                          key={index}
                          className="rounded-3xl border border-white/10 bg-white/5 p-5"
                        >
                          <div className="mb-5 flex items-center justify-between gap-4">
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
                                  updateUnit(index, "quantity", event.target.value)
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
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-lime-300/35 px-6 py-3 text-sm font-black uppercase tracking-wide text-lime-300 transition hover:bg-lime-300/10"
                      >
                        <Plus size={17} />
                        {t.labels.addUnit}
                      </button>
                    </div>
                  )}

                  {shipmentType === "loadingMeters" && (
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
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
                          value={units[0]?.weight || ""}
                          onChange={(event) =>
                            updateUnit(0, "weight", event.target.value)
                          }
                          className="input-premium"
                        />
                      </Field>
                    </div>
                  )}

                  {shipmentType === "ftl" && (
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      <Field label={t.labels.vehicleType}>
                        <select
                          value={transport.vehicleType}
                          onChange={(event) =>
                            updateTransport("vehicleType", event.target.value)
                          }
                          className="input-premium"
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
                          value={units[0]?.weight || ""}
                          onChange={(event) =>
                            updateUnit(0, "weight", event.target.value)
                          }
                          className="input-premium"
                        />
                      </Field>
                    </div>
                  )}

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <Field label={t.labels.pickupDate}>
                      <input
                        type="date"
                        value={transport.pickupDate}
                        onChange={(event) =>
                          updateTransport("pickupDate", event.target.value)
                        }
                        className="input-premium"
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
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-3">
                    {[
                      ["stackable", t.labels.stackable],
                      ["dangerousGoods", t.labels.dangerousGoods],
                      ["temperatureControlled", t.labels.temperatureControlled],
                    ].map(([key, label]) => (
                      <Field key={key} label={label}>
                        <select
                          value={transport[key as keyof typeof transport]}
                          onChange={(event) =>
                            updateTransport(
                              key as keyof typeof transport,
                              event.target.value
                            )
                          }
                          className="input-premium"
                        >
                          <option value="no">{t.labels.no}</option>
                          <option value="yes">{t.labels.yes}</option>
                        </select>
                      </Field>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Field label={t.labels.notes}>
                      <textarea
                        value={transport.notes}
                        onChange={(event) =>
                          updateTransport("notes", event.target.value)
                        }
                        placeholder={t.placeholders.notes}
                        rows={4}
                        className="input-premium resize-none"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <Mail className="text-lime-300" />
                    <h2 className="text-2xl font-black uppercase">
                      {t.steps.contact}
                    </h2>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label={t.labels.company}>
                      <input
                        value={contact.company}
                        onChange={(event) =>
                          updateContact("company", event.target.value)
                        }
                        placeholder={t.placeholders.company}
                        className="input-premium"
                      />
                    </Field>

                    <Field label={t.labels.contactPerson}>
                      <input
                        value={contact.contactPerson}
                        onChange={(event) =>
                          updateContact("contactPerson", event.target.value)
                        }
                        placeholder={t.placeholders.contactPerson}
                        className="input-premium"
                      />
                    </Field>

                    <Field label={t.labels.email}>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(event) =>
                          updateContact("email", event.target.value)
                        }
                        placeholder={t.placeholders.email}
                        className="input-premium"
                      />
                    </Field>

                    <Field label={t.labels.phone}>
                      <input
                        value={contact.phone}
                        onChange={(event) =>
                          updateContact("phone", event.target.value)
                        }
                        placeholder={t.placeholders.phone}
                        className="input-premium"
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

                  <div className="mt-6">
                    <Field label={t.labels.message}>
                      <textarea
                        value={contact.message}
                        onChange={(event) =>
                          updateContact("message", event.target.value)
                        }
                        placeholder={t.placeholders.message}
                        rows={5}
                        className="input-premium resize-none"
                      />
                    </Field>
                  </div>

                  <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
                    <input
                      type="checkbox"
                      checked={contact.privacy}
                      onChange={(event) =>
                        updateContact("privacy", event.target.checked)
                      }
                      className="mt-1"
                    />
                    {t.labels.privacy}
                  </label>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <ClipboardList className="text-lime-300" />
                    <h2 className="text-2xl font-black uppercase">
                      {t.summary.title}
                    </h2>
                  </div>

                  <SummaryBlock title={t.summary.transportData}>
                    <SummaryLine label={t.labels.pickupLocation} value={transport.pickupLocation} />
                    <SummaryLine label={t.labels.deliveryCountry} value={transport.deliveryCountry} />
                    <SummaryLine label={t.labels.shipmentType} value={t.shipmentTypes[shipmentType]} />
                    <SummaryLine label={t.labels.pickupDate} value={transport.pickupDate || "-"} />
                  </SummaryBlock>

                  <SummaryBlock title={t.summary.goodsData}>
                    <SummaryLine label={t.summary.pieces} value={`${totals.pieces}`} />
                    <SummaryLine label={t.summary.totalWeight} value={`${totals.totalWeight.toLocaleString("de-DE")} kg`} />
                    <SummaryLine label={t.summary.totalVolume} value={`${totals.totalVolume.toLocaleString("de-DE", { maximumFractionDigits: 2 })} m³`} />
                    <SummaryLine label={t.labels.goodsDescription} value={transport.goodsDescription || "-"} />
                    <SummaryLine label={t.labels.dangerousGoods} value={transport.dangerousGoods === "yes" ? t.labels.yes : t.labels.no} />
                    <SummaryLine label={t.labels.temperatureControlled} value={transport.temperatureControlled === "yes" ? t.labels.yes : t.labels.no} />
                  </SummaryBlock>

                  <SummaryBlock title={t.summary.contactData}>
                    <SummaryLine label={t.labels.company} value={contact.company} />
                    <SummaryLine label={t.labels.contactPerson} value={contact.contactPerson} />
                    <SummaryLine label={t.labels.email} value={contact.email} />
                    <SummaryLine label={t.labels.phone} value={contact.phone} />
                  </SummaryBlock>
                </div>
              )}

              <div className="mt-10 flex flex-wrap justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
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
                    className="btn-primary"
                  >
                    {t.labels.submit}
                    <Send size={17} />
                  </button>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] border border-white/12 bg-[rgba(0,40,31,0.72)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.30)] backdrop-blur-xl lg:sticky lg:top-28">
              <h3 className="text-xl font-black uppercase text-lime-300">
                {t.summary.title}
              </h3>

              <div className="mt-6 grid gap-4 text-sm">
                <SummaryLine label={t.labels.deliveryCountry} value={transport.deliveryCountry || "-"} />
                <SummaryLine label={t.labels.shipmentType} value={t.shipmentTypes[shipmentType]} />
                <SummaryLine label={t.summary.pieces} value={`${totals.pieces}`} />
                <SummaryLine label={t.summary.totalWeight} value={`${totals.totalWeight.toLocaleString("de-DE")} kg`} />
                <SummaryLine label={t.summary.totalVolume} value={`${totals.totalVolume.toLocaleString("de-DE", { maximumFractionDigits: 2 })} m³`} />
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
              onClick={() => setSubmitted(false)}
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
    <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-white/74">
      {label}
      {children}
    </label>
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