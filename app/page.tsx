"use client"

import { useEffect, useState } from "react"
import { IndentLogo } from "@/components/indent-logo"
import { UserWidget } from "@/components/user-widget"
import { ChatPanel } from "@/components/onboarding/chat-panel"
import { PreviewPanel } from "@/components/onboarding/preview-panel"
import { useChatEngine } from "@/hooks/use-chat-engine"

export default function OnboardingV2() {
  const engine = useChatEngine()
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => engine.start(), 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (engine.step >= 2 && !expanded) {
      const t = setTimeout(() => setExpanded(true), 600)
      return () => clearTimeout(t)
    }
  }, [engine.step, expanded])

  return (
    <div className="flex h-svh flex-col items-center overflow-hidden">
      {/* Everything in one centered container */}
      <div className="flex w-full max-w-[1280px] flex-col flex-1 min-h-0">
        <header className="flex shrink-0 items-center justify-between px-6 py-3">
          <IndentLogo />
          <UserWidget email="user@example.com" />
        </header>

        {/* Content area — vertically centered */}
        <div className="flex flex-1 min-h-0 items-center">
          <div className="flex w-full min-h-0" style={{ maxHeight: "min(85vh, 800px)" }}>
            {/* Chat panel */}
            <div
              className="shrink-0 will-change-[width,margin]"
              style={{
                width: "480px",
                marginLeft: expanded ? "0" : "calc(50% - 240px)",
                transition: "margin-left 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <ChatPanel
                messages={engine.messages}
                isTyping={engine.isTyping}
                pendingInteraction={engine.pendingInteraction}
                githubUser={engine.githubUser}
                onAgentMessageComplete={engine.handleAgentMessageComplete}
                onUserChoice={engine.handleUserChoice}
                onWorkspaceName={engine.handleWorkspaceName}
                onOAuthSuccess={engine.handleOAuthSuccess}
                onGitHubInstall={engine.handleGitHubInstall}
                onRepoConfirm={engine.handleRepoConfirm}
                onSlackConnect={engine.handleSlackConnect}
                onSlackSkip={engine.handleSlackSkip}
                onLaunch={engine.handleLaunch}
                onGoBack={engine.goBackToStep}
              />
            </div>

            {/* Preview panel */}
            <div
              className="flex flex-1 items-start justify-center p-4 pt-0 will-change-[opacity,transform]"
              style={{
                opacity: expanded ? 1 : 0,
                transform: expanded ? "translateX(0)" : "translateX(60px)",
                transition: "opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 1600ms cubic-bezier(0.16, 1, 0.3, 1) 400ms",
                pointerEvents: expanded ? "auto" : "none",
                visibility: expanded ? "visible" : "hidden",
              }}
            >
              <div className="h-full max-h-[720px] w-full max-w-[700px]">
                <PreviewPanel
                  previewState={engine.previewState}
                  workspaceName={engine.workspaceName}
                  pendingInteraction={engine.pendingInteraction}
                  githubUser={engine.githubUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
