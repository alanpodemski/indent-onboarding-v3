"use client"

import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

export function PreviewSlack({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="relative h-full">
      {/* Background: Indent app window (slightly offset) */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          transform: "scale(0.92) translate(-2%, -3%)",
          opacity: 0.5,
        }}
      >
        <div className="flex h-full bg-background">
          <PreviewSidebar workspaceName={workspaceName} activeNav="code" showSessions={false} />
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium text-foreground/40">Code Sessions</span>
            </div>
            <div className="space-y-2">
              {["Fix Webhook N+1", "Settings page refactor"].map((s) => (
                <div key={s} className="rounded-lg border border-border/20 bg-foreground/[0.02] px-3 py-2">
                  <div className="h-1 w-24 rounded bg-foreground/[0.06]" />
                  <div className="mt-1 h-1 w-16 rounded bg-foreground/[0.04]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Foreground: Slack window */}
      <div
        className="absolute inset-0 overflow-hidden rounded-xl border border-border/40 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        style={{
          transform: "scale(0.88) translate(4%, 5%)",
          animation: `slackWindowIn 600ms ${EASING.entrance} both`,
          animationDelay: "200ms",
        }}
      >
        {/* Slack title bar */}
        <div className="flex items-center gap-2 border-b border-border/30 bg-[#4A154B] px-3 py-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
          </div>
          <span className="ml-2 text-[10px] font-medium text-white/70">{workspaceName} — Slack</span>
        </div>

        <div className="flex h-full">
          {/* Slack sidebar */}
          <div className="w-[140px] shrink-0 border-r border-border/20 bg-[#4A154B] px-2 py-2">
            <div className="mb-2">
              <span className="px-2 text-[9px] font-semibold uppercase tracking-wider text-white/40">Channels</span>
            </div>
            {["#general", "#engineering", "#incidents", "#deploys"].map((ch, i) => (
              <div
                key={ch}
                className={`flex items-center gap-1.5 rounded px-2 py-1 text-[10px] ${
                  ch === "#engineering" ? "bg-white/10 text-white font-medium" : "text-white/50"
                }`}
              >
                <span className="text-white/30">#</span>
                {ch.slice(1)}
              </div>
            ))}
            <div className="mt-3 mb-2">
              <span className="px-2 text-[9px] font-semibold uppercase tracking-wider text-white/40">Apps</span>
            </div>
            <div className="flex items-center gap-1.5 rounded px-2 py-1 text-[10px] text-white/50">
              <div className="size-3 rounded bg-white/15 flex items-center justify-center">
                <svg viewBox="0 0 200 200" fill="currentColor" className="size-2 text-white/50">
                  <path d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z" />
                </svg>
              </div>
              Indent
            </div>
          </div>

          {/* Slack main area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Channel header */}
            <div className="border-b border-border/20 px-4 py-2">
              <span className="text-[11px] font-semibold text-foreground/70">#engineering</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden px-4 py-3 space-y-3">
              {/* Regular message */}
              <div className="flex items-start gap-2">
                <div className="size-6 shrink-0 rounded bg-orange-200 flex items-center justify-center text-[8px] font-bold text-orange-700">SK</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-foreground/70">Sarah Kim</span>
                    <span className="text-[9px] text-muted-foreground/40">2:31 PM</span>
                  </div>
                  <p className="text-[10px] text-foreground/50 leading-relaxed">just deployed the API changes to staging</p>
                </div>
              </div>

              {/* Indent Bot message */}
              <div
                className="flex items-start gap-2"
                style={{
                  animation: `fadeInUp 400ms ${EASING.entrance} both`,
                  animationDelay: "600ms",
                }}
              >
                <div className="size-6 shrink-0 rounded bg-foreground/[0.08] flex items-center justify-center">
                  <svg viewBox="0 0 200 200" fill="currentColor" className="size-3 text-foreground/40">
                    <path d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-foreground/70">Indent</span>
                    <span className="rounded bg-foreground/[0.06] px-1 py-px text-[8px] font-medium text-foreground/40">APP</span>
                    <span className="text-[9px] text-muted-foreground/40">2:34 PM</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-foreground/50 leading-relaxed">
                    Access request: <span className="font-medium text-foreground/70">@sarah</span> needs read access to <span className="font-medium text-foreground/70">api-gateway</span>
                  </p>
                  <div className="mt-1.5 flex gap-1.5">
                    <button className="rounded px-2 py-0.5 text-[9px] font-medium bg-emerald-500/15 text-emerald-600">
                      Approve
                    </button>
                    <button className="rounded px-2 py-0.5 text-[9px] font-medium bg-foreground/[0.05] text-foreground/40">
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
