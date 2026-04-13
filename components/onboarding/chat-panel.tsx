"use client"

import { useEffect, useRef } from "react"
import { AgentMessage, UserMessage, SystemMessage, TypingIndicator } from "./chat-message"
import { ChoiceButtons } from "./choice-buttons"
import { WorkspaceInput } from "./workspace-input"
import { OAuthConnectButton } from "./oauth-connect-button"
import { GitHubInstallButton } from "./github-install-button"
import { SlackConnectCard } from "./slack-connect-card"
import { LaunchButton } from "./launch-button"
import { EASING } from "@/hooks/use-chat-engine"
import type { ChatMessage, PendingInteraction } from "@/hooks/use-chat-engine"

export function ChatPanel({
  messages,
  isTyping,
  pendingInteraction,
  githubUser,
  onAgentMessageComplete,
  onUserChoice,
  onWorkspaceName,
  onOAuthSuccess,
  onGitHubInstall,
  onRepoConfirm,
  onSlackConnect,
  onSlackSkip,
  onLaunch,
}: {
  messages: ChatMessage[]
  isTyping: boolean
  pendingInteraction: PendingInteraction | null
  githubUser: string
  onAgentMessageComplete: (id: number) => void
  onUserChoice: (value: string) => void
  onWorkspaceName: (name: string) => void
  onOAuthSuccess: (provider: "github" | "slack") => void
  onGitHubInstall: () => void
  onRepoConfirm: (count: number) => void
  onSlackConnect: () => void
  onSlackSkip: () => void
  onLaunch: () => void
}) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages.length, isTyping, pendingInteraction])

  const isFirstInAgentGroup = (index: number): boolean => {
    const msg = messages[index]
    if (msg.type !== "agent") return false
    const prevMsg = messages[index - 1]
    if (!prevMsg || prevMsg.type !== "agent") return true
    return false
  }

  const typingShowsAvatar = isTyping && (
    messages.length === 0 ||
    messages[messages.length - 1].type !== "agent"
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-none">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => {
            const prevMsg = messages[i - 1]
            const isConsecutiveAgent = msg.type === "agent" && prevMsg?.type === "agent"

            if (msg.type === "agent") {
              return (
                <div key={msg.id} style={isConsecutiveAgent ? { marginTop: -4 } : undefined}>
                  <AgentMessage
                    message={msg}
                    showAvatar={isFirstInAgentGroup(i)}
                    onComplete={() => onAgentMessageComplete(msg.id)}
                  />
                </div>
              )
            }
            if (msg.type === "user") {
              return <UserMessage key={msg.id} message={msg} />
            }
            if (msg.type === "system") {
              return <SystemMessage key={msg.id} message={msg} />
            }
            return null
          })}

          {isTyping && <TypingIndicator showAvatar={typingShowsAvatar} />}

          {pendingInteraction && (
            <InteractionRenderer
              interaction={pendingInteraction}
              githubUser={githubUser}
              onUserChoice={onUserChoice}
              onWorkspaceName={onWorkspaceName}
              onOAuthSuccess={onOAuthSuccess}
              onGitHubInstall={onGitHubInstall}
              onRepoConfirm={onRepoConfirm}
              onSlackConnect={onSlackConnect}
              onSlackSkip={onSlackSkip}
              onLaunch={onLaunch}
            />
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}

function RepoConfirmButton({ onConfirm }: { onConfirm: (count: number) => void }) {
  return (
    <div
      className="pl-10"
      style={{ animation: `fadeInUp 400ms ${EASING.entrance} both` }}
    >
      <button
        onClick={() => onConfirm(12)}
        className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px"
      >
        Confirm and Continue
        <kbd className="flex size-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white/70">
          <span className="text-xs font-bold leading-none">↵</span>
        </kbd>
      </button>
    </div>
  )
}

function InteractionRenderer({
  interaction,
  githubUser,
  onUserChoice,
  onWorkspaceName,
  onOAuthSuccess,
  onGitHubInstall,
  onRepoConfirm,
  onSlackConnect,
  onSlackSkip,
  onLaunch,
}: {
  interaction: PendingInteraction
  githubUser: string
  onUserChoice: (value: string) => void
  onWorkspaceName: (name: string) => void
  onOAuthSuccess: (provider: "github" | "slack") => void
  onGitHubInstall: () => void
  onRepoConfirm: (count: number) => void
  onSlackConnect: () => void
  onSlackSkip: () => void
  onLaunch: () => void
}) {
  switch (interaction.type) {
    case "choice":
      return (
        <ChoiceButtons
          options={(interaction.config?.options as string[]) ?? []}
          onSelect={onUserChoice}
        />
      )
    case "input":
      return (
        <WorkspaceInput
          placeholder={(interaction.config?.placeholder as string) ?? "e.g. Acme Corp"}
          onSubmit={onWorkspaceName}
        />
      )
    case "oauth-github":
      return (
        <OAuthConnectButton
          provider="github"
          onSuccess={() => onOAuthSuccess("github")}
        />
      )
    case "github-install":
      return <GitHubInstallButton onSuccess={onGitHubInstall} />
    case "repo-confirm":
      return <RepoConfirmButton onConfirm={onRepoConfirm} />
    case "slack-connect":
      return (
        <SlackConnectCard
          onConnect={onSlackConnect}
          onSkip={onSlackSkip}
        />
      )
    case "launch":
      return <LaunchButton onClick={onLaunch} />
    case "go-to-app":
      return (
        <div
          className="pl-10"
          style={{ animation: `fadeInUp 400ms ${EASING.entrance} both` }}
        >
          <a
            href="#"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px no-underline"
          >
            Go to Indent
            <kbd className="flex size-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white/70">
              <span className="text-xs font-bold leading-none">↵</span>
            </kbd>
          </a>
        </div>
      )
    default:
      return null
  }
}
