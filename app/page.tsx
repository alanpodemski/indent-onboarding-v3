"use client"

import { useEffect } from "react"
import { IndentLogo } from "@/components/indent-logo"
import { UserWidget } from "@/components/user-widget"
import { ChatPanel } from "@/components/onboarding/chat-panel"
import { PreviewPanel } from "@/components/onboarding/preview-panel"
import { useChatEngine } from "@/hooks/use-chat-engine"

export default function OnboardingV2() {
  const engine = useChatEngine()

  useEffect(() => {
    const t = setTimeout(() => engine.start(), 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-svh flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b border-border/30 px-6 py-3">
        <IndentLogo />
        <UserWidget email="user@example.com" />
      </header>

      <div className="flex flex-1 min-h-0">
        <div className="w-[480px] shrink-0 border-r border-border/30">
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

        <div className="flex-1 p-4">
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
