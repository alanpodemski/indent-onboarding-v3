"use client"

import { AgentText, type AgentCharset } from "@/components/agent-text"
import { AGENT_TEXT_DEFAULTS, EASING } from "@/hooks/use-chat-engine"
import type { ChatMessage as ChatMessageType } from "@/hooks/use-chat-engine"
import { ProductCard } from "./product-card"

// ── Indent avatar (reusable) ────────────────────────────────────
function IndentAvatar() {
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06]">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="size-3.5 text-foreground/40"
      >
        <path
          d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

// ── Agent message ───────────────────────────────────────────────
// showAvatar: true = render avatar; false = just indent to align with grouped messages above
export function AgentMessage({
  message,
  onComplete,
  showAvatar,
}: {
  message: ChatMessageType
  onComplete?: () => void
  showAvatar: boolean
}) {
  // Detect [PRODUCT:Name] prefix
  const productMatch = message.content.match(/^\[PRODUCT:(.+?)\]\s*(.+)$/)

  if (productMatch) {
    const productName = productMatch[1]
    const description = productMatch[2]

    return (
      <div className="flex gap-3 max-w-[420px]">
        <div className="w-7 shrink-0 flex items-start pt-0.5">
          {showAvatar && <IndentAvatar />}
        </div>
        <div className="flex-1 pt-0.5">
          <ProductCard name={productName} description={description} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3 max-w-[420px]">
      {/* Avatar column — always takes space, only renders avatar on first in group */}
      <div className="w-7 shrink-0 flex items-start pt-0.5">
        {showAvatar && <IndentAvatar />}
      </div>

      {/* Message text */}
      <div className="text-[15px] leading-relaxed text-foreground/90 pt-0.5">
        <AgentText
          text={message.content}
          charset={AGENT_TEXT_DEFAULTS.charset as AgentCharset}
          charSpeed={AGENT_TEXT_DEFAULTS.charSpeed}
          stagger={AGENT_TEXT_DEFAULTS.stagger}
          direction={AGENT_TEXT_DEFAULTS.direction}
          scrambleCycles={AGENT_TEXT_DEFAULTS.scrambleCycles}
          scrambleInterval={AGENT_TEXT_DEFAULTS.scrambleInterval}
          scrambleOpacity={0.2}
          onComplete={onComplete}
          as="p"
        />
      </div>
    </div>
  )
}

// ── User message (right-aligned pill) ───────────────────────────
export function UserMessage({
  message,
  canGoBack,
  onGoBack,
}: {
  message: ChatMessageType
  canGoBack?: boolean
  onGoBack?: () => void
}) {
  return (
    <div
      className="flex flex-col items-end gap-1"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      <div className="rounded-xl bg-foreground/[0.06] px-4 py-2.5 text-[15px] leading-relaxed text-foreground/80">
        {message.content}
      </div>
      {canGoBack && onGoBack && (
        <button
          onClick={onGoBack}
          className="flex items-center gap-1 text-[12px] font-medium text-blue-500/70 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6L7 2L11 6" />
            <path d="M7 2V10C7 12.2 8.8 14 11 14H13" />
          </svg>
          Go back
        </button>
      )}
    </div>
  )
}

// ── System indicator (centered, muted) ──────────────────────────
export function SystemMessage({ message }: { message: ChatMessageType }) {
  return (
    <div
      className="pl-10"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {message.content}
      </div>
    </div>
  )
}

// ── Typing indicator (scrambling braille, matches AgentText style) ───
import { useState as useStateLocal, useEffect as useEffectLocal } from "react"
import { CHARSETS } from "@/components/agent-text"

function ScrambleIndicator() {
  const [chars, setChars] = useStateLocal(() =>
    Array.from({ length: 6 }, () => CHARSETS.braille[Math.floor(Math.random() * CHARSETS.braille.length)])
  )

  useEffectLocal(() => {
    const id = setInterval(() => {
      setChars(
        Array.from({ length: 6 }, () =>
          CHARSETS.braille[Math.floor(Math.random() * CHARSETS.braille.length)]
        )
      )
    }, 40)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="text-[15px] text-foreground/20 select-none">
      {chars.join("")}
    </span>
  )
}

export function TypingIndicator({ showAvatar }: { showAvatar: boolean }) {
  return (
    <div
      className="flex gap-3 max-w-[420px]"
      style={{
        animation: `fadeInUp 300ms ${EASING.entrance} both`,
      }}
    >
      <div className="w-7 shrink-0 flex items-start pt-0.5">
        {showAvatar && <IndentAvatar />}
      </div>
      <div className="pt-0.5">
        <ScrambleIndicator />
      </div>
    </div>
  )
}
