"use client"

import { cn } from "@/lib/utils"

const STEP_LABELS = ["Goals", "GitHub", "Repos", "Slack"]

export function ProgressSteps({
  currentStep,
  onStepClick,
  className,
}: {
  currentStep: number // page-level step (0-4)
  onStepClick?: (pageStep: number) => void
  className?: string
}) {
  // Map page step to progress index:
  // step 0,1 = none active (before goals)
  // step 2 = Goals active (index 0)
  // step 3 = GitHub active (index 1)
  // step 4 = Repos active (index 2)
  const activeIndex = currentStep >= 2 ? currentStep - 2 : -1

  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {/* Progress bar track */}
      <div className="flex gap-1">
        {STEP_LABELS.map((_, i) => {
          const isPast = i < activeIndex
          const isCurrent = i === activeIndex
          // Stagger: past steps complete quickly, current step starts after past ones finish
          const delay = isCurrent ? `${Math.max(0, activeIndex) * 150}ms` : `${i * 150}ms`

          return (
            <div
              key={i}
              className="h-[3px] flex-1 overflow-hidden rounded-full"
              style={{
                backgroundColor: "oklch(0.35 0.015 260 / 0.08)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: isPast ? "100%" : isCurrent ? "50%" : "0%",
                  backgroundColor: "oklch(0.50 0.17 155)",
                  transition: `width 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Labels */}
      <div className="flex">
        {STEP_LABELS.map((label, i) => {
          const isPast = i < activeIndex
          const isCurrent = i === activeIndex
          const isFuture = i > activeIndex || activeIndex === -1

          return (
            <button
              key={i}
              onClick={() => isPast && onStepClick?.(i + 2)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1 text-[12px] font-medium transition-all duration-300",
                isPast && "cursor-pointer hover:opacity-80",
                isCurrent && "cursor-default",
                isFuture && "cursor-default",
              )}
              style={{
                color: isCurrent
                  ? "oklch(0.45 0.15 155)"
                  : isPast
                    ? "oklch(0.35 0.015 260 / 0.50)"
                    : "oklch(0.35 0.015 260 / 0.35)",
              }}
            >
              {isPast && (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0"
                  style={{ color: "oklch(0.35 0.015 260 / 0.50)" }}
                >
                  <path d="M2 9L6 13L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
