"use client"

import { useEffect, useRef, useCallback } from "react"
import { AgentMessage, UserMessage, SystemMessage, TypingIndicator } from "./chat-message"
import { ChoiceButtons } from "./choice-buttons"
import { WorkspaceInput } from "./workspace-input"
import { OAuthConnectButton } from "./oauth-connect-button"
import { GitHubInstallButton } from "./github-install-button"
import { SlackConnectCard } from "./slack-connect-card"
import { LaunchButton } from "./launch-button"
import { EASING } from "@/hooks/use-chat-engine"
import type { ChatMessage, PendingInteraction } from "@/hooks/use-chat-engine"

// Find the index where the "latest group" starts
// Latest group = the last run of agent messages (possibly preceded by the user message that triggered them)
function findLatestGroupStart(messages: ChatMessage[]): number {
  if (messages.length === 0) return 0

  // Walk backwards to find the start of the last agent message run
  let i = messages.length - 1

  // If last message is user/system, that's the start
  if (messages[i].type !== "agent") return i

  // Walk back through consecutive agent messages
  while (i > 0 && messages[i - 1].type === "agent") {
    i--
  }

  // Include the user message right before the agent group (it triggered this response)
  if (i > 0 && messages[i - 1].type === "user") {
    i--
  }

  return i
}

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
  onGoBack,
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
  onGoBack?: (step: number) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const latestRef = useRef<HTMLDivElement>(null)

  // Scroll so the latest group sits at ~40% from top
  const scrollToCenter = useCallback(() => {
    const container = scrollRef.current
    const target = latestRef.current
    if (!container || !target) return

    const containerHeight = container.clientHeight
    const targetTop = target.offsetTop
    const desiredScroll = targetTop - containerHeight * 0.35

    container.scrollTo({
      top: Math.max(0, desiredScroll),
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    // Small delay to let new messages render
    const t = setTimeout(scrollToCenter, 100)
    return () => clearTimeout(t)
  }, [messages.length, isTyping, pendingInteraction, scrollToCenter])

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

  const latestGroupStart = findLatestGroupStart(messages)

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 scrollbar-none">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => {
            const prevMsg = messages[i - 1]
            const isConsecutiveAgent = msg.type === "agent" && prevMsg?.type === "agent"
            const isFaded = i < latestGroupStart

            // Mark the start of the latest group for scroll targeting
            const isLatestStart = i === latestGroupStart

            const content = (() => {
              if (msg.type === "agent") {
                return (
                  <div style={isConsecutiveAgent ? { marginTop: -4 } : undefined}>
                    <AgentMessage
                      message={msg}
                      showAvatar={isFirstInAgentGroup(i)}
                      onComplete={() => onAgentMessageComplete(msg.id)}
                    />
                  </div>
                )
              }
              if (msg.type === "user") {
                // Allow going back on choice steps (step > 5, not workspace creation)
                const msgStep = msg.step ?? 0
                const canGoBack = isFaded && msgStep > 5 && !!onGoBack
                return (
                  <UserMessage
                    message={msg}
                    canGoBack={canGoBack}
                    onGoBack={canGoBack ? () => onGoBack(msgStep) : undefined}
                  />
                )
              }
              if (msg.type === "system") {
                return <SystemMessage message={msg} />
              }
              return null
            })()

            return (
              <div
                key={msg.id}
                ref={isLatestStart ? latestRef : undefined}
                className="transition-opacity duration-500"
                style={{ opacity: isFaded ? 0.35 : 1 }}
              >
                {content}
              </div>
            )
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

          {/* Spacer so latest content stays centered, not stuck at bottom */}
          <div style={{ minHeight: "40vh" }} />
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
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px"
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
          allowCustomInput={interaction.config?.allowCustomInput as boolean ?? false}
          customInputPlaceholder={(interaction.config?.customInputPlaceholder as string) ?? "Something else..."}
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
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-[13px] font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px no-underline"
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
