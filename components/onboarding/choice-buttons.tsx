"use client"

import { useState, useRef, useEffect } from "react"
import { EASING, TIMING } from "@/hooks/use-chat-engine"

export function ChoiceButtons({
  options,
  onSelect,
  allowCustomInput = false,
  customInputPlaceholder = "Something else...",
}: {
  options: string[]
  onSelect: (value: string) => void
  allowCustomInput?: boolean
  customInputPlaceholder?: string
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showInput) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [showInput])

  const handleClick = (value: string) => {
    if (selected) return
    setSelected(value)
    setTimeout(() => onSelect(value), 300)
  }

  const handleCustomSubmit = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || selected) return
    setSelected(trimmed)
    setTimeout(() => onSelect(trimmed), 200)
  }

  return (
    <div
      className="flex flex-col gap-2 pl-10"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      {options.map((option, i) => {
        const letter = String.fromCharCode(97 + i) // a, b, c, d...
        return (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className="flex w-fit cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-background py-2 pl-2 pr-3.5 text-left text-[13px] font-medium text-foreground/80 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:bg-foreground/[0.04] hover:border-foreground/20 active:scale-[0.98] disabled:pointer-events-none"
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
            <span className="flex size-5 shrink-0 items-center justify-center rounded border border-border/80 bg-foreground/[0.03] text-[10px] font-semibold uppercase text-foreground/40">
              {letter}
            </span>
            {option}
          </button>
        )
      })}

      {allowCustomInput && !selected && !showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="flex w-fit cursor-pointer items-center gap-2.5 rounded-lg border border-dashed border-border bg-background py-2 pl-2 pr-3.5 text-[13px] text-muted-foreground/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:bg-foreground/[0.04] hover:border-foreground/20 hover:text-foreground/60"
          style={{
            animation: `fadeInUp 400ms ${EASING.entrance} ${options.length * TIMING.stagger}ms both`,
          }}
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded border border-dashed border-border/80 text-[10px] font-semibold uppercase text-foreground/25">
            {String.fromCharCode(97 + options.length)}
          </span>
          Something else...
        </button>
      )}

      {allowCustomInput && showInput && !selected && (
        <div
          className="flex items-center gap-2"
          style={{ animation: `fadeInUp 300ms ${EASING.entrance} both` }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
            placeholder={customInputPlaceholder}
            className="h-10 w-64 rounded-lg border border-border bg-background px-3.5 text-[13px] text-foreground shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/[0.06]"
          />
          <button
            onClick={handleCustomSubmit}
            disabled={!inputValue.trim()}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px disabled:opacity-30 disabled:pointer-events-none"
          >
            Continue
            <kbd className="flex size-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white/70">
              <span className="text-xs font-bold leading-none">↵</span>
            </kbd>
          </button>
        </div>
      )}
    </div>
  )
}
