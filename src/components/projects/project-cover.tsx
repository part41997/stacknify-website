import { cn } from "@/lib/utils";
import type { ProjectCategoryId } from "@/types";

const ink = "var(--brand-navy)";
const teal = "var(--brand-teal)";
const cyan = "var(--brand-cyan)";
const mint = "var(--brand-mint)";

type ProjectCoverProps = {
  category: ProjectCategoryId;
  className?: string;
};

export function ProjectCover({ category, className }: ProjectCoverProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden bg-background-soft",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_14%,color-mix(in_srgb,var(--brand-mint)_22%,white),transparent_56%),radial-gradient(ellipse_at_88%_86%,color-mix(in_srgb,var(--brand-navy)_4%,transparent),transparent_50%)]" />
      <div className="absolute inset-0 site-grid opacity-[0.22]" />
      <svg
        viewBox="0 0 960 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        fill="none"
      >
        <CoverForCategory category={category} />
      </svg>
    </div>
  );
}

function CoverForCategory({ category }: { category: ProjectCategoryId }) {
  switch (category) {
    case "mobile":
      return <MobileCover />;
    case "design":
    case "saas":
    case "web":
      return <WebCover />;
    case "ecommerce":
      return <ShopCover />;
    case "marketing":
      return <GrowthCover />;
    case "automation":
    case "ai":
    default:
      return <AutomationCover />;
  }
}

function Panel({
  x,
  y,
  w,
  h,
  r = 20,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  r?: number | string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill="white"
      fillOpacity="0.92"
      stroke={ink}
      strokeOpacity="0.08"
    />
  );
}

function Line({
  x,
  y,
  w,
  accent = false,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height="7"
      rx="3.5"
      fill={accent ? teal : ink}
      fillOpacity={accent ? 0.32 : 0.1}
    />
  );
}

function AutomationCover() {
  return (
    <g>
      <Panel x="72" y="120" w="220" h="140" />
      <Line x="96" y="156" w="72" />
      <Line x="96" y="184" w="140" accent />
      <circle cx="480" cy="300" r="88" fill={mint} fillOpacity="0.55" />
      <circle cx="480" cy="300" r="54" fill="white" stroke={ink} strokeOpacity="0.08" />
      <circle cx="480" cy="300" r="14" fill={teal} fillOpacity="0.7" />
      <Panel x="668" y="400" w="220" h="140" />
      <Line x="692" y="436" w="80" accent />
      <Line x="692" y="464" w="128" />
    </g>
  );
}

function WebCover() {
  return (
    <g>
      <Panel x="80" y="64" w="800" h="560" r="28" />
      <rect x="80" y="64" width="800" height="48" rx="28" fill={ink} fillOpacity="0.04" />
      <circle cx="116" cy="88" r="5" fill={teal} fillOpacity="0.4" />
      <Panel x="108" y="140" w="176" h="448" r="18" />
      <Line x="132" y="176" w="72" accent />
      <Line x="132" y="208" w="128" />
      <Line x="132" y="240" w="108" />
      <Panel x="312" y="140" w="216" h="112" r="16" />
      <Line x="332" y="176" w="64" />
      <Panel x="548" y="140" w="216" h="112" r="16" />
      <Line x="568" y="176" w="80" accent />
      <Panel x="312" y="276" w="536" h="312" r="18" />
      <path
        d="M352 516 C 430 480, 520 400, 640 360 C 720 332, 800 292, 820 248"
        stroke={teal}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

function MobileCover() {
  return (
    <g>
      <rect x="372" y="64" width="216" height="560" rx="36" fill="white" stroke={ink} strokeOpacity="0.1" />
      <rect x="392" y="104" width="176" height="36" rx="12" fill={ink} fillOpacity="0.05" />
      <Line x="408" y="168" w="88" accent />
      <Line x="408" y="200" w="144" />
      <Panel x="396" y="248" w="168" h="88" r="16" />
      <Panel x="396" y="352" w="168" h="88" r="16" />
      <rect x="456" y="580" width="48" height="6" rx="3" fill={ink} fillOpacity="0.12" />
    </g>
  );
}

function ShopCover() {
  return (
    <g>
      <Panel x="88" y="88" w="240" h="280" r="22" />
      <rect x="112" y="112" width="192" height="140" rx="16" fill={mint} fillOpacity="0.55" />
      <Line x="112" y="276" w="88" accent />
      <Line x="112" y="304" w="140" />
      <Panel x="360" y="88" w="240" h="280" r="22" />
      <rect x="384" y="112" width="192" height="140" rx="16" fill={ink} fillOpacity="0.04" />
      <Line x="384" y="276" w="72" />
      <Line x="384" y="304" w="128" />
      <Panel x="632" y="88" w="240" h="280" r="22" />
      <rect x="656" y="112" width="192" height="140" rx="16" fill={cyan} fillOpacity="0.1" />
      <Line x="656" y="276" w="96" accent />
      <Line x="656" y="304" w="120" />
      <Panel x="88" y="400" w="784" h="176" r="22" />
      <Line x="120" y="448" w="120" />
      <Line x="120" y="480" w="220" accent />
      <Line x="120" y="512" w="160" />
    </g>
  );
}

function GrowthCover() {
  return (
    <g>
      {[64, 108, 148, 196, 248, 304].map((height, index) => (
        <rect
          key={height}
          x={160 + index * 100}
          y={560 - height}
          width="48"
          height={height}
          rx="12"
          fill={index === 5 ? teal : ink}
          fillOpacity={index === 5 ? 0.4 : 0.07 + index * 0.03}
        />
      ))}
      <Panel x="88" y="88" w="240" h="112" />
      <Line x="112" y="128" w="88" accent />
      <Panel x="632" y="88" w="240" h="112" />
      <Line x="656" y="128" w="104" />
    </g>
  );
}
