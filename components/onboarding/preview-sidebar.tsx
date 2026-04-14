"use client"

import { EASING } from "@/hooks/use-chat-engine"

type NavItem = "home" | "code" | "data" | "review"

const NAV_ITEMS: { id: NavItem; label: string; color: string }[] = [
  { id: "home", label: "Home", color: "text-foreground/40" },
  { id: "code", label: "Code", color: "text-foreground/40" },
  { id: "data", label: "Data", color: "text-foreground/40" },
  { id: "review", label: "Code Review", color: "text-foreground/40" },
]

interface SessionItem {
  label: string
  icon?: "pr" | "alert" | "incident" | "dot"
  iconColor?: string
}

const TODAY_SESSIONS: SessionItem[] = [
  { label: "Fix Webhook N+1", icon: "pr", iconColor: "text-blue-500" },
  { label: "#312 Increased 500 Error...", icon: "dot", iconColor: "text-amber-500" },
]

const WEEK_SESSIONS: SessionItem[] = [
  { label: "Database Connection Errors in...", icon: "pr", iconColor: "text-blue-500" },
  { label: "Sudden Drop in API Response...", icon: "dot", iconColor: "text-amber-500" },
  { label: "Increased Disk I/O on Cache...", icon: "pr", iconColor: "text-blue-500" },
  { label: "Network Congestion Affecting...", icon: "dot", iconColor: "text-amber-500" },
  { label: "Task #480 Security Vulnerability...", icon: "dot", iconColor: "text-foreground/30" },
]

