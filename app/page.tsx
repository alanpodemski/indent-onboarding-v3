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

  // Delay the layout shift so the answer animates first
  useEffect(() => {
    if (engine.step >= 2 && !expanded) {
      const t = setTimeout(() => setExpanded(true), 600)
      return () => clearTimeout(t)
    }
  }, [engine.step, expanded])

  return (
    <div className="flex h-svh flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between px-6 py-3">
        <IndentLogo />
        <UserWidget email="user@example.com" />
      </header>

      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Chat panel */}
        <div
          className="absolute top-0 bottom-0 z-10 will-change-[left,right]"
          style={{
            left: expanded ? "0" : "50%",
            width: "480px",
            transform: expanded ? "none" : "translateX(-50%)",
            transition: "left 1600ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
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
          />
        </div>

        {/* Preview panel */}
        <div
          className="absolute top-0 right-0 bottom-0 p-4 will-change-[opacity,transform]"
          style={{
            left: "480px",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(60px)",
            transition: "opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 1600ms cubic-bezier(0.16, 1, 0.3, 1) 400ms",
            pointerEvents: expanded ? "auto" : "none",
            visibility: expanded ? "visible" : "hidden",
          }}
        >
          <div className="h-full">
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
  )
}
