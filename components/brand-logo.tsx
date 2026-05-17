type BrandLogoProps = {
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
};

const sizeMap = {
  lg: {
    badge: "h-14 w-14",
    dot: "h-3 w-3",
    subtitle: "text-sm",
    title: "text-xl",
  },
  md: {
    badge: "h-11 w-11",
    dot: "h-2.5 w-2.5",
    subtitle: "text-xs",
    title: "text-lg",
  },
  sm: {
    badge: "h-9 w-9",
    dot: "h-2 w-2",
    subtitle: "text-[11px]",
    title: "text-base",
  },
} as const;

export function BrandLogo({
  markOnly = false,
  size = "md",
  theme = "light",
}: BrandLogoProps) {
  const palette =
    theme === "dark"
      ? {
          accent: "text-[#9bf0b4]",
          body: "text-white",
          muted: "text-white/62",
          pill: "border-white/10 bg-white/6 text-[#9bf0b4]",
        }
      : {
          accent: "text-[#2d8a4b]",
          body: "text-[#173424]",
          muted: "text-[#5a7361]",
          pill: "border-[#d6e6d8] bg-[#f6fbf6] text-[#2d8a4b]",
        };

  const sizes = sizeMap[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex ${sizes.badge} items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,#42d96a_0%,#1b8e43_38%,#0d3d22_78%,#082415_100%)] shadow-[0_16px_30px_rgba(17,72,39,0.28)]`}
        aria-hidden="true"
      >
        <div className="absolute inset-[4px] rounded-[1rem] border border-white/10" />
        <svg viewBox="0 0 64 64" className="relative z-10 h-[72%] w-[72%]">
          <defs>
            <linearGradient id="vz-accent" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#d6ff7c" />
              <stop offset="100%" stopColor="#7df0a2" />
            </linearGradient>
          </defs>
          <path
            d="M15 18c0-2.8 2.2-5 5-5h24c2.8 0 5 2.2 5 5v16c0 2.8-2.2 5-5 5H31.5l-8.8 8.2c-1.5 1.4-3.7.3-3.7-1.7V39h-1c-2.8 0-5-2.2-5-5V18Z"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1.5"
          />
          <path
            d="M18 21.5h7.2l6.3 13.6 6.1-13.6H45L34.4 43h-5.8L18 21.5Z"
            fill="white"
          />
          <path
            d="M42 17.5h6.7l-3.3 7.1H39l3-7.1Z"
            fill="url(#vz-accent)"
          />
        </svg>
      </div>

      {markOnly ? null : (
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className={`display-font ${sizes.title} font-semibold tracking-tight ${palette.body}`}>
              VendaZap
            </p>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${palette.pill}`}
            >
              AI
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className={`${sizes.dot} rounded-full bg-[#42d96a]`} />
            <p className={`${sizes.subtitle} leading-5 ${palette.muted}`}>
              Vendedor inteligente para WhatsApp
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
