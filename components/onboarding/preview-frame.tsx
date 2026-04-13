"use client"

import { cn } from "@/lib/utils"

export function PreviewFrame({
  title = "Indent",
  children,
  className,
  dimmed = false,
}: {
  title?: string
  children: React.ReactNode
  className?: string
  dimmed?: boolean
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-500",
        dimmed && "opacity-60 scale-[0.98]",
        className,
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Title bar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border/30 px-4">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-foreground/[0.08]" />
          <div className="size-2.5 rounded-full bg-foreground/[0.08]" />
          <div className="size-2.5 rounded-full bg-foreground/[0.08]" />
        </div>
        <div className="flex-1 text-center text-[11px] font-medium text-muted-foreground/50">
          {title}
        </div>
        <div className="w-[42px]" /> {/* Spacer to center title */}
      </div>

      {/* Content area */}
      <div className="relative flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
