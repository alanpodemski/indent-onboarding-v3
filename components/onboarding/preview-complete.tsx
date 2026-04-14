"use client"

import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

export function PreviewComplete({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="flex h-full">
      <PreviewSidebar workspaceName={workspaceName} activeNav="home" />

      {/* Main content: sample access request */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[12px] font-semibold text-foreground/60">Access Requests</h3>
          <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[10px] font-medium text-foreground/50">
            1 pending
          </span>
        </div>

        {/* Request card */}
        <div
          className="rounded-xl border border-border/40 bg-background p-4"
          style={{
            animation: `repoSlideIn 500ms ${EASING.entrance} both`,
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-foreground/[0.06] text-[10px] font-bold text-foreground/40">
                SM
              </div>
              <div>
                <p className="text-[11px] font-semibold text-foreground/70">Sarah Mitchell</p>
                <p className="text-[10px] text-muted-foreground/60">2 minutes ago</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-medium text-amber-600 dark:text-amber-400">
              Pending
            </span>
          </div>

          {/* Details */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-foreground/[0.02] px-3 py-2">
              <span className="text-[10px] text-muted-foreground/60">Resource</span>
              <span className="text-[10px] font-medium text-foreground/60">api-gateway</span>
              <span className="rounded-full border border-border/40 px-1 py-px text-[8px] text-muted-foreground/50">Private</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-foreground/[0.02] px-3 py-2">
              <span className="text-[10px] text-muted-foreground/60">Access</span>
              <span className="text-[10px] font-medium text-foreground/60">Read access · Expires in 4 hours</span>
            </div>
            <div className="rounded-lg bg-foreground/[0.02] px-3 py-2">
              <span className="text-[10px] text-muted-foreground/60">Reason</span>
              <p className="mt-0.5 text-[10px] text-foreground/60">
                Need to debug production latency issue in the payment service
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <button
              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-4 text-[11px] font-semibold text-white transition-all"
              style={{
                backgroundColor: "oklch(0.55 0.17 155)",
                animation: "approveGlow 3s ease-in-out infinite",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 9L6 13L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Approve
            </button>
            <button className="inline-flex h-8 items-center rounded-lg border border-border/40 px-4 text-[11px] font-medium text-foreground/50 transition-colors hover:bg-foreground/[0.04]">
              Deny
            </button>
          </div>
        </div>

        {/* Audit trail preview */}
        <div
          className="mt-3 rounded-lg border border-border/20 p-3"
          style={{
            animation: `repoSlideIn 500ms ${EASING.entrance} both`,
            animationDelay: "200ms",
          }}
        >
          <p className="text-[10px] font-medium text-foreground/40 mb-2">Audit Trail</p>
          <div className="space-y-1.5">
            {[
              { time: "2:34 PM", event: "Request submitted via Slack (#engineering)" },
              { time: "2:34 PM", event: "Notification sent to @alex (approver)" },
              { time: "2:36 PM", event: "Waiting for approval..." },
            ].map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-muted-foreground/50 shrink-0">{entry.time}</span>
                <div className="size-1 rounded-full bg-foreground/10" />
                <span className="text-[9px] text-foreground/40">{entry.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
