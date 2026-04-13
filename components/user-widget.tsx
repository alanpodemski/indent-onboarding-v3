"use client"

import { cn } from "@/lib/utils"

export function UserWidget({
  email,
  className,
}: {
  email: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex flex-col items-end">
        <span className="text-[11px] leading-tight text-muted-foreground/60">
          Logged in as
        </span>
        <span className="text-[12px] font-medium leading-tight text-foreground/70">
          {email}
        </span>
      </div>
      <button
        className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/40 transition-colors duration-200 hover:text-foreground"
        aria-label="Sign out"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H6" />
          <path d="M10.5 11.5L13.5 8L10.5 4.5" />
          <path d="M13.5 8H6.5" />
        </svg>
      </button>
    </div>
  )
}
