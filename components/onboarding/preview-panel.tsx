"use client"

import { PreviewFrame } from "./preview-frame"
import { PreviewEmpty } from "./preview-empty"
import { PreviewWorkspace } from "./preview-workspace"
import { PreviewGitHub } from "./preview-github"
import { PreviewSlack } from "./preview-slack"
import { PreviewComplete } from "./preview-complete"
import { PreviewRepoConfirm } from "./preview-repo-confirm"
import type { PreviewState, PendingInteraction } from "@/hooks/use-chat-engine"
import { EASING } from "@/hooks/use-chat-engine"

// Interactions that render in the preview panel instead of the chat
const PREVIEW_INTERACTIONS = new Set(["repo-confirm"])

export function isPreviewInteraction(interaction: PendingInteraction | null): boolean {
  return interaction !== null && PREVIEW_INTERACTIONS.has(interaction.type)
}

export function PreviewPanel({
  previewState,
  workspaceName,
  pendingInteraction,
  githubUser,
}: {
  previewState: PreviewState
  workspaceName: string
  pendingInteraction: PendingInteraction | null
  githubUser: string
}) {
  const title = workspaceName
    ? `${workspaceName} — Indent`
    : "Indent"

  const showRepoConfirm = pendingInteraction?.type === "repo-confirm"

  return (
    <PreviewFrame
      title={title}
      dimmed={false}
    >
      {/* Static preview states */}
      {[0, 1, 2, 3, 4].map(state => (
        <div
          key={state}
          className="absolute inset-0"
          style={{
            opacity: previewState === state && !showRepoConfirm ? 1 : 0,
            transform: previewState === state && !showRepoConfirm ? "scale(1)" : "scale(0.98)",
            transition: `opacity 500ms ${EASING.entrance}, transform 500ms ${EASING.entrance}`,
            pointerEvents: previewState === state && !showRepoConfirm ? "auto" : "none",
          }}
        >
          {state === 0 && <PreviewEmpty />}
          {state === 1 && <PreviewWorkspace workspaceName={workspaceName} />}
          {state === 2 && <PreviewGitHub workspaceName={workspaceName} />}
          {state === 3 && <PreviewSlack workspaceName={workspaceName} />}
          {state === 4 && <PreviewComplete workspaceName={workspaceName} />}
        </div>
      ))}

      {/* Interactive: Repo confirmation (full-size in preview) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: showRepoConfirm ? 1 : 0,
          transform: showRepoConfirm ? "scale(1)" : "scale(0.98)",
          transition: `opacity 500ms ${EASING.entrance}, transform 500ms ${EASING.entrance}`,
          pointerEvents: showRepoConfirm ? "auto" : "none",
        }}
      >
        <PreviewRepoConfirm
          workspaceName={workspaceName}
          githubUser={githubUser}
        />
        {/* Shimmer sweep overlay */}
        {showRepoConfirm && (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.18) 55%, transparent 70%)",
                animation: "shimmerSweep 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms both",
              }}
            />
          </div>
        )}
      </div>
    </PreviewFrame>
  )
}
