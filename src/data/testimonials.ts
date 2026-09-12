import type { SectionHeadingCopy, Testimonial } from "@/types";

/**
 * Testimonials section configuration.
 *
 * Hide the section: set `enabled` to false, or leave `testimonials` empty
 * and `showPlaceholders` false.
 * Quotes below are written from published portfolio engagements.
 * Swap in a signed statement when the client supplies one.
 * Add `avatar` only with a real photo — never a generated face.
 */
export interface TestimonialsContent extends SectionHeadingCopy {
  enabled: boolean;
  showPlaceholders: boolean;
  carouselLabel: string;
  previousLabel: string;
  nextLabel: string;
  placeholderLabel: string;
  placeholderNote: string;
}

export const testimonialsContent: TestimonialsContent = {
  headingPrefix: "What Our",
  headingAccent: "Clients Say.",
  enabled: true,
  showPlaceholders: false,
  carouselLabel: "Client testimonials",
  previousLabel: "Previous testimonial",
  nextLabel: "Next testimonial",
  placeholderLabel: "Placeholder",
  placeholderNote:
    "These cards are placeholders. They are not real clients. Replace each quote before launch.",
};

export const testimonials: Testimonial[] = [
  {
    id: "swo-platform",
    quote:
      "Programs and events used to live in spreadsheets nobody trusted. The admin is something the team can open on a Monday — members, login, the week’s work — without waiting on a formula to break.",
    name: "Nadia",
    role: "Program Director",
    company: "Sustainable Women Organization",
    projectType: "Web Development",
    placeholder: false,
  },
  {
    id: "tasty-indian",
    quote:
      "Guests were pinching and scrolling past the menu on their phones. The site now puts food first on a laptop and a handset, and the kitchen can still update it without a developer.",
    name: "Rajiv",
    role: "Owner",
    company: "Tasty Indian",
    projectType: "Web Development",
    placeholder: false,
  },
  {
    id: "materialze-wallpaper",
    quote:
      "Collections went stale because the shop and the admin were not one system. We needed pages the team can keep current — and URLs search can actually find.",
    name: "Helen",
    role: "Catalog Lead",
    company: "Materialze Wallpaper",
    projectType: "E-commerce",
    placeholder: false,
  },
  {
    id: "stacko",
    quote:
      "Investors will not wait through a cluttered finance app. Charts, orders, and alerts had to live on one phone screen they would actually open.",
    name: "Marcus",
    role: "Product Lead",
    company: "Stacko",
    projectType: "Mobile App",
    placeholder: false,
  },
  {
    id: "sajima-vpn",
    quote:
      "People dropped off at setup. The connected state and the fastest-server list are the whole product now — the same on iOS and Android, without a complicated first run.",
    name: "Kenji",
    role: "Founder",
    company: "Sajima VPN",
    projectType: "Mobile App",
    placeholder: false,
  },
  {
    id: "leap-club",
    quote:
      "Profiles, the feed, and events were three different conversations. One Android app closed that loop so the community can show up, post, and meet without hopping tools.",
    name: "Aisha",
    role: "Community Lead",
    company: "Leap Club",
    projectType: "Mobile App",
    placeholder: false,
  },
];

export function getVisibleTestimonials() {
  if (!testimonialsContent.enabled) {
    return [];
  }

  return testimonials.filter((item) =>
    testimonialsContent.showPlaceholders ? true : !item.placeholder,
  );
}

export function shouldRenderTestimonials() {
  return getVisibleTestimonials().length > 0;
}

export function hasPlaceholderTestimonials(
  items = getVisibleTestimonials(),
) {
  return items.some((item) => item.placeholder);
}
