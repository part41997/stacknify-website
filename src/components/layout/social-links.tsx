import { getSocialLinks } from "@/data/contact";
import { cn } from "@/lib/utils";
import type { SocialPlatform } from "@/types";

const socialIcons: Record<SocialPlatform, { viewBox: string; path: string }> = {
  linkedin: {
    viewBox: "0 0 24 24",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z",
  },
  instagram: {
    viewBox: "0 0 24 24",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z",
  },
  facebook: {
    viewBox: "0 0 24 24",
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05v-2.66c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.87v2.3h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z",
  },
  pinterest: {
    viewBox: "0 0 24 24",
    path: "M12.02 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.41 7.6 11.16-.1-.95-.2-2.4.04-3.44.22-.94 1.4-5.96 1.4-5.96s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.76 1.51 1.68 0 1.02-.65 2.55-1 3.97-.28 1.19.6 2.16 1.78 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34-.09.37-.29 1.17-.33 1.33-.05.22-.17.26-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.78 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.47-6.23 7.47-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15C9.57 23.73 10.76 24 12.02 24c6.62 0 11.98-5.37 11.98-12S18.64 0 12.02 0z",
  },
  youtube: {
    viewBox: "0 0 24 24",
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.56 12 3.56 12 3.56s-7.54 0-9.38.49A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.49 9.38.49 9.38.49s7.54 0 9.38-.49a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  },
  x: {
    viewBox: "0 0 24 24",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.81-5.96 6.81H1.67l7.73-8.84L1.25 2.25h6.81l4.71 6.23 5.47-6.23zm-1.16 17.52h1.83L7.01 4.06H5.05l12.03 15.71z",
  },
};

type SocialLinksProps = {
  tone?: "mist" | "navy";
  className?: string;
};

export function SocialLinks({ tone = "mist", className }: SocialLinksProps) {
  const social = getSocialLinks();

  if (social.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Social" className={cn("flex flex-wrap gap-2", className)}>
      {social.map((link) => {
        const icon = socialIcons[link.id];

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${link.label} (opens in a new tab)`}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-xl transition-[color,border-color,background-color] duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring/70",
                tone === "navy"
                  ? "text-white/50 hover:bg-white/8 hover:text-white focus-visible:ring-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  : "border border-navy/10 bg-surface text-navy/50 hover:border-navy/25 hover:bg-navy/[0.03] hover:text-navy focus-visible:ring-offset-2",
              )}
            >
              <svg
                viewBox={icon.viewBox}
                className="size-4"
                aria-hidden
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
