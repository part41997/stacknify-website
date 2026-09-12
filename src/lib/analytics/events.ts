export const analyticsEvents = {
  pageView: "Page View",
  startProjectCta: "Start Project CTA",
  letsTalkCta: "Let's Talk CTA",
  serviceClick: "Service click",
  portfolioClick: "Portfolio click",
  contactFormStart: "Contact form start",
  contactFormSubmit: "Contact form submit",
  phoneClick: "Phone click",
  emailClick: "Email click",
} as const;

export type AnalyticsEvent =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsProps = {
  path?: string;
};
