"use client";

import { useState } from "react";

type PerformanceChartProps = {
  bars: number[];
  compact?: boolean;
  labels: string[];
  values: string[];
};

export function PerformanceChart({
  bars,
  compact = false,
  labels,
  values,
}: PerformanceChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(bars.length - 1);

  const currentIndex = activeIndex ?? bars.length - 1;

  return (
    <div>
      <div
        className={`mb-3 flex items-center justify-between rounded-xl border border-[#bacbbc]/20 bg-[#f8fafb] px-3 py-2 ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        <span className="font-semibold text-[#191c1d]">{labels[currentIndex]}</span>
        <span className="font-bold text-[#006d3e]">{values[currentIndex]}</span>
      </div>

      <div className={`flex items-end px-2 ${compact ? "h-40 gap-2" : "h-64 gap-3 pb-4"}`}>
        {bars.map((height, index) => {
          const isActive = currentIndex === index;

          return (
            <button
              key={`${height}-${labels[index]}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className={`group relative flex-1 rounded-t-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#006d3e] shadow-[0_10px_20px_rgba(0,109,62,0.16)]"
                  : compact
                    ? "bg-[#e6e8e9] hover:bg-[#cfd6d1]"
                    : "bg-[#25d366]/20 hover:bg-[#25d366]/35"
              }`}
              style={{ height: `${height}%` }}
              aria-label={`${labels[index]}: ${values[index]}`}
            >
              {!compact ? (
                <span
                  className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                    isActive
                      ? "bg-[#263143] text-white opacity-100"
                      : "bg-[#263143] text-white opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {values[index]}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className={`mt-2 flex justify-between px-2 font-semibold text-[#6b7b6e] ${
          compact
            ? "text-[11px]"
            : "text-[10px] uppercase tracking-[0.08em]"
        }`}
      >
        {labels.map((label, index) => (
          <span key={label} className={currentIndex === index ? "text-[#006d3e]" : ""}>
            {compact ? label.charAt(0) : label}
          </span>
        ))}
      </div>
    </div>
  );
}
