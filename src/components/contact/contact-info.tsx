import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SocialLinks } from "@/components/layout/social-links";

import {
  CardDescription,
  CardIcon,
  CardTitle,
  cardVariants,
} from "@/components/ui/card";
import {
  contactContent,
  getContactChannels,
  getSocialLinks,
  type ContactChannel,
} from "@/data/contact";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const channelIcons: Record<ContactChannel["id"], LucideIcon> = {
  email: Mail,
  phone: Phone,
  address: MapPin,
};

export function ContactInfo() {
  const channels = getContactChannels();
  const social = getSocialLinks();

  return (
    <aside
      className={cn(
        cardVariants({
          variant: "default",
          padding: "none",
          interactive: false,
        }),
        "relative overflow-hidden lg:sticky lg:top-[calc(var(--header-height)+1.25rem)]",
      )}
    >
      <div className="relative flex flex-col gap-5 p-5 sm:gap-6 sm:p-6">
        <div>
          <p className="text-overline text-blue-gray uppercase">
            {siteConfig.name}
          </p>
          <CardTitle as="p" className="mt-3">
            {siteConfig.positioning}
          </CardTitle>
          <CardDescription className="mt-3">
            {siteConfig.tagline}
          </CardDescription>
        </div>

        {channels.length > 0 ? (
          <address className="not-italic">
            <ul className="flex flex-col gap-3">
              {channels.map((channel) => {
                const Icon = channelIcons[channel.id];
                const content = (
                  <>
                    <CardIcon className="size-9">
                      <Icon className="size-4" aria-hidden />
                    </CardIcon>
                    <span>
                      <span className="text-overline text-blue-gray uppercase">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-navy">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.id}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="flex min-h-11 items-center gap-3 rounded-lg transition-colors outline-none hover:text-navy focus-visible:ring-2 focus-visible:ring-ring/70"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </address>
        ) : null}

        {social.length > 0 ? (
          <div>
            <p className="text-overline text-blue-gray uppercase">
              {contactContent.socialHeading}
            </p>
            <SocialLinks className="mt-3" />
          </div>
        ) : null}

        <div>
          <p className="text-overline text-blue-gray uppercase">
            {contactContent.nextStepsHeading}
          </p>
          <ol className="mt-4 flex flex-col gap-4">
            {contactContent.nextSteps.map((step) => (
              <li key={step.number} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-heading text-sm tracking-tight text-navy/45">
                  {step.number}
                </span>
                <span>
                  <span className="block text-sm font-medium text-navy">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-caption text-blue-gray">
                    {step.summary}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
}
