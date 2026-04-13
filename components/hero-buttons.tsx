"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function HeroButtons({ delay = 0 }: { delay?: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <div
      className={cn(
        "mt-8 flex items-center gap-3 transition-all duration-600 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0",
      )}
    >
      <button className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-foreground px-5 text-[15px] font-medium text-background transition-colors hover:bg-foreground/85">
        Request access
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-60">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-border bg-background px-5 text-[15px] font-medium text-foreground transition-colors hover:bg-muted">
        Book a demo
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-40">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
