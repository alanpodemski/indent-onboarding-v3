"use client"

import { useState, useCallback } from "react"
import { EASING } from "@/hooks/use-chat-engine"

const FEATURES = [
  { text: "Tag @indent in any thread to start work instantly", highlight: "@indent" },
  { text: "Track progress in real-time without leaving Slack" },
  { text: "Grabs full context from your conversation" },
]

export function SlackConnectCard({
  onConnect,
  onSkip,
}: {
  onConnect: () => void
  onSkip: () => void
}) {
  const [connecting, setConnecting] = useState(false)
  const [done, setDone] = useState(false)

  const handleConnect = useCallback(() => {
    if (connecting || done) return
    setConnecting(true)
    setTimeout(() => {
      setDone(true)
      setTimeout(onConnect, 600)
    }, 2000)
  }, [connecting, done, onConnect])

  return (
    <div
      className="pl-10 space-y-4"
      style={{ animation: `fadeInUp 400ms ${EASING.entrance} both` }}
    >
      {/* Feature list */}
      <div className="space-y-2.5">
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5"
            style={{
              animation: `fadeInUp 300ms ${EASING.entrance} both`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-emerald-500">
              <path d="M2 9L6 13L14 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] text-foreground/60 leading-snug">
              {feature.highlight
                ? feature.text.split(feature.highlight).map((part, j) =>
                    j === 0
                      ? <span key={j}>{part}</span>
                      : <span key={j}><code className="rounded bg-foreground/[0.06] px-1 py-0.5 text-[12px] font-mono text-foreground/70">{feature.highlight}</code>{part}</span>
                  )
                : feature.text
              }
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleConnect}
          disabled={connecting || done}
          className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-[linear-gradient(to_bottom,rgb(64,64,64),rgb(38,38,38))] px-4 has-[kbd]:pr-2 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_-1px_0_0_rgba(255,255,255,0.02),0_1px_2px_0_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-[linear-gradient(to_bottom,rgb(74,74,74),rgb(48,48,48))] active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          {connecting ? (
            <>
              <div className="size-5 rounded-full border-2 border-background/30 border-t-background/80 animate-spin" />
              Connecting...
            </>
          ) : done ? (
            <>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M2 9L6 13L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Connected
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
              </svg>
              Enable Slack integration
              <kbd className="flex size-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white/70">
                <span className="text-xs font-bold leading-none">↵</span>
              </kbd>
            </>
          )}
        </button>

        {!connecting && !done && (
          <button
            onClick={onSkip}
            className="text-[13px] text-muted-foreground/40 hover:text-foreground/60 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}
