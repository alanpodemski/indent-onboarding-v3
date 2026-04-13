"use client"

import { PreviewSidebar } from "./preview-sidebar"
import { EASING } from "@/hooks/use-chat-engine"

const MOCK_REPOS = [
  { name: "api-gateway", visibility: "Private", lang: "TypeScript", color: "#3178C6" },
  { name: "web-app", visibility: "Private", lang: "TypeScript", color: "#3178C6" },
  { name: "infrastructure", visibility: "Private", lang: "HCL", color: "#5C4EE5" },
  { name: "docs", visibility: "Public", lang: "MDX", color: "#F9AC00" },
  { name: "shared-libs", visibility: "Private", lang: "TypeScript", color: "#3178C6" },
]

export function PreviewGitHub({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="flex h-full">
      <PreviewSidebar workspaceName={workspaceName} activeNav="code" />

      {/* Main content: repo list */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[12px] font-semibold text-foreground/60">Repositories</h3>
          <span className="text-[10px] text-muted-foreground/60">{MOCK_REPOS.length} connected</span>
        </div>

        <div className="flex flex-col gap-2">
          {MOCK_REPOS.map((repo, i) => (
            <div
              key={repo.name}
              className="flex items-center gap-3 rounded-lg border border-border/30 bg-background px-3 py-2.5 transition-all"
              style={{
                animation: `repoSlideIn 500ms ${EASING.entrance} both`,
                animationDelay: `${i * 60}ms`,
              }}
            >
              {/* Repo icon */}
              <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0 text-foreground/30">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
              </svg>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-foreground/70 truncate">{repo.name}</span>
                  <span className="rounded-full border border-border/40 px-1.5 py-px text-[9px] text-muted-foreground/60">
                    {repo.visibility}
                  </span>
                </div>
              </div>

              {/* Language indicator */}
              <div className="flex items-center gap-1">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: repo.color }}
                />
                <span className="text-[10px] text-muted-foreground/60">{repo.lang}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
