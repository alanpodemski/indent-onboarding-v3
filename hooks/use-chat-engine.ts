"use client"

import { useState, useCallback, useRef } from "react"

// ── Types ───────────────────────────────────────────────────────
export type MessageType = "agent" | "user" | "system"
export type InteractionType =
  | "choice" | "input" | "oauth-github" | "github-install"
  | "repo-confirm" | "slack-connect" | "launch" | "go-to-app"
export type PreviewState = 0 | 1 | 2 | 3 | 4
export type Phase = "orientation" | "configuration" | "launch"

export interface ChatMessage {
  id: number
  type: MessageType
  content: string
  animating?: boolean
}

export interface PendingInteraction {
  type: InteractionType
  config?: Record<string, unknown>
}

export interface ChatEngineState {
  messages: ChatMessage[]
  phase: Phase
  step: number
  previewState: PreviewState
  isTyping: boolean
  pendingInteraction: PendingInteraction | null
  workspaceName: string
  autojoin: boolean
  githubUser: string
  connections: { github: boolean; githubApp: boolean; slack: boolean }
  confirmedRepoCount: number
}

// ── Animation constants ─────────────────────────────────────────
export const TIMING = {
  messageGap: 150,
  interactionDelay: 100,
  stagger: 50,
  previewTransition: 500,
  stepPause: 120,
  typingDuration: 200,
} as const

