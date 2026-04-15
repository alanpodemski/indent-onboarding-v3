"use client"

import { useState } from "react"
import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

const MOCK_REPOS = [
  { org: "Acme", name: "web-app", visibility: "Private" as const },
  { org: "Acme", name: "api-server", visibility: "Private" as const },
  { org: "Acme", name: "shared-utils", visibility: "Private" as const },
  { org: "Acme", name: "mobile-app", visibility: "Private" as const },
  { org: "Acme", name: "design-system", visibility: "Public" as const },
  { org: "Acme", name: "auth-service", visibility: "Private" as const },
  { org: "Acme", name: "data-pipeline", visibility: "Private" as const },
  { org: "Acme", name: "infra-terraform", visibility: "Private" as const },
  { org: "Acme", name: "docs", visibility: "Public" as const },
  { org: "Acme", name: "analytics-dashboard", visibility: "Private" as const },
  { org: "Acme", name: "billing-service", visibility: "Private" as const },
  { org: "Acme", name: "notification-worker", visibility: "Private" as const },
]

export function PreviewRepoConfirm({
  workspaceName,
  githubUser,
}: {
  workspaceName: string
  githubUser: string
}) {
  const [search, setSearch] = useState("")

  const filtered = MOCK_REPOS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.org.toLowerCase().includes(search.toLowerCase())
  )

  const initials = (githubUser || "").split(" ").map(n => n[0]).join("")

  return (
    <div className="flex h-full">
      <PreviewSidebar workspaceName={workspaceName} activeNav="code" />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border/20 px-6 py-4">
          <h2 className="text-[14px] font-semibold text-foreground/80">Confirm GitHub Repositories</h2>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">Confirm these are the repositories you want to connect to</p>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4 scrollbar-none min-h-0">
          {/* Connected account card */}
          <div className="flex items-center justify-between rounded-xl border border-border/30 bg-foreground/[0.015] px-4 py-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-foreground/[0.08] text-[12px] font-bold text-foreground/40">
                {initials}
              </div>
              <div>
                <p className="text-[13px] font-medium text-foreground/80">{githubUser}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Connected</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-14 rounded bg-foreground/[0.08]" />
              <div className="rounded-lg border border-border/40 px-2.5 py-1">
                <div className="h-1 w-12 rounded bg-foreground/[0.08]" />
              </div>
            </div>
          </div>

          {/* Repositories card */}
          <div className="flex flex-col rounded-xl border border-border/30 bg-foreground/[0.015] overflow-hidden flex-1 min-h-0">
            {/* Repo header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/20">
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-foreground/40">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <span className="text-[13px] font-semibold text-foreground/70">Repositories</span>
                  <span className="ml-2 text-[11px] text-muted-foreground/60">{MOCK_REPOS.length} repositories connected</span>
                </div>
              </div>
              <div className="rounded-lg border border-border/40 px-3 py-1.5">
                <div className="h-1 w-20 rounded bg-foreground/[0.08]" />
              </div>
            </div>

            {/* Search */}
            <div className="px-4 pt-3 pb-2">
              <div className="relative">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search repositories"
                  className="w-full h-9 rounded-lg border border-border/40 bg-background pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground/20 transition-colors"
                />
              </div>
            </div>

            {/* Repo list */}
            <div className="flex-1 overflow-y-auto px-2 scrollbar-none">
              {filtered.length === 0 ? (
                <p className="py-6 text-center text-[12px] text-muted-foreground/50">No repositories found</p>
              ) : (
                filtered.map((repo, i) => (
                  <div
                    key={`${repo.org}-${repo.name}`}
                    className="flex items-center justify-between py-2.5 px-3 mx-1 rounded-lg hover:bg-foreground/[0.02] transition-colors border-b border-border/10 last:border-0"
                    style={{
                      animation: `repoSlideIn 400ms ${EASING.entrance} both`,
                      animationDelay: `${i * 25}ms`,
                    }}
                  >
                    <span className="text-[13px] text-foreground/60">
                      <span className="text-muted-foreground/60">{repo.org}</span>
                      <span className="text-muted-foreground/40 mx-0.5">/</span>
                      <span className="font-medium text-foreground/70">{repo.name}</span>
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                      repo.visibility === "Private"
                        ? "bg-foreground/[0.06] text-foreground/50"
                        : "border border-border/40 text-muted-foreground/60"
                    }`}>
                      {repo.visibility}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Footer spacer */}
            <div className="px-4 py-2 border-t border-border/20">
              <div className="h-1 w-32 rounded bg-foreground/[0.04]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