export function PreviewSidebar({
  workspaceName,
  activeNav = "home",
  showSessions = true,
  animateIn = false,
}: {
  workspaceName: string
  activeNav?: NavItem
  showSessions?: boolean
  animateIn?: boolean
}) {
  return (
    <div className="flex h-full w-[220px] shrink-0 flex-col border-r border-border/30 bg-foreground/[0.015]">
      {/* Org header */}
      <div
        className="flex items-center gap-2 px-4 pt-3.5 pb-2"
        style={animateIn ? {
          animation: `orgPop 500ms ${EASING.entrance} both`,
        } : undefined}
      >
        <div className="flex size-6 items-center justify-center rounded-lg bg-foreground/[0.08]">
          <svg viewBox="0 0 200 200" fill="currentColor" className="size-3.5 text-foreground/40">
            <path d="M50.0061 100C22.6954 100.431 0.787688 122.683 0.787688 150.006C0.787688 177.317 22.6954 199.569 50.0061 200H100V149.994C100.431 177.305 122.683 199.212 150.006 199.212C177.317 199.212 199.569 177.305 200 149.994V100H149.994C177.305 99.5693 199.212 77.3168 199.212 50.0061C199.212 22.6831 177.305 0.430768 149.994 0H100V50.0061C99.5693 22.6954 77.3168 0.787695 50.0061 0.787695C22.6831 0.787695 0.430768 22.6954 0 50.0061V100H50.0061ZM50.0061 100C77.6246 99.9878 100 77.6246 100 50.0061C100 77.6246 122.375 99.9878 149.994 100C122.375 100.012 100 122.375 100 149.994C100 122.375 77.6246 100 50.0061 100Z" />
          </svg>
        </div>
        <span className="text-[12px] font-semibold text-foreground/70 truncate">
          {workspaceName || "Indent Org"}
        </span>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 text-foreground/30">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* New session button */}
      <div className="px-3 pb-2">
        <button className="flex w-full items-center justify-between rounded-lg border border-border/40 px-3 py-1.5 text-[11px] text-foreground/50 hover:bg-foreground/[0.03] transition-colors">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-foreground/40">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New session
          </div>
          <span className="text-[10px] text-muted-foreground/50 font-mono">&#8984;O</span>
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5 px-2">
        {NAV_ITEMS.map((item, i) => (
          <div
            key={item.id}
            style={animateIn ? {
              animation: `sidebarItemIn 400ms ${EASING.entrance} both`,
              animationDelay: `${i * 40}ms`,
            } : undefined}
          >
            <NavItemRow
              label={item.label}
              color={item.color}
              active={activeNav === item.id}
            />
          </div>
        ))}
      </nav>

      {/* Session lists */}
      {showSessions && (
        <div className="mt-3 flex-1 overflow-y-auto scrollbar-none">
          {/* Today */}
          <div className="px-3 mb-1">
            <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">Today</span>
          </div>
          <div className="flex flex-col gap-px px-2 mb-3">
            {TODAY_SESSIONS.map((s, i) => (
              <SessionRow key={i} session={s} active={i === 0} animateIn={animateIn} delay={200 + i * 40} />
            ))}
          </div>

          {/* This Week */}
          <div className="px-3 mb-1">
            <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">This Week</span>
          </div>
          <div className="flex flex-col gap-px px-2">
            {WEEK_SESSIONS.map((s, i) => (
              <SessionRow key={i} session={s} animateIn={animateIn} delay={320 + i * 40} />
            ))}
          </div>

          {/* More */}
          <div className="px-3 mt-1.5 mb-3">
            <button className="flex items-center gap-1 text-[10px] text-muted-foreground/50 hover:text-foreground/50 transition-colors">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              More
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function NavItemRow({ label, color, active }: { label: string; color: string; active: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] transition-colors ${
        active
          ? "bg-foreground/[0.06] font-medium text-foreground/80"
          : "text-foreground/50 hover:bg-foreground/[0.03]"
      }`}
    >
      <span className={`${color}`}>
        <NavIcon name={label} />
      </span>
      {label}
    </div>
  )
}

function NavIcon({ name }: { name: string }) {
  const cls = "size-4"
  switch (name) {
    case "Home":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M2.5 6.5L8 2L13.5 6.5V13.5H10V10H6V13.5H2.5V6.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      )
    case "Code":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M5 4L1.5 8L5 12M11 4L14.5 8L11 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "Data":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <ellipse cx="8" cy="4" rx="5.5" ry="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M2.5 4V12C2.5 13.1 4.96 14 8 14C11.04 14 13.5 13.1 13.5 12V4" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M2.5 8C2.5 9.1 4.96 10 8 10C11.04 10 13.5 9.1 13.5 8" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      )
    case "Code Review":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M2 4.5H14M2 8H10M2 11.5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="13" cy="11" r="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M12 11L12.7 11.7L14.2 10.3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    default:
      return <div className="size-4 rounded bg-foreground/[0.06]" />
  }
}

function SessionIcon({ icon, iconColor }: { icon?: string; iconColor?: string }) {
  const cls = `size-3.5 shrink-0 ${iconColor || "text-foreground/30"}`
  switch (icon) {
    case "pr":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="11" cy="12" r="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M5 6V12M11 10V6C11 6 11 4 9 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      )
    case "alert":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M8 6.5V9.5M8 11V11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      )
    case "incident":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={cls}>
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 5V8.5L10.5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case "dot":
      return (
        <div className="flex size-3.5 items-center justify-center">
          <div className={`size-1.5 rounded-full ${iconColor?.includes("amber") ? "bg-amber-500" : "bg-foreground/20"}`} />
        </div>
      )
    default:
      return <div className="size-3.5 rounded bg-foreground/[0.06]" />
  }
}

function SessionRow({
  session,
  active = false,
  animateIn = false,
  delay = 0,
}: {
  session: SessionItem
  active?: boolean
  animateIn?: boolean
  delay?: number
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors ${
        active
          ? "bg-foreground/[0.06] text-foreground/70"
          : "text-foreground/40 hover:bg-foreground/[0.03]"
      }`}
      style={animateIn ? {
        animation: `sidebarItemIn 400ms ${EASING.entrance} both`,
        animationDelay: `${delay}ms`,
      } : undefined}
    >
      <SessionIcon icon={session.icon} iconColor={session.iconColor} />
      <span className="text-[11px] truncate">{session.label}</span>
    </div>
  )
}
