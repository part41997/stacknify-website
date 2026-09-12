import { cn } from "@/lib/utils";

const nav = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "analytics", label: "Analytics", active: false },
  { id: "users", label: "Users", active: false },
  { id: "data", label: "Data", active: false },
  { id: "settings", label: "Settings", active: false },
] as const;

const kpis = [
  { label: "Active workflows", value: "128", delta: "+12%" },
  { label: "Completion", value: "94.2%", delta: "+2.1%" },
  { label: "Cycle time", value: "4.6h", delta: "−18%" },
] as const;

const roster = [
  { mark: "EO", role: "East ops", state: "Live" },
  { mark: "FD", role: "Finance desk", state: "Live" },
  { mark: "FS", role: "Field support", state: "Idle" },
] as const;

type SaasDashboardVisualProps = {
  className?: string;
};

export function SaasDashboardVisual({ className }: SaasDashboardVisualProps) {
  return (
    <div
      className={cn("absolute inset-0 bg-[#F4F7F8] p-3 sm:p-3.5", className)}
      aria-hidden
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[0.9rem] border border-navy/10 bg-white shadow-[0_20px_44px_-26px_rgb(15_23_42_/_0.3)]">
        <div className="flex h-8 shrink-0 items-center gap-2 border-b border-navy/8 bg-[#F7F9FA] px-3">
          <span className="size-1.5 rounded-full bg-navy/18" />
          <span className="size-1.5 rounded-full bg-navy/12" />
          <span className="size-1.5 rounded-full bg-navy/8" />
          <div className="mx-auto flex h-5 w-[min(58%,14rem)] items-center justify-center rounded-md bg-white text-[0.5625rem] tracking-[0.01em] text-navy/40 ring-1 ring-navy/8">
            app.keelwork.io/overview
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <aside className="flex w-[4.25rem] shrink-0 flex-col gap-1 border-r border-navy/8 bg-[#FAFCFC] px-2 py-3 sm:w-[8.5rem] sm:px-3">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="size-4 rounded-[0.3rem] bg-navy" />
              <span className="hidden font-heading text-[0.6875rem] tracking-[-0.03em] text-navy sm:block">
                Keelwork
              </span>
            </div>
            {nav.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[0.625rem] tracking-[0.04em] uppercase",
                  item.active
                    ? "bg-mint text-navy"
                    : "text-navy/45",
                )}
              >
                <NavMark id={item.id} />
                <span className="hidden sm:inline">{item.label}</span>
              </div>
            ))}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col bg-white">
            <header className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-navy/8 px-3 sm:px-4">
              <p className="font-heading text-[0.8125rem] tracking-[-0.03em] text-navy">
                Operations
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex size-6 items-center justify-center rounded-md bg-navy/5 text-navy">
                  <BellMark />
                  <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-brand-teal" />
                </span>
                <span className="flex size-6 items-center justify-center rounded-full bg-mint text-[0.5625rem] font-medium text-navy">
                  KW
                </span>
              </div>
            </header>

            <div className="grid min-h-0 flex-1 grid-cols-12 gap-2.5 overflow-hidden p-3 sm:gap-3 sm:p-4">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="col-span-4 rounded-xl border border-navy/8 bg-white px-2.5 py-2"
                >
                  <p className="text-[0.5625rem] tracking-[0.06em] text-navy/40 uppercase">
                    {kpi.label}
                  </p>
                  <p className="mt-1 font-heading text-[0.95rem] tracking-[-0.03em] text-navy sm:text-[1.05rem]">
                    {kpi.value}
                  </p>
                  <p className="text-[0.5625rem] text-brand-teal">{kpi.delta}</p>
                </div>
              ))}

              <div className="col-span-12 flex min-h-0 flex-col rounded-xl border border-navy/8 bg-white p-2.5 sm:col-span-7 sm:p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[0.625rem] tracking-[0.08em] text-navy/45 uppercase">
                    Analytics
                  </p>
                  <p className="text-[0.5625rem] text-navy/35">Last 14 days</p>
                </div>
                <svg
                  viewBox="0 0 280 108"
                  className="h-full min-h-[4.5rem] w-full"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M0 86 L24 78 L48 80 L72 58 L96 64 L120 42 L144 48 L168 28 L192 34 L216 18 L240 24 L280 12 L280 108 L0 108 Z"
                    fill="var(--brand-mint)"
                    fillOpacity="0.7"
                  />
                  <path
                    d="M0 86 L24 78 L48 80 L72 58 L96 64 L120 42 L144 48 L168 28 L192 34 L216 18 L240 24 L280 12"
                    stroke="var(--brand-teal)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="216" cy="18" r="3.2" fill="var(--brand-cyan)" />
                </svg>
              </div>

              <div className="col-span-12 flex min-h-0 flex-col rounded-xl border border-navy/8 bg-white p-2.5 sm:col-span-5 sm:p-3">
                <p className="mb-2 text-[0.625rem] tracking-[0.08em] text-navy/45 uppercase">
                  Users
                </p>
                <div className="flex flex-col gap-2">
                  {roster.map((row) => (
                    <div key={row.role} className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-mint text-[0.5rem] font-medium text-navy">
                        {row.mark}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[0.6875rem] text-navy">
                        {row.role}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[0.5rem] uppercase",
                          row.state === "Live"
                            ? "bg-mint text-teal"
                            : "bg-navy/5 text-navy/40",
                        )}
                      >
                        {row.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavMark({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none">
      {id === "dashboard" ? (
        <>
          <rect x="2" y="2" width="5.2" height="5.2" rx="1" fill="currentColor" />
          <rect x="8.8" y="2" width="5.2" height="3.4" rx="1" fill="currentColor" opacity="0.45" />
          <rect x="2" y="8.8" width="5.2" height="5.2" rx="1" fill="currentColor" opacity="0.45" />
          <rect x="8.8" y="6.4" width="5.2" height="7.6" rx="1" fill="currentColor" opacity="0.7" />
        </>
      ) : null}
      {id === "analytics" ? (
        <path
          d="M3 12 V8 M6.5 12 V4.5 M10 12 V7 M13 12 V3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : null}
      {id === "users" ? (
        <>
          <circle cx="6" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2.8 12c.4-2 1.8-3.1 3.2-3.1S9.2 10 9.6 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="11" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        </>
      ) : null}
      {id === "data" ? (
        <>
          <ellipse cx="8" cy="4.2" rx="5" ry="1.8" stroke="currentColor" strokeWidth="1.3" />
          <path d="M3 4.2v7.4c0 1 2.2 1.8 5 1.8s5-.8 5-1.8V4.2" stroke="currentColor" strokeWidth="1.3" />
        </>
      ) : null}
      {id === "settings" ? (
        <circle cx="8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.3" />
      ) : null}
    </svg>
  );
}

function BellMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
      <path
        d="M4 7.2c0-2.2 1.8-4 4-4s4 1.8 4 4v2.1l1 1.4H3l1-1.4V7.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M6.6 12.4a1.5 1.5 0 0 0 2.8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
