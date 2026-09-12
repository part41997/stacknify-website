export {
  getAnalyticsConfig,
  isAnalyticsConfigured,
} from "@/lib/analytics/config";
export {
  hasPrivacyOptOut,
  isAnalyticsEnabled,
  markAnalyticsReady,
  track,
  trackPageView,
} from "@/lib/analytics/client";
export { analyticsEvents, type AnalyticsEvent } from "@/lib/analytics/events";
export { isContactForm, resolveClickEvent } from "@/lib/analytics/capture";
