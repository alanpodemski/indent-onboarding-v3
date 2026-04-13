"use client"

import { useState, useEffect } from "react"
import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

export function PreviewSlack({ workspaceName }: { workspaceName: string }) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowToast(true), 600)
    const hide = setTimeout(() => setShowToast(false), 4000)
    return () => { clearTimeout(t); clearTimeout(hide) }
  }, [])

  return (
    <div className="flex h-full">
      <PreviewSidebar workspaceName={workspaceName} activeNav="review" />

      {/* Main content: notification settings */}
      <div className="relative flex-1 overflow-hidden p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[12px] font-semibold text-foreground/60">Notifications</h3>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Slack connected</span>
          </div>
        </div>

        {/* Channel list */}
        <div className="flex flex-col gap-2">
          {["#engineering", "#security", "#devops"].map((channel, i) => (
            <div
              key={channel}
              className="flex items-center justify-between rounded-lg border border-border/30 bg-background px-3 py-2.5"
              style={{
                animation: `repoSlideIn 500ms ${EASING.entrance} both`,
                animationDelay: `${i * 60}ms`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-foreground/60">{channel}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5">
                <div className="size-1 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mock Slack message preview */}
        <div
          className="mt-4 rounded-lg border border-border/30 bg-foreground/[0.02] p-3"
          style={{
            animation: `repoSlideIn 500ms ${EASING.entrance} both`,
            animationDelay: "250ms",
          }}
        >
          <div className="flex items-start gap-2">
            <div className="size-6 shrink-0 rounded bg-foreground/[0.08]" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-foreground/60">Indent Bot</span>
                <span className="text-[9px] text-muted-foreground/50">2:34 PM</span>
              </div>
              <p className="mt-0.5 text-[10px] leading-relaxed text-foreground/50">
                Access request: <span className="font-medium text-foreground/70">@sarah</span> needs read access to <span className="font-medium text-foreground/70">api-gateway</span>
              </p>
              <div className="mt-1.5 flex gap-1.5">
                <button className="rounded px-2 py-0.5 text-[9px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Approve
                </button>
                <button className="rounded px-2 py-0.5 text-[9px] font-medium bg-foreground/[0.05] text-foreground/40">
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast notification */}
        <div
          className="absolute right-4 top-4 rounded-lg border border-border/30 bg-background px-3 py-2 shadow-lg"
          style={{
            opacity: showToast ? 1 : 0,
            transform: showToast ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
            transition: `all 400ms ${showToast ? EASING.entrance : EASING.exit}`,
            pointerEvents: "none",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-medium text-foreground/60">
              New request in #engineering
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
