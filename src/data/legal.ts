import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: readonly string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalRelatedDocument = {
  label: string;
  href: string;
};

export type LegalDocument = {
  title: string;
  description: string;
  kicker: string;
  version: string;
  classification: string;
  effectiveDate: string;
  effectiveDateIso: string;
  lastUpdated: string;
  intro: string;
  related: readonly LegalRelatedDocument[];
  sections: readonly LegalSection[];
};

const company = siteConfig.name;
const email = siteConfig.email || "info@stacknify.com";
const site = "https://stacknify.com";
const effectiveDate = "15 September 2026";
const effectiveDateIso = "2026-09-15";
const version = "1.0";
const classification = "Public";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: `${company} explains how we collect, use, store, and protect personal information when you visit our website, submit an enquiry, or engage us for software, AI, and digital services.`,
  kicker: "Legal notice",
  version,
  classification,
  effectiveDate,
  effectiveDateIso,
  lastUpdated: effectiveDate,
  related: [{ label: "Terms & Conditions", href: routes.terms }],
  intro: `This Privacy Policy describes how ${company} (“${company}”, “we”, “us”, or “our”) processes personal information in connection with ${site}, our contact form, and the professional services we provide — including custom software development, web and mobile applications, UI/UX design, AI automation, and SEO and digital marketing. By using the website or submitting information to us, you acknowledge this policy.`,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${company} is a technology services organisation that designs and builds software, AI, and digital growth systems for businesses. For privacy enquiries, the controller of personal information collected through this website is ${company}.`,
        },
        {
          type: "p",
          text: `You may contact us at ${email}. If a business address is published on the website or in a statement of work, that address is our correspondence address for that engagement.`,
        },
      ],
    },
    {
      id: "scope",
      title: "Scope",
      blocks: [
        {
          type: "p",
          text: "This policy applies to personal information we collect:",
        },
        {
          type: "ul",
          items: [
            "When you browse or interact with our website",
            "When you submit the contact or enquiry form",
            "When you email, call, or message us about a project",
            "When we perform contracted professional services for a client organisation",
          ],
        },
        {
          type: "p",
          text: "Client systems we build or host under a separate agreement are governed by that agreement and any data processing terms agreed in writing. This website policy does not replace a statement of work, master services agreement, or data processing addendum.",
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      blocks: [
        {
          type: "p",
          text: "We collect only what we need to respond to you and to operate the business.",
        },
        {
          type: "p",
          text: "Information you provide. Through the enquiry form or direct correspondence this may include your name, email address, telephone number, company name, selected service, indicative budget, and project details. Do not include passwords, payment card numbers, government identifiers, or special-category data in the form.",
        },
        {
          type: "p",
          text: "Information collected automatically. When you visit the website, our hosting provider and security tools may process technical data such as IP address, browser type, device information, referring URL, pages viewed, and timestamps. If Cloudflare Turnstile or a similar bot-protection service is enabled on the form, that provider may process a verification token and limited device signals to distinguish people from automated abuse.",
        },
        {
          type: "p",
          text: "Analytics. If privacy-conscious analytics (for example Plausible, Umami, or Fathom) are configured, we may receive aggregated usage statistics. Those tools are selected to avoid advertising cookies and unnecessary cross-site tracking. If analytics are not configured, we do not run a marketing pixel on this site.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How we use information",
      blocks: [
        {
          type: "p",
          text: "We use personal information to:",
        },
        {
          type: "ul",
          items: [
            "Respond to enquiries and assess whether we can take on the work",
            "Prepare proposals, statements of work, and project communications",
            "Deliver, support, and invoice professional services where we have a contract",
            "Operate, secure, and improve the website, including preventing spam and abuse",
            "Comply with legal, accounting, and regulatory obligations",
            "Protect our rights, users, and infrastructure",
          ],
        },
        {
          type: "p",
          text: "We do not sell personal information. We do not use enquiry data to train public AI models. We do not send marketing newsletters unless you have asked to receive them.",
        },
      ],
    },
    {
      id: "legal-bases",
      title: "Legal bases",
      blocks: [
        {
          type: "p",
          text: `Where data-protection law requires a legal basis, we rely on: performance of a contract or steps at your request before a contract; legitimate interests in operating an IT services business, securing the website, and responding to professional enquiries; consent where we ask for it (for example optional analytics or marketing); and legal obligation where we must retain records. For individuals in India, we process digital personal data in line with the Digital Personal Data Protection Act, 2023 and applicable rules, including purpose limitation and security safeguards.`,
        },
      ],
    },
    {
      id: "sharing",
      title: "Processors and sharing",
      blocks: [
        {
          type: "p",
          text: "We share personal information only with parties who need it to provide services to us or to you, under confidentiality and data-protection obligations where appropriate:",
        },
        {
          type: "ul",
          items: [
            "Email delivery providers (currently Resend) to send enquiry notifications to our inbox",
            "Website hosting and infrastructure providers (including Hostinger or successor hosts) to operate the site and application",
            "Security and abuse-prevention providers (such as Cloudflare Turnstile, if enabled)",
            "Analytics providers, if configured as described above",
            "Professional advisers (legal, accounting) where reasonably required",
            "Authorities if we are legally required to disclose information",
          ],
        },
        {
          type: "p",
          text: "If we engage subcontractors on a client project, we do so under written terms. We do not disclose your enquiry to unrelated third parties for their own marketing.",
        },
      ],
    },
    {
      id: "international",
      title: "International processing",
      blocks: [
        {
          type: "p",
          text: "Our team, hosting, and email providers may process information in India and in other countries where those providers operate. Where we transfer personal information internationally, we take steps appropriate to the risk and to applicable law, including contractual safeguards with processors.",
        },
      ],
    },
    {
      id: "retention",
      title: "Retention",
      blocks: [
        {
          type: "p",
          text: "Enquiry records are kept for as long as needed to handle the conversation and for a reasonable period afterwards (typically up to 24 months if we do not enter a contract), unless a longer period is required for disputes, tax, or legal compliance. Contract, invoice, and project records are retained for the life of the engagement and for the statutory period that applies to commercial and tax records in India. We delete or anonymise information when it is no longer required.",
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "p",
          text: "We implement administrative, technical, and organisational measures appropriate to an IT services organisation, including HTTPS, access control to business systems, rate limiting and bot protection on the public form, and least-privilege handling of enquiry mail. No method of transmission or storage is completely secure. You should not send highly sensitive credentials through the public website form.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      blocks: [
        {
          type: "p",
          text: "The website uses cookies or similar storage that are strictly necessary to operate the site (for example security, load balancing, or session integrity). Optional analytics, if enabled, are configured to minimise or avoid advertising cookies. Browser controls can block some cookies; essential functions may then not work.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        {
          type: "p",
          text: "Subject to applicable law, you may request access to personal information we hold about you, correction of inaccurate data, erasure, withdrawal of consent where processing is consent-based, and information about how we use your data. You may also lodge a complaint with the competent data-protection authority in your jurisdiction.",
        },
        {
          type: "p",
          text: `To exercise rights, email ${email} with sufficient detail for us to identify the request. We may need to verify your identity before acting. We will respond within the time required by law.`,
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          type: "p",
          text: "Our website and services are directed at businesses and professionals. We do not knowingly collect personal information from children. If you believe a child has submitted information to us, contact us and we will delete it.",
        },
      ],
    },
    {
      id: "client-data",
      title: "Client project data",
      blocks: [
        {
          type: "p",
          text: "When we process personal data on a client’s systems (for example inside custom software, a mobile app, or an automation we build), we typically act as a processor or service provider for that client. The client’s privacy notice and our written contract govern that processing. We follow documented instructions, apply access controls, and do not use client production data for unrelated purposes.",
        },
      ],
    },
    {
      id: "automated-decisions",
      title: "Automated decision-making",
      blocks: [
        {
          type: "p",
          text: "We do not use personal information collected through this website to make solely automated decisions that produce legal or similarly significant effects about you. Enquiry review and project qualification are carried out by our team.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: `We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Material changes will be reflected on this page. Continued use of the website after an update constitutes acknowledgement of the revised policy.`,
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "p",
          text: `Privacy requests: ${email}. Website: ${site}.`,
        },
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms & Conditions",
  description: `${company} website and professional services terms for software development, AI automation, web and mobile applications, design, and digital marketing engagements.`,
  kicker: "Legal notice",
  version,
  classification,
  effectiveDate,
  effectiveDateIso,
  lastUpdated: effectiveDate,
  related: [{ label: "Privacy Policy", href: routes.privacy }],
  intro: `These Terms & Conditions (“Terms”) govern access to ${site} and, together with a proposal, quotation, statement of work, or master services agreement (each an “Order”), the professional services supplied by ${company}. If an Order conflicts with these Terms, the Order prevails for that engagement. If you do not agree to these Terms, do not use the website or instruct us to begin work.`,
  sections: [
    {
      id: "parties",
      title: "Parties and acceptance",
      blocks: [
        {
          type: "p",
          text: `${company} provides information technology services to business customers. By using the website, submitting an enquiry, or confirming an Order, you represent that you have authority to bind the organisation you name, and that you accept these Terms on its behalf.`,
        },
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      blocks: [
        {
          type: "p",
          text: "In these Terms:",
        },
        {
          type: "ul",
          items: [
            "“Client”, “you”, or “your” means the organisation that uses the website or enters an Order.",
            "“Deliverables” means the work product described in an Order, excluding Pre-Existing Materials and Third-Party Materials except as embodied in that work product.",
            "“Order” means a proposal, quotation, statement of work, or master services agreement accepted by both parties (including acceptance by email).",
            "“Pre-Existing Materials” means our frameworks, libraries, internal tools, templates, know-how, and generic components developed independently of your project.",
            "“Third-Party Materials” means software, APIs, models, fonts, stock, cloud services, and other items licensed by a third party.",
            "“Services” means the professional IT services described in the applicable Order.",
          ],
        },
      ],
    },
    {
      id: "website",
      title: "Website use",
      blocks: [
        {
          type: "p",
          text: "The website is provided for information about our capabilities and to receive enquiries. You must not misuse it, attempt to probe or disrupt our systems, submit unlawful or infringing content, or use automated means to scrape or overload the site except as permitted by public search indexing of ordinary pages.",
        },
        {
          type: "p",
          text: "Content on the website — including case studies, service descriptions, and illustrative metrics — is for general information. It is not a warranty, a bid, or a guarantee of outcome. Portfolio items describe the nature of work; unpublished commercial results are omitted on purpose.",
        },
      ],
    },
    {
      id: "services",
      title: "Professional services",
      blocks: [
        {
          type: "p",
          text: `${company} provides custom software development, web development, mobile application development, UI/UX design, AI automation and related integration, SEO, and digital marketing, as described in the applicable Order. We perform services in a professional and workmanlike manner consistent with generally accepted practices for comparable IT services organisations.`,
        },
        {
          type: "p",
          text: "Unless an Order says otherwise, work is delivered on a time-and-materials or fixed-scope basis against written milestones. Anything not expressly included is out of scope. Change requests are estimated and proceed only when approved in writing (including email).",
        },
      ],
    },
    {
      id: "client-duties",
      title: "Client responsibilities",
      blocks: [
        {
          type: "p",
          text: "You will provide timely access to stakeholders, systems, content, credentials (via a secure channel), feedback, and decisions reasonably required for us to perform. Delays in access, approvals, or third-party vendors do not constitute our default. You are responsible for the accuracy of materials you supply and for obtaining licences and consents for third-party software, data, and branding you ask us to use.",
        },
        {
          type: "p",
          text: "You remain responsible for your production environments, end-user terms, regulatory licences, and the lawful use of any system we deliver after handover, except as expressly agreed in an Order (for example managed hosting).",
        },
      ],
    },
    {
      id: "acceptance",
      title: "Acceptance of deliverables",
      blocks: [
        {
          type: "p",
          text: "A deliverable is accepted when you confirm acceptance in writing, when a milestone payment for that deliverable is made without a written reservation of rights, or five (5) business days after delivery if you have not given a written, reasonably detailed list of material non-conformities against the Order.",
        },
        {
          type: "p",
          text: "We will correct material non-conformities that are our responsibility within a reasonable period. Cosmetic preferences, new requirements, and third-party or environment issues are change requests, not rejection grounds, unless the Order says otherwise.",
        },
      ],
    },
    {
      id: "fees",
      title: "Fees, invoices, and taxes",
      blocks: [
        {
          type: "p",
          text: "Fees are those stated in the Order. Unless stated otherwise, invoices are due within fifteen (15) days of the invoice date. Late amounts may accrue interest at 1.5% per month or the maximum permitted by law, whichever is lower. Work may be paused if invoices remain unpaid after notice.",
        },
        {
          type: "p",
          text: "Fees are exclusive of applicable taxes (including GST). You are responsible for taxes arising from the services other than taxes on our income. Expenses (travel, paid licences, third-party APIs, app-store fees) are billed at cost when pre-approved or listed in the Order.",
        },
        {
          type: "p",
          text: "Deposits and milestone payments are not refundable once the corresponding work has started, except as required by law or as expressly agreed in the Order.",
        },
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "Each party retains ownership of materials it owned before the engagement. You grant us a limited licence to use your materials solely to perform the services.",
        },
        {
          type: "p",
          text: `Upon full payment of fees due for the relevant deliverable, ${company} assigns to you the intellectual property in custom deliverables created specifically for you under the Order (source code, unique designs, and documentation), excluding Pre-Existing Materials and Third-Party Materials.`,
        },
        {
          type: "p",
          text: "“Pre-Existing Materials” means our frameworks, libraries, internal tools, templates, know-how, and generic components developed independently of your project. We grant you a non-exclusive, perpetual, worldwide licence to use Pre-Existing Materials solely as embodied in the paid deliverables. We may reuse Pre-Existing Materials and generic know-how in other projects.",
        },
        {
          type: "p",
          text: "Third-party software, open-source components, fonts, stock, cloud services, and AI model APIs remain subject to their own licences. You are responsible for ongoing subscription fees for those services unless the Order says we will procure them on your behalf.",
        },
      ],
    },
    {
      id: "ai",
      title: "AI, models, and automation",
      blocks: [
        {
          type: "p",
          text: "Where an Order includes AI automation, agents, or model integration, outputs depend on prompts, data quality, third-party model providers, and changing model behaviour. We do not warrant that model outputs will be error-free, unbiased, or suitable for a particular legal, medical, or financial decision. You must keep a human review process where the use case requires it.",
        },
        {
          type: "p",
          text: "We will not use your confidential production data to train publicly available models. Use of third-party AI APIs is subject to those providers’ terms. Availability and pricing of those APIs may change without our control.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      blocks: [
        {
          type: "p",
          text: "Each party will protect the other’s non-public information with reasonable care and use it only to perform under the Order. Confidentiality does not apply to information that is public, independently developed, rightfully received from a third party, or required to be disclosed by law (with notice where legally permitted). These obligations survive for three (3) years after the engagement ends, and indefinitely for trade secrets for so long as they remain trade secrets.",
        },
      ],
    },
    {
      id: "data-protection",
      title: "Data protection",
      blocks: [
        {
          type: "p",
          text: "Personal information collected through the website is processed as described in our Privacy Policy. Where we process personal data on your behalf inside a client system, we act as a processor or service provider and will follow documented instructions. A data processing addendum may be required before we handle production personal data.",
        },
        {
          type: "p",
          text: "You warrant that you have a lawful basis to provide any personal data to us and that your instructions will not cause us to breach applicable data-protection law.",
        },
      ],
    },
    {
      id: "warranties",
      title: "Warranties and disclaimers",
      blocks: [
        {
          type: "p",
          text: "For thirty (30) days after acceptance of a deliverable (or as stated in the Order), we will use reasonable efforts to correct defects that materially fail to conform to the written specification, provided you notify us promptly and the defect is reproducible. This does not cover issues caused by your changes, third-party systems, unsuitable environments, or requirements not in the Order.",
        },
        {
          type: "p",
          text: `Except as expressly stated, the website and services are provided “as is”. ${company} disclaims all other warranties, whether express, implied, or statutory, including merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law. We do not warrant uninterrupted operation, specific search rankings, specific revenue, or specific performance gains from AI or marketing work.`,
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "p",
          text: `To the maximum extent permitted by law, ${company} is not liable for indirect, incidental, special, consequential, punitive, or lost-profit damages, or for loss of data, goodwill, or business interruption, even if advised of the possibility.`,
        },
        {
          type: "p",
          text: "Our aggregate liability arising out of an Order or these Terms is limited to the fees actually paid by you to us under that Order in the three (3) months preceding the claim. Nothing in these Terms excludes liability that cannot be excluded under applicable law (including for fraud or wilful misconduct).",
        },
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        {
          type: "p",
          text: `You will indemnify and hold ${company} harmless from claims, damages, and reasonable costs arising from your materials, your breach of these Terms or an Order, your misuse of deliverables, or your violation of law or third-party rights, except to the extent caused by our wilful misconduct.`,
        },
      ],
    },
    {
      id: "term",
      title: "Term, termination, and suspension",
      blocks: [
        {
          type: "p",
          text: "Either party may terminate an Order for material breach if the breach is not cured within fifteen (15) days after written notice. Either party may terminate for insolvency as permitted by law. We may suspend services for non-payment, security risk, or unlawful use.",
        },
        {
          type: "p",
          text: "On termination you will pay for work performed and approved expenses through the effective date. Upon request and payment of outstanding amounts, we will deliver work-in-progress then in our possession in the form reasonably available.",
        },
      ],
    },
    {
      id: "non-solicit",
      title: "Non-solicitation",
      blocks: [
        {
          type: "p",
          text: `During an engagement and for twelve (12) months afterwards, you will not solicit for employment any ${company} personnel who worked on your project, other than through general public advertisements. This does not restrict hiring where prohibited by applicable law.`,
        },
      ],
    },
    {
      id: "publicity",
      title: "Publicity",
      blocks: [
        {
          type: "p",
          text: `Unless the Order says otherwise, we may list your organisation name and a factual project description in our portfolio and proposals. We will not disclose confidential details or unpublished metrics. You may withhold publicity by written notice.`,
        },
      ],
    },
    {
      id: "subcontracting",
      title: "Subcontracting and independent contractor",
      blocks: [
        {
          type: "p",
          text: "We may engage qualified subcontractors or affiliates to perform part of the Services. We remain responsible for their performance as if we had performed the work ourselves. Personnel assigned to your project are not your employees.",
        },
      ],
    },
    {
      id: "force-majeure",
      title: "Force majeure",
      blocks: [
        {
          type: "p",
          text: "Neither party is liable for delay or failure to perform (other than payment obligations) caused by events beyond its reasonable control, including failure of third-party networks, cloud or model providers, utilities, labour disputes, epidemic, war, cyber-attack not caused by the affected party’s gross negligence, or government action. The affected party will notify the other promptly and resume performance when reasonably practicable. If such an event continues for more than thirty (30) days, either party may terminate the affected Order on written notice.",
        },
      ],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      blocks: [
        {
          type: "p",
          text: "These Terms and any Order are governed by the laws of India, without regard to conflict-of-law rules. Courts at the location of our principal place of business in India have exclusive jurisdiction, unless an Order specifies another venue. The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
        },
      ],
    },
    {
      id: "general",
      title: "General",
      blocks: [
        {
          type: "ul",
          items: [
            "These Terms, together with the Order, are the entire agreement for the subject matter and supersede prior discussions on that subject.",
            "If a provision is unenforceable, the remainder stays in effect.",
            "Failure to enforce a provision is not a waiver.",
            "You may not assign an Order without our consent, except to a successor of substantially all of your business. We may assign to an affiliate or successor.",
            "Notices may be sent to the email addresses used for the engagement, and to " +
              email +
              " for notices to us.",
            "We are an independent contractor. These Terms do not create a partnership, joint venture, or employment relationship.",
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "p",
          text: `Questions about these Terms: ${email}. Website: ${site}.`,
        },
      ],
    },
  ],
};
