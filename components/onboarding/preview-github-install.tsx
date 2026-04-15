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
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium text-foreground/40">Waiting for GitHub App...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground: GitHub App Install window */}
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
          <span className="ml-2 text-[10px] font-medium text-white/70">github.com — Install Indent</span>
        </div>

        <div className="flex flex-col px-6 py-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-foreground/[0.08] flex items-center justify-center">
              <svg viewBox="0 0 200 200" fill="currentColor" className="size-6 text-foreground/40">
                <path d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-[#24292f]">Install Indent</h2>
              <p className="text-[11px] text-[#57606a]">by indent-com</p>
            </div>
          </div>

          {/* Repository access */}
          <div className="border border-[#d0d7de] rounded-md mb-4">
            <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-3 py-2">
              <span className="text-[11px] font-semibold text-[#24292f]">Repository access</span>
            </div>
            <div className="px-3 py-2.5 space-y-2">
              <label className="flex items-center gap-2 text-[11px] text-[#24292f]">
                <div className="size-3.5 rounded-full border-[1.5px] border-[#d0d7de]" />
                All repositories
              </label>
              <label className="flex items-center gap-2 text-[11px] text-[#24292f]">
                <div className="size-3.5 rounded-full border-[1.5px] border-[#2da44e] bg-[#2da44e] flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-white" />
                </div>
                Only select repositories
              </label>

              {/* Selected repos */}
              <div className="ml-5 space-y-1">
                {["api-gateway", "web-app", "infrastructure", "shared-libs", "docs"].map((repo) => (
                  <div key={repo} className="flex items-center gap-1.5 text-[10px] text-[#57606a]">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="size-3 text-[#57606a]/60">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Z" />
                    </svg>
                    {repo}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="border border-[#d0d7de] rounded-md mb-5">
            <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-3 py-2">
              <span className="text-[11px] font-semibold text-[#24292f]">Permissions</span>
            </div>
            <div className="px-3 py-2 space-y-1">
              {[
                { perm: "Read access to metadata", level: "Read" },
                { perm: "Read and write access to code", level: "Read & Write" },
                { perm: "Read and write access to pull requests", level: "Read & Write" },
                { perm: "Read access to members", level: "Read" },
              ].map((p) => (
                <div key={p.perm} className="flex items-center justify-between text-[10px] py-0.5">
                  <span className="text-[#24292f]">{p.perm}</span>
                  <span className="text-[#57606a] text-[9px]">{p.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Install button */}
          <div className="rounded-md bg-[#2da44e] px-4 py-2 text-center">
            <span className="text-[12px] font-semibold text-white">Install</span>
          </div>
        </div>
      </div>
    </div>
  )
}
