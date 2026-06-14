"use client";

import { useState } from "react";
import Link from "next/link";
import { httpsCallable } from "firebase/functions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  ArrowLeft,
  CheckCircle2,
  FileUp,
  Loader2,
  Send,
  UserRound,
  X,
} from "lucide-react";

import { functions, storage } from "@/lib/firebase/client";
import { getApplicationFormContent } from "@/content/forms/application";

type Props = {
  locale: string;
};

type ApplicationForm = {
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
  privacy: boolean;
};

const initialForm: ApplicationForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  desiredPosition: "",
  experience: "",
  earliestStart: "",
  salaryExpectation: "",
  languages: "",
  hasDrivingLicense: "",
  message: "",
  privacy: false,
};

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const maxFileSize = 10 * 1024 * 1024;

export function ApplicationPage({ locale }: Props) {
  const t = getApplicationFormContent(locale);

  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key: keyof ApplicationForm, value: string | boolean) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleFileChange = (selectedFile?: File) => {
    setValidationMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!allowedFileTypes.includes(selectedFile.type)) {
      setValidationMessage(t.validation.invalidFileType);
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setValidationMessage(t.validation.fileTooLarge);
      return;
    }

    setFile(selectedFile);
  };

  const validate = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.desiredPosition ||
      !form.message
    ) {
      setValidationMessage(t.validation.requiredFields);
      return false;
    }

    if (!file) {
      setValidationMessage(t.validation.fileRequired);
      return false;
    }

    if (!form.privacy) {
      setValidationMessage(t.validation.privacyRequired);
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const submitApplication = async () => {
    console.log("submitApplication clicked");
  
    if (!validate()) {
      console.log("Validation failed");
      return;
    }
  
    if (!file) {
      console.log("No file selected");
      return;
    }
  
    setIsSubmitting(true);
    setValidationMessage("");
  
    try {
      const applicationId = crypto.randomUUID();
  
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `applications/${applicationId}/${cleanFileName}`;
      const fileRef = ref(storage, filePath);
  
      await uploadBytes(fileRef, file, {
        contentType: file.type,
      });

      const downloadUrl = await getDownloadURL(fileRef);
  
      const submitApplicationCallable = httpsCallable(
        functions,
        "submitApplication"
      );
  
  
      await submitApplicationCallable({
        applicationId,
        locale,
        pagePath: `/${locale}/bewerbung`,
        source: "homepage",
        applicant: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          location: form.location,
        },
        application: {
          desiredPosition: form.desiredPosition,
          experience: form.experience,
          earliestStart: form.earliestStart,
          salaryExpectation: form.salaryExpectation,
          languages: form.languages,
          hasDrivingLicense: form.hasDrivingLicense,
          message: form.message,
        },
        files: [
          {
            name: file.name,
            path: filePath,
            downloadUrl,
            contentType: file.type,
            size: file.size,
          },
        ],
      });
  
      console.log("Application submitted successfully");
  
      setSubmitted(true);
      setForm(initialForm);
      setFile(null);
    } catch (error) {
      console.error("submitApplication failed:", error);
      setValidationMessage(t.validation.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--color-global-deep)] text-white">
      <section className="relative overflow-hidden px-5 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_32%)]" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            href={`/${locale}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-white/70 transition hover:text-lime-300"
          >
            <ArrowLeft size={17} />
            {t.backLink}
          </Link>

          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-lime-300">
              {t.badge}
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              {t.title}{" "}
              <span className="text-lime-300">{t.highlight}</span>
            </h1>

            <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
              {t.intro}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <UserRound className="text-lime-300" />
              <h2 className="text-2xl font-black uppercase">
                {t.sectionTitle}
              </h2>
            </div>

            {validationMessage && (
              <div className="mb-5 rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
                {validationMessage}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t.labels.firstName}>
                <input
                  value={form.firstName}
                  onChange={(event) =>
                    updateForm("firstName", event.target.value)
                  }
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.lastName}>
                <input
                  value={form.lastName}
                  onChange={(event) =>
                    updateForm("lastName", event.target.value)
                  }
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.phone}>
                <input
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.location}>
                <input
                  value={form.location}
                  onChange={(event) =>
                    updateForm("location", event.target.value)
                  }
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.desiredPosition}>
                <input
                  value={form.desiredPosition}
                  onChange={(event) =>
                    updateForm("desiredPosition", event.target.value)
                  }
                  placeholder={t.placeholders.desiredPosition}
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.experience}>
                <select
                  value={form.experience}
                  onChange={(event) =>
                    updateForm("experience", event.target.value)
                  }
                  className="input-premium"
                >
                  <option value="">{t.labels.selectPlaceholder}</option>
                  {t.experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t.labels.earliestStart}>
                <input
                  value={form.earliestStart}
                  onChange={(event) =>
                    updateForm("earliestStart", event.target.value)
                  }
                  placeholder={t.placeholders.earliestStart}
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.salaryExpectation}>
                <input
                  value={form.salaryExpectation}
                  onChange={(event) =>
                    updateForm("salaryExpectation", event.target.value)
                  }
                  placeholder={t.placeholders.salaryExpectation}
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.languages}>
                <input
                  value={form.languages}
                  onChange={(event) =>
                    updateForm("languages", event.target.value)
                  }
                  placeholder={t.placeholders.languages}
                  className="input-premium"
                />
              </Field>

              <Field label={t.labels.hasDrivingLicense}>
                <select
                  value={form.hasDrivingLicense}
                  onChange={(event) =>
                    updateForm("hasDrivingLicense", event.target.value)
                  }
                  className="input-premium"
                >
                  <option value="">{t.labels.noSelection}</option>
                  {t.drivingLicenseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label={t.labels.message}>
                <textarea
                  value={form.message}
                  onChange={(event) => updateForm("message", event.target.value)}
                  rows={5}
                  placeholder={t.placeholders.message}
                  className="input-premium resize-none"
                />
              </Field>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300">
                  <FileUp size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-black uppercase">{t.labels.upload}</p>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {t.upload.hint}
                  </p>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(event) =>
                      handleFileChange(event.target.files?.[0])
                    }
                    className="mt-4 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-lime-300 file:px-5 file:py-3 file:text-sm file:font-black file:uppercase file:text-[var(--color-global-dark)] hover:file:bg-lime-200"
                  />

                  {file && (
                    <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-lime-300/20 bg-lime-300/10 px-4 py-3 text-sm">
                      <span className="min-w-0 truncate">{file.name}</span>

                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="shrink-0 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                        aria-label={t.upload.removeLabel}
                      >
                        <X size={17} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
              <input
                type="checkbox"
                checked={form.privacy}
                onChange={(event) =>
                  updateForm("privacy", event.target.checked)
                }
                className="mt-1"
              />

              <span>{t.labels.privacy}</span>
            </label>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={submitApplication}
                disabled={isSubmitting}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    {t.labels.submitting}
                    <Loader2 size={17} className="animate-spin" />
                  </>
                ) : (
                  <>
                    {t.labels.submit}
                    <Send size={17} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {submitted && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="max-w-[520px] rounded-[32px] border border-lime-300/25 bg-[var(--color-global-deep)] p-8 text-center shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
            <CheckCircle2 className="mx-auto text-lime-300" size={54} />

            <h2 className="mt-5 text-3xl font-black text-white">
              {t.success.title}
            </h2>

            <p className="mt-4 text-base leading-7 text-white/78">
              {t.success.text}
            </p>

            <Link href={`/${locale}`} className="btn-primary mt-7">
              {t.labels.successBack}
            </Link>
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