export const EASING = {
  entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const

export const AGENT_TEXT_DEFAULTS = {
  charset: "braille" as const,
  charSpeed: 12,
  stagger: "word" as const,
  direction: "ltr" as const,
  scrambleCycles: 2,
  scrambleInterval: 30,
}

// ── Step definitions ────────────────────────────────────────────
interface StepDef {
  agentMessages: string[] | ((state: ChatEngineState) => string[])
  interaction?: PendingInteraction | ((state: ChatEngineState) => PendingInteraction)
  onComplete?: (state: ChatEngineState, userValue?: string) => Partial<ChatEngineState>
}

const STEPS: StepDef[] = [
  // ── Phase 1: Orientation ──────────────────────────────────────

  // Step 0: Greeting
  {
    agentMessages: [
      "Hey there.",
      "I'm Indent.",
    ],
  },

  // Step 1: The question
  {
    agentMessages: [
      "Right now, when someone on your team needs access to a production database, a staging environment, or a GitHub repo — what happens?",
    ],
    interaction: { type: "choice", config: {
      options: [
        "They Slack me and I handle it",
        "They open a ticket and wait",
        "It's chaos, honestly",
      ],
    }},
  },

  // Step 2: Empathize + explain problem
  {
    agentMessages: (state) => {
      const lastUserMsg = [...state.messages].reverse().find(m => m.type === "user")
      const choice = lastUserMsg?.content ?? ""

      let opener: string
      if (choice.includes("Slack")) {
        opener = "So you're the bottleneck — and your team waits on you every time."
      } else if (choice.includes("ticket")) {
        opener = "Tickets work, but they're slow. And nobody likes waiting for access while a deploy is on fire."
      } else {
        opener = "You're not alone — that's how most teams end up."
      }

      return [
        opener,
        "The problem is it creates bottlenecks — engineers wait, approvers context-switch, and nobody has an audit trail.",
      ]
    },
  },

  // Step 3: The pitch
  {
    agentMessages: [
      "Indent replaces all of that. Request, approve, access — done. Fully automated. Fully auditable.",
      "And it fits right into the tools your team already uses.",
    ],
  },

  // Step 4: Transition to setup
  {
    agentMessages: [
      "Let me show you what that looks like. We'll connect a couple of things and you'll see it come together.",
    ],
  },

  // ── Phase 2: Configuration ────────────────────────────────────

  // Step 5: Workspace name
  {
    agentMessages: [
      "What do you call your team or company?",
    ],
    interaction: { type: "input", config: { placeholder: "e.g. Acme Corp" } },
    onComplete: (_state, userValue) => ({
      workspaceName: userValue ?? "My Team",
      phase: "configuration" as Phase,
      previewState: 1 as PreviewState,
    }),
  },

  // Step 6: Autojoin question
  {
    agentMessages: (state) => [
      `Got it — ${state.workspaceName}. Should people who share your email domain be able to join automatically?`,
    ],
    interaction: { type: "choice", config: {
      options: [
        "Yes, allow auto-join",
        "No, invite only",
      ],
    }},
    onComplete: (_state, userValue) => ({
      autojoin: userValue?.includes("Yes") ?? false,
    }),
  },

  // Step 7: Connect GitHub account
  {
    agentMessages: [
      "Now let's bring in your code. First, connect your GitHub account.",
    ],
    interaction: { type: "oauth-github" },
    onComplete: (state) => ({
      connections: { ...state.connections, github: true },
      githubUser: "Alan Podemski",
    }),
  },

  // Step 8: Install GitHub App
  {
    agentMessages: () => [
      "Now install the Indent GitHub App so we can access your repositories.",
    ],
    interaction: { type: "github-install" },
    onComplete: (state) => ({
      connections: { ...state.connections, githubApp: true },
    }),
  },

  // Step 9: Confirm repos
  {
    agentMessages: () => [
      "Here are the repositories I found. Confirm these are the ones you want to connect.",
    ],
    interaction: { type: "repo-confirm" },
    onComplete: (_state, userValue) => ({
      previewState: 2 as PreviewState,
      confirmedRepoCount: parseInt(userValue ?? "12", 10),
    }),
  },

  // Step 10: Connect Slack
  {
    agentMessages: () => [
      "Last thing — let's connect Slack so your team can work without leaving their flow.",
    ],
    interaction: { type: "slack-connect" },
    onComplete: (state, userValue) => ({
      connections: { ...state.connections, slack: userValue !== "skipped" },
      previewState: 3 as PreviewState,
    }),
  },

  // Step 11: Launch
  {
    agentMessages: (state) => {
      const slackConnected = state.connections.slack
      const msgs = []
      if (slackConnected) {
        msgs.push("Now requests show up right in Slack — no new tools for your team to learn.")
      }
      msgs.push(
        "Here's what we just built: your team can request access to any connected resource. Requests route to the right approver. Access is granted instantly and revoked automatically.",
        "You're all set. Ready to go?",
      )
      return msgs
    },
    interaction: { type: "launch" },
    onComplete: () => ({
      previewState: 4 as PreviewState,
    }),
  },

  // Step 12: Go to app
  {
    agentMessages: [
      "Your workspace is live. Jump in whenever you're ready.",
    ],
    interaction: { type: "go-to-app" },
    onComplete: () => ({
      phase: "launch" as Phase,
    }),
  },
]

// ── Hook ────────────────────────────────────────────────────────
export function useChatEngine() {
  const idRef = useRef(0)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const playedStepsRef = useRef(new Set<number>())
  const stateRef = useRef<ChatEngineState>(null!)

  const [state, setState] = useState<ChatEngineState>(() => {
    const initial: ChatEngineState = {
      messages: [],
      phase: "orientation",
      step: 0,
      previewState: 0,
      isTyping: false,
      pendingInteraction: null,
      workspaceName: "",
      autojoin: false,
      githubUser: "",
      connections: { github: false, githubApp: false, slack: false },
      confirmedRepoCount: 0,
    }
    stateRef.current = initial
    return initial
  })

  const updateState = useCallback((updater: (prev: ChatEngineState) => ChatEngineState) => {
    setState(prev => {
      const next = updater(prev)
      stateRef.current = next
      return next
    })
  }, [])

  const startedRef = useRef(false)
  const nextId = useCallback(() => ++idRef.current, [])

  const addMessage = useCallback((type: MessageType, content: string, animating = false) => {
    const id = nextId()
    updateState(prev => ({
      ...prev,
      messages: [...prev.messages, { id, type, content, animating }],
    }))
    return id
  }, [nextId, updateState])

  const playStep = useCallback((stepIndex: number, currentState: ChatEngineState) => {
    if (playedStepsRef.current.has(stepIndex)) return
    playedStepsRef.current.add(stepIndex)

    const stepDef = STEPS[stepIndex]
    if (!stepDef) return

    const msgs = typeof stepDef.agentMessages === "function"
      ? stepDef.agentMessages(currentState)
      : stepDef.agentMessages

    let delay = TIMING.stepPause

    updateState(prev => ({ ...prev, isTyping: true }))

    msgs.forEach((content, i) => {
      const t = setTimeout(() => {
        updateState(prev => ({ ...prev, isTyping: false }))
        addMessage("agent", content, true)

        if (i < msgs.length - 1) {
          const typingT = setTimeout(() => {
            updateState(prev => ({ ...prev, isTyping: true }))
          }, TIMING.typingDuration)
          timeoutsRef.current.push(typingT)
        }
      }, delay)
      timeoutsRef.current.push(t)

      const wordCount = content.split(" ").length
      const animDuration = wordCount * AGENT_TEXT_DEFAULTS.charSpeed * 4 +
        AGENT_TEXT_DEFAULTS.scrambleCycles * AGENT_TEXT_DEFAULTS.scrambleInterval
      delay += animDuration + TIMING.messageGap + TIMING.typingDuration
    })

    const afterT = setTimeout(() => {
      updateState(prev => ({ ...prev, isTyping: false }))

      const interaction = stepDef.interaction
      if (interaction) {
        const resolved = typeof interaction === "function"
          ? interaction(stateRef.current)
          : interaction
        updateState(prev => ({
          ...prev,
          pendingInteraction: resolved,
        }))
      } else {
        const advanceT = setTimeout(() => {
          const nextStep = stepIndex + 1
          if (nextStep < STEPS.length) {
            const current = stateRef.current
            const updates = stepDef.onComplete?.(current) ?? {}
            const updated = { ...current, step: nextStep, ...updates }
            stateRef.current = updated
            updateState(() => updated)
            playStep(nextStep, updated)
          }
        }, TIMING.messageGap)
        timeoutsRef.current.push(advanceT)
      }
    }, delay + TIMING.interactionDelay)
    timeoutsRef.current.push(afterT)
  }, [addMessage, updateState])

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    playStep(0, stateRef.current)
  }, [playStep])

  const handleAgentMessageComplete = useCallback((messageId: number) => {
    updateState(prev => ({
      ...prev,
      messages: prev.messages.map(m =>
        m.id === messageId ? { ...m, animating: false } : m
      ),
    }))
  }, [updateState])

  const advanceStep = useCallback((userValue?: string) => {
    const current = stateRef.current
    const stepDef = STEPS[current.step]
    const nextStep = current.step + 1
    const updates = stepDef?.onComplete?.(current, userValue) ?? {}
    const updated = {
      ...current,
      step: nextStep,
      pendingInteraction: null,
      ...updates,
    }
    stateRef.current = updated
    updateState(() => updated)
    setTimeout(() => playStep(nextStep, updated), TIMING.stepPause)
  }, [updateState, playStep])

  const handleUserChoice = useCallback((value: string) => {
    addMessage("user", value)
    advanceStep(value)
  }, [addMessage, advanceStep])

  const handleWorkspaceName = useCallback((name: string) => {
    addMessage("user", name)
    advanceStep(name)
  }, [addMessage, advanceStep])

  const handleOAuthSuccess = useCallback((provider: "github" | "slack") => {
    addMessage("system", `${provider === "github" ? "GitHub" : "Slack"} connected`)
    advanceStep()
  }, [addMessage, advanceStep])

  const handleGitHubInstall = useCallback(() => {
    addMessage("system", "GitHub App installed")
    advanceStep()
  }, [addMessage, advanceStep])

  const handleRepoConfirm = useCallback((count: number) => {
    addMessage("user", `Confirmed ${count} repositories`)
    advanceStep(String(count))
  }, [addMessage, advanceStep])

  const handleSlackConnect = useCallback(() => {
    addMessage("system", "Slack connected")
    advanceStep("connected")
  }, [addMessage, advanceStep])

  const handleSlackSkip = useCallback(() => {
    addMessage("user", "Skip for now")
    advanceStep("skipped")
  }, [addMessage, advanceStep])

  const handleLaunch = useCallback(() => {
    addMessage("system", "Workspace ready")
    advanceStep()
  }, [addMessage, advanceStep])

  return {
    ...state,
    start,
    handleAgentMessageComplete,
    handleUserChoice,
    handleWorkspaceName,
    handleOAuthSuccess,
    handleGitHubInstall,
    handleRepoConfirm,
    handleSlackConnect,
    handleSlackSkip,
    handleLaunch,
  }
}
