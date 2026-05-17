import Image from "next/image";

type BrandLogoProps = {
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
};

const sizeMap = {
  lg: {
    gap: "gap-4",
    markWidth: "w-[7.4rem]",
    subtitle: "text-sm",
    wordmarkWidth: "w-[14.8rem]",
  },
  md: {
    gap: "gap-3",
    markWidth: "w-[6.4rem]",
    subtitle: "text-[13px]",
    wordmarkWidth: "w-[13.4rem]",
  },
  sm: {
    gap: "gap-3",
    markWidth: "w-[5.7rem]",
    subtitle: "text-xs",
    wordmarkWidth: "w-[12rem]",
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
    <div className={`flex items-center ${sizes.gap}`}>
      <Image
        src={theme === "dark" ? "/brand/vendazap-mark.svg" : "/brand/vendazap-mark-light.svg"}
        alt="Selo VendaZap AI"
        width={108}
        height={72}
        className={`h-auto ${sizes.markWidth}`}
        priority
      />

      {markOnly ? null : (
        <div className="min-w-0">
          <Image
            src={
              theme === "dark"
                ? "/brand/vendazap-wordmark.svg"
                : "/brand/vendazap-wordmark-light.svg"
            }
            alt="VendaZap AI"
            width={260}
            height={64}
            className={`h-auto ${sizes.wordmarkWidth}`}
            priority
          />
          <p className={`mt-1 ${sizes.subtitle} leading-5 ${palette.muted}`}>
            Vendedor inteligente para WhatsApp
          </p>
        </div>
      )}
    </div>
  );
}
