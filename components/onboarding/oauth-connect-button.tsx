"use client"

import { useState, useCallback } from "react"
import { EASING } from "@/hooks/use-chat-engine"

type OAuthState = "idle" | "loading" | "success"

const PROVIDERS = {
  github: {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  slack: {
    name: "Slack",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
  },
} as const

export function OAuthConnectButton({
  provider,
  onSuccess,
}: {
  provider: "github" | "slack"
  onSuccess: () => void
}) {
  const [oauthState, setOAuthState] = useState<OAuthState>("idle")
  const config = PROVIDERS[provider]

  const handleConnect = useCallback(() => {
    if (oauthState !== "idle") return
    setOAuthState("loading")

    // Simulate OAuth flow with realistic delay
    // In production, this would open a real OAuth popup
    setTimeout(() => {
      setOAuthState("success")
      setTimeout(onSuccess, 600)
    }, 2000)
  }, [oauthState, onSuccess])

  return (
    <div
      className="pl-10"
      style={{
        animation: `fadeInUp 400ms ${EASING.entrance} both`,
      }}
    >
      <button
        onClick={handleConnect}
        disabled={oauthState !== "idle"}
        className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-border bg-background px-5 text-[14px] font-medium text-foreground transition-all duration-300 hover:bg-foreground/[0.04] hover:border-foreground/20 active:scale-[0.98] disabled:pointer-events-none"
        style={{
          ...(oauthState === "success"
            ? { borderColor: "oklch(0.50 0.17 155)", backgroundColor: "oklch(0.50 0.17 155 / 0.08)", color: "oklch(0.45 0.15 155)" }
            : {}),
        }}
      >
        {oauthState === "loading" ? (
          <>
            <div className="size-5 rounded-full border-2 border-foreground/20 border-t-foreground/60 animate-spin" />
            Connecting...
          </>
        ) : oauthState === "success" ? (
          <>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M2 9L6 13L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {config.name} connected
          </>
        ) : (
          <>
            {config.icon}
            Connect {config.name}
          </>
        )}
      </button>
    </div>
  )
}
