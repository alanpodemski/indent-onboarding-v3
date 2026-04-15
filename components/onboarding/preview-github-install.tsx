"use client"

import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

export function PreviewGitHubInstall({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="relative h-full">
      {/* Background: Indent app window */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ transform: "scale(0.92) translate(-2%, -3%)", opacity: 0.5 }}
      >
        <div className="flex h-full bg-background">
          <PreviewSidebar workspaceName={workspaceName} activeNav="code" showSessions={false} />
          <div className="flex-1 p-4" />
        </div>
      </div>

      {/* Foreground: Install & Authorize — narrow card */}
      <div
        className="absolute overflow-hidden rounded-xl border border-[#d0d7de] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
        style={{
          left: "18%", right: "18%", top: "6%", bottom: "auto",
          animation: `slackWindowIn 600ms ${EASING.entrance} both`,
          animationDelay: "200ms",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center pt-5 pb-3 bg-[#f6f8fa]">
          <div className="size-9 rounded-full bg-white border border-[#d0d7de] flex items-center justify-center mb-2">
            <svg viewBox="0 0 200 200" fill="currentColor" className="size-5 text-[#24292f]">
              <path d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z" />
            </svg>
          </div>
          <h2 className="text-[13px] font-semibold text-[#24292f]">Install & Authorize <span className="text-[#0969da]">Indent</span></h2>
        </div>

        {/* Simplified content */}
        <div className="px-5 py-4">
          {/* Repo selection */}
          <div className="mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full border-[1.5px] border-[#0969da] bg-[#0969da] flex items-center justify-center">
                  <div className="size-1 rounded-full bg-white" />
                </div>
                <div className="h-1 w-20 rounded bg-[#24292f]/[0.10]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full border-[1.5px] border-[#d0d7de]" />
                <div className="h-1 w-24 rounded bg-[#24292f]/[0.06]" />
              </div>
            </div>
          </div>

          {/* Permissions as simplified bars */}
          <div className="pt-1 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#2da44e] shrink-0">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="h-1 w-full rounded bg-[#24292f]/[0.06]" />
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#2da44e] shrink-0">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="h-1 w-4/5 rounded bg-[#24292f]/[0.06]" />
              </div>
            </div>
          </div>

          {/* Buttons (non-interactive, placeholder) */}
          <div className="flex items-center gap-3">
            <div className="rounded bg-[#2da44e] px-4 py-2 text-center">
              <div className="h-1 w-20 rounded bg-white/50" />
            </div>
            <div className="h-1 w-10 rounded bg-[#57606a]/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
