"use client"

import { useState } from "react"
import { EASING, TIMING } from "@/hooks/use-chat-engine"

export function ChoiceButtons({
  options,
  onSelect,
}: {
  options: string[]
  onSelect: (value: string) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = (value: string) => {
    if (selected) return
    setSelected(value)
    setTimeout(() => onSelect(value), 300)
  }

  return (
    <div
      className="flex flex-col gap-2 pl-10"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className="w-fit rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] font-medium text-foreground/80 transition-all duration-300 hover:bg-foreground/[0.04] hover:border-foreground/20 active:scale-[0.98] disabled:pointer-events-none"
          style={{
            animationDelay: `${i * TIMING.stagger}ms`,
            animation: `fadeInUp 400ms ${EASING.entrance} ${i * TIMING.stagger}ms both`,
            ...(selected && selected !== option
              ? { opacity: 0.3, transform: "scale(0.97)", pointerEvents: "none" as const }
              : {}),
            ...(selected === option
              ? { borderColor: "oklch(0.50 0.17 155)", backgroundColor: "oklch(0.50 0.17 155 / 0.08)", color: "oklch(0.45 0.15 155)" }
              : {}),
            transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          disabled={!!selected}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
