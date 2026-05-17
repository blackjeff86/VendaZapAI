import Image from "next/image";

type BrandLogoProps = {
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
};

const sizeMap = {
  lg: {
    mark: 56,
    wordmark: 182,
    subtitle: "text-sm",
  },
  md: {
    mark: 44,
    wordmark: 156,
    subtitle: "text-xs",
  },
  sm: {
    mark: 36,
    wordmark: 132,
    subtitle: "text-[11px]",
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
          muted: "text-white/60",
        }
      : {
          muted: "text-[#5a7361]",
        };

  const sizes = sizeMap[size];

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/brand/vendazap-mark.svg"
        alt="VendaZap AI"
        width={sizes.mark}
        height={sizes.mark}
        className="h-auto w-auto rounded-full"
        priority
      />

      {markOnly ? null : (
        <div className="min-w-0">
          <Image
            src="/brand/vendazap-wordmark.svg"
            alt="VendaZap AI"
            width={sizes.wordmark}
            height={41}
            className={`h-auto w-auto max-w-full ${
              theme === "dark" ? "drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)]" : ""
            }`}
            priority
          />
          <div className="mt-1 flex items-center gap-2">
            <p className={`${sizes.subtitle} leading-5 ${palette.muted}`}>
              Vendedor inteligente para WhatsApp
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
