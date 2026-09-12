"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  contactA11y,
  ContactField,
  contactControlClassName,
} from "@/components/contact/contact-field";
import { TurnstileField } from "@/components/contact/turnstile-field";
import { buttonVariants } from "@/components/ui/button";
import { cardVariants } from "@/components/ui/card";
import {
  contactBudgets,
  contactContent,
  contactServices,
} from "@/data/contact";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useZodForm } from "@/hooks/use-zod-form";
import { defaultEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactValues } from "@/lib/validations";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function createEmptyValues(): ContactValues {
  return {
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    details: "",
    website: "",
    startedAt: Date.now(),
    turnstileToken: "",
  };
}

type FormStatus = "idle" | "success";

export function ContactForm() {
  const reduceMotion = usePrefersReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useZodForm(contactSchema, {
    defaultValues: createEmptyValues(),
  });

  async function onSubmit(values: ContactValues) {
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setSubmitError(payload.error ?? contactContent.errorMessage);
        return;
      }

      reset(createEmptyValues());
      setStatus("success");
    } catch {
      setSubmitError(contactContent.errorMessage);
    }
  }

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    if (submitError) {
      errorRef.current?.focus();
    }
  }, [submitError]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: defaultEase }}
          className={cn(
            cardVariants({
              variant: "default",
              padding: "none",
              interactive: false,
            }),
            "flex min-h-[22rem] flex-col justify-center p-5 sm:min-h-[28rem] sm:p-8",
          )}
        >
          <p className="font-heading text-title text-navy">
            {contactContent.successTitle}
          </p>
          <p className="mt-3 max-w-md text-body text-blue-gray">
            {contactContent.successMessage}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitError(null);
              reset(createEmptyValues());
              setStatus("idle");
            }}
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "mt-8 w-fit",
            )}
          >
            {contactContent.form.sendAnother}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          aria-label={contactContent.form.ariaLabel}
          aria-busy={isSubmitting}
          aria-describedby={submitError ? "contact-form-error" : undefined}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: defaultEase }}
          className={cn(
            cardVariants({
              variant: "default",
              padding: "none",
              interactive: false,
            }),
            "relative p-5 sm:p-8",
          )}
        >
          {submitError ? (
            <p
              ref={errorRef}
              id="contact-form-error"
              tabIndex={-1}
              role="alert"
              className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-caption text-destructive outline-none"
            >
              {submitError}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <ContactField
              id="contact-name"
              label={contactContent.form.fields.name}
              error={errors.name?.message}
            >
              <input
                {...register("name")}
                {...contactA11y("contact-name", errors.name?.message)}
                type="text"
                autoComplete="name"
                disabled={isSubmitting}
                className={contactControlClassName}
              />
            </ContactField>

            <ContactField
              id="contact-email"
              label={contactContent.form.fields.email}
              error={errors.email?.message}
            >
              <input
                {...register("email")}
                {...contactA11y("contact-email", errors.email?.message)}
                type="email"
                autoComplete="email"
                inputMode="email"
                disabled={isSubmitting}
                className={contactControlClassName}
              />
            </ContactField>

            <ContactField
              id="contact-phone"
              label={contactContent.form.fields.phone}
              error={errors.phone?.message}
            >
              <input
                {...register("phone")}
                {...contactA11y("contact-phone", errors.phone?.message)}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                disabled={isSubmitting}
                className={contactControlClassName}
              />
            </ContactField>

            <ContactField
              id="contact-company"
              label={contactContent.form.fields.company}
              optional
              error={errors.company?.message}
            >
              <input
                {...register("company")}
                id="contact-company"
                type="text"
                autoComplete="organization"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? "contact-company-error" : undefined
                }
                className={contactControlClassName}
              />
            </ContactField>

            <ContactField
              id="contact-service"
              label={contactContent.form.fields.service}
              error={errors.service?.message}
            >
              <div className="relative">
                <select
                  {...register("service")}
                  {...contactA11y("contact-service", errors.service?.message)}
                  disabled={isSubmitting}
                  className={cn(
                    contactControlClassName,
                    "appearance-none bg-background pr-10",
                  )}
                >
                  <option value="" disabled>
                    {contactContent.form.selectService}
                  </option>
                  {contactServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </ContactField>

            <ContactField
              id="contact-budget"
              label={contactContent.form.fields.budget}
              error={errors.budget?.message}
            >
              <div className="relative">
                <select
                  {...register("budget")}
                  {...contactA11y("contact-budget", errors.budget?.message)}
                  disabled={isSubmitting}
                  className={cn(
                    contactControlClassName,
                    "appearance-none bg-background pr-10",
                  )}
                >
                  <option value="" disabled>
                    {contactContent.form.selectBudget}
                  </option>
                  {contactBudgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </ContactField>
          </div>

          <div className="mt-5">
            <ContactField
              id="contact-details"
              label={contactContent.form.fields.details}
              error={errors.details?.message}
            >
              <textarea
                {...register("details")}
                {...contactA11y("contact-details", errors.details?.message)}
                rows={5}
                disabled={isSubmitting}
                className={cn(
                  contactControlClassName,
                  "h-auto min-h-[8.5rem] resize-y py-3",
                )}
              />
            </ContactField>
          </div>

          <div hidden className="absolute" aria-hidden>
            <label htmlFor="contact-website">Website</label>
            <input
              {...register("website")}
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {turnstileSiteKey ? (
            <div>
              <TurnstileField
                siteKey={turnstileSiteKey}
                onToken={(token) =>
                  setValue("turnstileToken", token, { shouldValidate: true })
                }
              />
              {errors.turnstileToken?.message ? (
                <p role="alert" className="mt-2 text-caption text-destructive">
                  {errors.turnstileToken.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    aria-hidden
                    className="animate-spin"
                    data-icon="inline-start"
                  />
                  {contactContent.form.sending}
                </>
              ) : (
                <>
                  {contactContent.cta}
                  <ArrowRight data-icon="inline-end" />
                </>
              )}
            </button>
            <p className="text-caption text-muted-foreground">
              {contactContent.form.noSpam}
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
