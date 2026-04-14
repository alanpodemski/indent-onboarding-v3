"use client"

import { EASING } from "@/hooks/use-chat-engine"

export function LaunchButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="pl-10"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      <button
        onClick={onClick}
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px"
        style={{
          animation: "buttonPulse 2s ease-in-out 3",
          animationDelay: "1s",
        }}
      >
        Launch Indent
        <kbd className="flex size-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white/70">
          <span className="text-xs font-bold leading-none">↵</span>
        </kbd>
      </button>
    </div>
  )
}
