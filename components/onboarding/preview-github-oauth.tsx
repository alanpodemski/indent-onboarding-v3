"use client"

import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

export function PreviewGitHubOAuth({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="relative h-full">
      {/* Background: Indent app window */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ transform: "scale(0.92) translate(-2%, -3%)", opacity: 0.5 }}
      >
        <div className="flex h-full bg-background">
          <PreviewSidebar workspaceName={workspaceName} activeNav="home" showSessions={false} />
          <div className="flex-1 p-4" />
        </div>
      </div>

      {/* Foreground: GitHub OAuth — narrow card */}
      <div
        className="absolute overflow-hidden rounded-xl border border-[#d0d7de] bg-[#f6f8fa] shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
        style={{
          left: "18%", right: "18%", top: "8%", bottom: "auto",
          animation: `slackWindowIn 600ms ${EASING.entrance} both`,
          animationDelay: "200ms",
        }}
      >
        {/* Logo pair */}
        <div className="flex flex-col items-center pt-5 pb-3 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-9 rounded-full bg-[#f3f4f6] border border-[#d0d7de] flex items-center justify-center">
              <svg viewBox="0 0 200 200" fill="currentColor" className="size-5 text-[#24292f]">
                <path d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z" />
              </svg>
            </div>
            <div className="flex items-center gap-0.5">
              <div className="w-2 border-t border-dashed border-[#d0d7de]" />
              <div className="size-4 rounded-full bg-[#2da44e] flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5L6.5 12L13 4" /></svg>
              </div>
              <div className="w-2 border-t border-dashed border-[#d0d7de]" />
            </div>
            <div className="size-9 rounded-full bg-[#f3f4f6] border border-[#d0d7de] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#24292f]">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-[13px] font-semibold text-[#24292f]">Authorize Indent</h2>
        </div>

        {/* Simplified content */}
        <div className="bg-white px-5 py-4">
          {/* Permissions as placeholder bars */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-28 rounded bg-[#24292f]/[0.08]" />
              <div className="h-1 w-16 rounded bg-[#2da44e]/30" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-24 rounded bg-[#24292f]/[0.06]" />
              <div className="h-1 w-20 rounded bg-[#24292f]/[0.04]" />
            </div>
          </div>

          <div className="pt-1 mb-4">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-[#f3f4f6] border border-[#d0d7de]" />
              <div className="h-1 w-14 rounded bg-[#24292f]/[0.10]" />
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#2da44e]">
                <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Buttons (non-interactive, placeholder) */}
          <div className="flex gap-2">
            <div className="flex-1 rounded border border-[#d0d7de] bg-[#f6f8fa] py-2 text-center">
              <div className="h-1 w-10 mx-auto rounded bg-[#24292f]/[0.12]" />
            </div>
            <div className="flex-1 rounded bg-[#2da44e] py-2 text-center">
              <div className="h-1 w-16 mx-auto rounded bg-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
