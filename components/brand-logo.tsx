import Image from "next/image";

type BrandLogoProps = {
  markOnly?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
};

const sizeMap = {
  lg: {
    gap: "gap-1",
    markWidth: "w-[4.6rem]",
    wordmarkWidth: "w-[12.6rem]",
  },
  md: {
    gap: "gap-1",
    markWidth: "w-[4rem]",
    wordmarkWidth: "w-[11rem]",
  },
  sm: {
    gap: "gap-0.5",
    markWidth: "w-[3.5rem]",
    wordmarkWidth: "w-[9rem]",
  },
} as const;

export function BrandLogo({
  markOnly = false,
  size = "md",
  theme = "light",
}: BrandLogoProps) {
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
        </div>
      )}
    </div>
  );
}
