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
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium text-foreground/40">Getting started...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground: GitHub OAuth window */}
      <div
        className="absolute inset-0 overflow-hidden rounded-xl border border-border/40 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        style={{
          transform: "scale(0.82) translate(6%, 8%)",
          animation: `slackWindowIn 600ms ${EASING.entrance} both`,
          animationDelay: "200ms",
        }}
      >
        {/* GitHub title bar */}
        <div className="flex items-center gap-2 border-b border-border/30 bg-[#24292f] px-3 py-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
          </div>
          <span className="ml-2 text-[10px] font-medium text-white/70">github.com — Authorize Indent</span>
        </div>

        <div className="flex flex-col items-center px-8 py-6">
          {/* GitHub logo */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-10 text-[#24292f] mb-4">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>

          <h2 className="text-[14px] font-semibold text-[#24292f] mb-1">Authorize Indent</h2>
          <p className="text-[11px] text-[#57606a] text-center mb-5">Indent by indent-com wants to access your account</p>

          {/* Permissions */}
          <div className="w-full space-y-2 mb-5">
            {[
              { label: "Read your profile", icon: "👤" },
              { label: "Read & write repositories", icon: "📁" },
              { label: "Read organization membership", icon: "🏢" },
            ].map((perm) => (
              <div key={perm.label} className="flex items-center gap-2.5 rounded-md border border-[#d0d7de] px-3 py-2">
                <span className="text-[12px]">{perm.icon}</span>
                <span className="text-[11px] text-[#24292f]">{perm.label}</span>
              </div>
            ))}
          </div>

          {/* Authorize button */}
          <div className="w-full rounded-md bg-[#2da44e] px-4 py-2 text-center">
            <span className="text-[12px] font-semibold text-white">Authorize indent-com</span>
          </div>

          <p className="mt-3 text-[9px] text-[#57606a] text-center">
            Authorizing will redirect to indent.com
          </p>
        </div>
      </div>
    </div>
  )
}
