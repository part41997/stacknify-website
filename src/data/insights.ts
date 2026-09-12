import { getSiteImage } from "@/data/images";
import { isImageReady } from "@/lib/images";
import type { Insight, SiteImageAsset } from "@/types";

export const insightsContent = {
  eyebrow: "News & Insights",
  heading: "Read our latest blog",
  readDetails: "Read Details",
  backLabel: "Back to insights",
  relatedLabel: "More from the desk",
  fallbackTitle: "Insight",
  carouselLabel: "Latest insights",
  previousLabel: "Previous insight",
  nextLabel: "Next insight",
} as const;

export function getInsightHref(insight: Pick<Insight, "slug">) {
  return `/insights/${insight.slug}`;
}

export function getInsightBySlug(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}

export function formatInsightDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function getInsightCover(insight: Insight): SiteImageAsset | undefined {
  const image = getSiteImage(insight.image);
  return isImageReady(image) ? image : undefined;
}

export function getRelatedInsights(insight: Insight, limit = 2) {
  return insights.filter((item) => item.slug !== insight.slug).slice(0, limit);
}

export const insights: readonly Insight[] = [
  {
    slug: "ai-features-users-keep",
    title: "A practical guide to AI features users actually keep",
    description:
      "Ship AI that stays in the workflow: start from a real job, keep a human in the loop, and measure whether the feature still gets used after week two.",
    category: "Data & AI",
    publishedAt: "2026-08-18",
    image: "insights.ai-features",
    body: [
      {
        type: "p",
        text: "Most AI features die the same way: a polished demo, a week of curiosity, then the team goes back to the spreadsheet. The work that lasts is quieter. It sits inside a job people already do, and it makes that job shorter without asking them to become prompt engineers.",
      },
      {
        type: "h2",
        text: "Start from a job, not a model",
      },
      {
        type: "p",
        text: "Before you pick a model, write the job in one sentence: who does it, how often, what they look at, and what “done” looks like. If you cannot name the input and the output, you do not have an AI feature — you have a chat box. Stacknify builds from that sentence. The model is a component. The product is the job.",
      },
      {
        type: "ul",
        items: [
          "Name the operator, not a persona. Who opens this screen on a Monday.",
          "List the source of truth. If the data is messy, the feature will lie with confidence.",
          "Decide what happens when the model is wrong. A retry, a queue, or a human review — not a shrug.",
        ],
      },
      {
        type: "h2",
        text: "Keep a human in the loop until the loop earns trust",
      },
      {
        type: "p",
        text: "Operators keep features they can correct. A draft they can edit beats an answer they cannot challenge. Show the source. Show confidence only when it maps to something real, like “this invoice matched three prior bills.” Hide the rest. Confidence scores that mean nothing get ignored, then the whole feature gets ignored.",
      },
      {
        type: "p",
        text: "The first version should be slower than the demo. Review, edit, approve. When the edit rate drops and the error rate is known, you can tighten the loop. Skipping that step is how teams ship a bot that nobody wants to defend.",
      },
      {
        type: "h2",
        text: "Measure week two, not launch week",
      },
      {
        type: "p",
        text: "Launch week is a novelty. Week two is the truth. Track whether the original job still happens in the old place. If people paste the same prompt every morning, turn that prompt into a button. If they export to Excel to finish the work, the feature is not done. Keep the ones that cut steps. Cut the ones that add a new tab.",
      },
    ],
  },
  {
    slug: "design-systems-teams-actually-use",
    title: "Design systems for teams that hate maintaining design systems",
    description:
      "A design system that lasts is small, owned, and used in the product — not a museum of components nobody imports.",
    category: "Design",
    publishedAt: "2026-07-22",
    image: "insights.design-systems",
    body: [
      {
        type: "p",
        text: "Design systems fail when they become a second product. Tokens, variants, documentation, and a backlog of “we should add this.” Meanwhile the live app still has three button styles. Teams that hate maintenance are not lazy. They are protecting the work that ships. The system has to earn its keep in that work.",
      },
      {
        type: "h2",
        text: "Ship the five things you already repeat",
      },
      {
        type: "p",
        text: "Start with color, type, spacing, a button, and a form field. If those five are honest, the rest of the UI can wait. Every extra component is a promise to keep it current. We would rather a thin system that matches production than a library that drifted last quarter.",
      },
      {
        type: "ul",
        items: [
          "Tokens first. If navy, teal, and mint only exist as hex in Figma comments, they will drift.",
          "One primary action per view. If every button is “important,” none of them are.",
          "Document how to say no. A system without a reject path becomes a dumping ground.",
        ],
      },
      {
        type: "h2",
        text: "Own it in the repo, not in a slide",
      },
      {
        type: "p",
        text: "The source of truth is the code the product imports. A Figma file that does not match the repo is a mood board. Put the tokens next to the components. When a color changes, it changes in one place. When a pattern is unused for two releases, delete it. A smaller system is easier to love.",
      },
      {
        type: "h2",
        text: "Let the product be the review",
      },
      {
        type: "p",
        text: "Do not hold a monthly “system health” meeting that nobody attends. Review the live screens. If a new card appears that is not in the system, either absorb it or kill it in the next sprint. That is the whole process. Stacknify uses the same rule on client work: the interface people click is the system. Everything else is notes.",
      },
    ],
  },
  {
    slug: "custom-software-vs-another-saas-seat",
    title: "When custom software is cheaper than another SaaS seat",
    description:
      "Buying another tool feels fast until the work still hops between five logins. Here is when a focused system pays for itself.",
    category: "Software",
    publishedAt: "2026-06-09",
    image: "insights.custom-software",
    body: [
      {
        type: "p",
        text: "SaaS is the right default until it is not. The tipping point is rarely the license fee. It is the hours spent copying between tools, the report nobody trusts, and the process that only one person understands. Another seat does not fix that. A smaller system that owns the job can.",
      },
      {
        type: "h2",
        text: "Count the hops, not the features",
      },
      {
        type: "p",
        text: "If a weekly process touches four products and a spreadsheet, you are paying in attention. Map the hops. Export, reformat, re-enter, chase a status. Those steps are the real cost. Custom software is worth it when one screen can close the loop — intake, status, output — without a new login.",
      },
      {
        type: "ul",
        items: [
          "The tool is used for one job, but that job is core. You should own the spine.",
          "The vendor roadmap will not include your exception. Your exception is the business.",
          "Integrations already exist, but nobody wants to maintain the glue. Own the glue.",
        ],
      },
      {
        type: "h2",
        text: "Build the spine, not a clone of the suite",
      },
      {
        type: "p",
        text: "Do not rebuild the CRM. Rebuild the path that the CRM never quite covered. Keep the systems that are good enough. Replace the seam. That is how custom work stays small enough to ship and cheap enough to keep. We would rather a boring internal tool that operators finish in one sitting than a platform with a name and a dashboard nobody opens.",
      },
      {
        type: "h2",
        text: "Keep an exit that is not a hostage note",
      },
      {
        type: "p",
        text: "Your data should leave. Exports, APIs, and a schema you can read. If a vendor change would freeze the operation, you already needed a system of record you control. Custom software is not a trophy. It is a decision that the job is yours — and the tools around it can stay rented.",
      },
    ],
  },
  {
    slug: "technical-seo-for-product-sites",
    title: "Technical SEO for product sites that already look finished",
    description:
      "A polished marketing site can still hide from search. Indexation, internal links, and honest titles move more than another hero rewrite.",
    category: "SEO",
    publishedAt: "2026-05-14",
    image: "insights.technical-seo",
    body: [
      {
        type: "p",
        text: "Product sites often look done and still fail search. The homepage ranks for the brand. Service pages hide behind client-side tabs. Case studies have no unique title. Technical SEO is not a coat of keywords. It is whether a crawler can find the page, understand the page, and prefer it over a thinner competitor.",
      },
      {
        type: "h2",
        text: "Make the important URLs real",
      },
      {
        type: "p",
        text: "If a service only exists as a scroll target, it will lose to a page with its own URL, title, and intro. One URL per offer. One H1. A description that says what you do, not a slogan. Then link those pages from the nav and the footer. Search cannot reward a page it cannot enter twice.",
      },
      {
        type: "ul",
        items: [
          "Sitemap includes the pages you want indexed. Nothing else.",
          "Canonicals match the URL you share. Duplicates from filters and previews stay out.",
          "Images have real alt text. Decorative marks can stay empty. Product shots cannot.",
        ],
      },
      {
        type: "h2",
        text: "Speed is a ranking signal and a trust signal",
      },
      {
        type: "p",
        text: "A heavy hero video that never plays on mobile is not a brand moment. It is a delay. Compress images before they hit the CDN. Do not run a second optimizer on files you already shrunk. Stacknify ships WebP that is already sized — routing them through another pipeline has stalled pages we have seen. Measure the field, not a lab score you cannot feel.",
      },
      {
        type: "h2",
        text: "Write titles like an operator would search",
      },
      {
        type: "p",
        text: "People search for the job: custom software, AI automation, technical SEO. They do not search for your tagline. Put the job in the title. Put the proof in the body. Internal links should point at the next useful page, not a loop back to the hero. That is the whole sitemap. Pretty is not the same as findable.",
      },
    ],
  },
  {
    slug: "automation-operators-will-trust",
    title: "Automation operators will trust on Monday morning",
    description:
      "Automation that survives contact with a real week is visible, reversible, and owned — not a silent script that only works on the happy path.",
    category: "Automation",
    publishedAt: "2026-04-03",
    image: "insights.automation",
    body: [
      {
        type: "p",
        text: "Operators do not distrust automation because they fear technology. They distrust it because they have been blamed when a silent job fired twice, skipped a row, or emailed the wrong client. Trust is a product requirement. If they cannot see what ran, they will keep a shadow process in a notebook.",
      },
      {
        type: "h2",
        text: "Show the queue, not just the success toast",
      },
      {
        type: "p",
        text: "A good automation has a list: waiting, running, done, failed. Each item names the record and the last step. Failed items stay failed until a person says otherwise. Hidden retries that “fix themselves” are how duplicates enter the CRM. Make the queue a screen. If it is only in a log file, it does not exist.",
      },
      {
        type: "ul",
        items: [
          "Idempotency keys. The same event must not create two invoices.",
          "A stop button. Someone on the floor has to be able to halt a run.",
          "A replay that is explicit. Replay is a choice, not a side effect of refresh.",
        ],
      },
      {
        type: "h2",
        text: "Automate the boring path first",
      },
      {
        type: "p",
        text: "Start with the case that happens forty times a week, not the exception that happens twice a year. Exceptions stay manual until the happy path is boring. Then encode the next exception only if it has a name and a rule. A workflow that tries to handle every edge on day one will fail in a way nobody can explain.",
      },
      {
        type: "h2",
        text: "Hand it to the people who run Monday",
      },
      {
        type: "p",
        text: "If only engineering can restart a job, the automation is still a project. Give operations a screen, a owner, and a rule for when to call engineering. That is how Stacknify ships automation: into the week, not onto a slide. When Monday is quieter, you built the right thing. When Monday still needs a hero, you built a demo.",
      },
    ],
  },
];
