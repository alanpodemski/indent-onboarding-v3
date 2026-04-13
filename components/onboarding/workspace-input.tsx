"use client"

import { useState, useRef, useEffect } from "react"
import { EASING } from "@/hooks/use-chat-engine"

export function WorkspaceInput({
  placeholder = "e.g. Acme Corp",
  onSubmit,
}: {
  placeholder?: string
  onSubmit: (name: string) => void
}) {
  const [value, setValue] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 400)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || submitted) return
    setSubmitted(true)
    setTimeout(() => onSubmit(trimmed), 200)
  }

  return (
    <div
      className="pl-10"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder={placeholder}
          disabled={submitted}
          className="h-10 w-64 rounded-xl border border-border bg-background px-4 text-[14px] text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/[0.06] disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || submitted}
          className="flex h-10 items-center gap-2 rounded-[10px] bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px disabled:opacity-30 disabled:pointer-events-none"
        >
          Continue
          <kbd className="flex size-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white/70">
            <span className="text-xs font-bold leading-none">↵</span>
          </kbd>
        </button>
      </div>
    </div>
  )
}
