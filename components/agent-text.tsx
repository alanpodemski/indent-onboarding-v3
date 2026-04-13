"use client"

import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  type CSSProperties,
} from "react"

// ── Character Sets ──────────────────────────────────────────────
export const CHARSETS = {
  braille:
    "⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿",
  blocks: "█▓▒░▐▌▀▄▚▞▙▛▜▟◼◻◾◽■□▪▫",
  binary: "0011010011101001101010110100110101001011ABCDEF",
  ascii:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*!?+=~<>{}[]",
} as const

export type AgentCharset = keyof typeof CHARSETS | "invisible"

function randomFromSet(charset: AgentCharset): string {
  if (charset === "invisible") return "\u00A0"
  const set = CHARSETS[charset]
  return set[Math.floor(Math.random() * set.length)]
}

// ── Tokenizer ───────────────────────────────────────────────────
interface Token {
  text: string
  globalStart: number
  isSpace: boolean
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < text.length) {
    if (text[i] === " ") {
      const start = i
      while (i < text.length && text[i] === " ") i++
      tokens.push({ text: text.slice(start, i), globalStart: start, isSpace: true })
    } else {
      const start = i
      while (i < text.length && text[i] !== " ") i++
      tokens.push({ text: text.slice(start, i), globalStart: start, isSpace: false })
    }
  }
  return tokens
}

// ── Resolve-order helpers ───────────────────────────────────────
function buildResolveOrder(
  text: string,
  tokens: Token[],
  stagger: "char" | "word",
  direction: "ltr" | "rtl" | "random",
): number[] {
  let groups: number[][]

  if (stagger === "word") {
    groups = tokens.map((t) => {
      const indices: number[] = []
      for (let i = 0; i < t.text.length; i++) {
        indices.push(t.globalStart + i)
      }
      return indices
    })
  } else {
    groups = text.split("").map((_, i) => [i])
  }

  if (direction === "rtl") {
    groups.reverse()
  } else if (direction === "random") {
    for (let i = groups.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[groups[i], groups[j]] = [groups[j], groups[i]]
    }
  }

  return groups.flat()
}

// ── Tailwind keyword → CSS value maps ───────────────────────────
const LINE_HEIGHT_MAP: Record<string, string> = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
}

const LETTER_SPACING_MAP: Record<string, string> = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
}

const FONT_WEIGHT_MAP: Record<string, number> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

function resolveLineHeight(v: string | number | undefined): string | undefined {
  if (v === undefined) return undefined
  if (typeof v === "number") return String(v)
  return LINE_HEIGHT_MAP[v] ?? v
}

function resolveLetterSpacing(v: string | undefined): string | undefined {
  if (v === undefined) return undefined
  return LETTER_SPACING_MAP[v] ?? v
}

function resolveFontWeight(v: string | number | undefined): number | undefined {
  if (v === undefined) return undefined
  if (typeof v === "number") return v
  return FONT_WEIGHT_MAP[v] ?? undefined
}

// ── Component ───────────────────────────────────────────────────
type TagName =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "p" | "span" | "div" | "label"

export interface AgentTextProps {
  /** The text content to animate. */
  text: string

  // ── Typography ──────────────────────────────────────────────
  fontSize?: string
  fontWeight?: number | string
  fontFamily?: string
  lineHeight?: number | string
  letterSpacing?: string
  textAlign?: "left" | "center" | "right" | "justify"
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  color?: string
  opacity?: number

  // ── Animation ───────────────────────────────────────────────
  charset?: AgentCharset
  delay?: number
  charSpeed?: number
  scrambleCycles?: number
  scrambleInterval?: number
  stagger?: "char" | "word"
  direction?: "ltr" | "rtl" | "random"
  onComplete?: () => void

  // ── Layout ──────────────────────────────────────────────────
  as?: TagName
  className?: string
  style?: CSSProperties
  maxWidth?: string

  // ── Scramble appearance ─────────────────────────────────────
  scrambleColor?: string
  scrambleOpacity?: number
  blurAmount?: number

}

export function AgentText({
  text,

  // Typography
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight,
  letterSpacing,
  textAlign,
  textTransform,
  color,
  opacity: resolvedOpacity = 1,

  // Animation
  charset = "braille",
  delay = 0,
  charSpeed = 25,
  scrambleCycles = 4,
  scrambleInterval = 40,
  stagger = "char",
  direction = "ltr",
  onComplete,

  // Layout
  as: Tag = "span",
  className,
  style: styleProp,
  maxWidth,

  // Scramble appearance
  scrambleColor,
  scrambleOpacity = 0.35,
  blurAmount = 2,

}: AgentTextProps) {
  const isInvisible = charset === "invisible"

  // ── State ─────────────────────────────────────────────────────
  const [displayed, setDisplayed] = useState<string[]>(() =>
    text.split("").map((ch) => (ch === " " ? " " : randomFromSet(charset)))
  )
  const [resolved, setResolved] = useState<boolean[]>(() =>
    text.split("").map(() => false)
  )
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([])
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const tokens = useMemo(() => tokenize(text), [text])
  const resolveOrder = useMemo(
    () => buildResolveOrder(text, tokens, stagger, direction),
    [text, tokens, stagger, direction],
  )

  // ── Computed styles ───────────────────────────────────────────
  const computedStyle = useMemo<CSSProperties>(() => {
    const s: CSSProperties = {}
    if (fontSize) s.fontSize = fontSize
    if (fontWeight !== undefined) s.fontWeight = resolveFontWeight(fontWeight)
    if (fontFamily) s.fontFamily = fontFamily
    if (lineHeight !== undefined) s.lineHeight = resolveLineHeight(lineHeight)
    if (letterSpacing) s.letterSpacing = resolveLetterSpacing(letterSpacing)
    if (textAlign) s.textAlign = textAlign
    if (textTransform) s.textTransform = textTransform
    if (color) s.color = color
    if (maxWidth) s.maxWidth = maxWidth
    return { ...s, ...styleProp }
  }, [
    fontSize, fontWeight, fontFamily, lineHeight, letterSpacing,
    textAlign, textTransform, color, maxWidth, styleProp,
  ])

  // ── Start after delay ─────────────────────────────────────────
  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  // ── Scramble tick (skip for invisible) ────────────────────────
  useEffect(() => {
    if (!started || isInvisible) return

    const id = setInterval(() => {
      setDisplayed((prev) =>
        prev.map((ch, i) => {
          if (resolved[i] || text[i] === " ") return text[i]
          return randomFromSet(charset)
        })
      )
    }, scrambleInterval)
    intervalsRef.current.push(id)

    return () => clearInterval(id)
  }, [started, resolved, text, scrambleInterval, charset, isInvisible])

  // ── Resolve sweep ─────────────────────────────────────────────
  const markResolved = useCallback((indices: number[]) => {
    setResolved((prev) => {
      const next = [...prev]
      for (const idx of indices) next[idx] = true
      return next
    })
    setDisplayed((prev) => {
      const next = [...prev]
      for (const idx of indices) next[idx] = text[idx]
      return next
    })
  }, [text])

  useEffect(() => {
    if (!started) return

    let step = 0
    const visited = new Set<number>()

    const scheduleNext = () => {
      if (step >= resolveOrder.length) return

      const idx = resolveOrder[step]
      if (visited.has(idx)) {
        step++
        scheduleNext()
        return
      }

      let groupIndices: number[]
      if (stagger === "word") {
        const token = tokens.find(
          (t) => idx >= t.globalStart && idx < t.globalStart + t.text.length,
        )
        groupIndices = token
          ? Array.from({ length: token.text.length }, (_, i) => token.globalStart + i)
          : [idx]
      } else {
        groupIndices = [idx]
      }

      for (const gi of groupIndices) visited.add(gi)

      const nonSpaceIndices = groupIndices.filter((i) => text[i] !== " ")
      const spaceIndices = groupIndices.filter((i) => text[i] === " ")

      if (spaceIndices.length > 0) {
        markResolved(spaceIndices)
      }

      if (nonSpaceIndices.length > 0) {
        const resolveTime = isInvisible ? 0 : scrambleCycles * scrambleInterval
        const t = setTimeout(() => markResolved(nonSpaceIndices), resolveTime)
        timeoutsRef.current.push(t)
      }

      step += groupIndices.length
      const t = setTimeout(scheduleNext, charSpeed)
      timeoutsRef.current.push(t)
    }

    scheduleNext()

    const totalTime =
      resolveOrder.length * charSpeed + scrambleCycles * scrambleInterval + 150
    const cleanup = setTimeout(() => {
      intervalsRef.current.forEach(clearInterval)
      intervalsRef.current = []
      setDisplayed(text.split(""))
      setResolved(text.split("").map(() => true))
      setDone(true)
      onCompleteRef.current?.()
    }, totalTime)
    timeoutsRef.current.push(cleanup)

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [
    started, text, tokens, resolveOrder, charSpeed, scrambleCycles,
    scrambleInterval, stagger, isInvisible, markResolved,
  ])

  // ── Per-character style ───────────────────────────────────────
  const charStyle = useCallback(
    (isResolved: boolean): CSSProperties => {
      if (isResolved) {
        return { opacity: resolvedOpacity }
      }
      if (isInvisible) {
        return {
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
        }
      }
      return {
        opacity: scrambleOpacity,
        ...(scrambleColor ? { color: scrambleColor } : {}),
      }
    },
    [isInvisible, resolvedOpacity, scrambleOpacity, scrambleColor, blurAmount],
  )

  // ── Render ────────────────────────────────────────────────────
  return (
    <Tag className={className} style={computedStyle}>
      {tokens.map((token, ti) =>
        token.isSpace ? (
          <span key={ti}>{" ".repeat(token.text.length)}</span>
        ) : (
          <span key={ti} style={{ whiteSpace: "nowrap" }}>
            {token.text.split("").map((_, ci) => {
              const globalIndex = token.globalStart + ci
              const ch = displayed[globalIndex]
              const isResolved = resolved[globalIndex]

              return (
                <span
                  key={ci}
                  style={{
                    ...charStyle(isResolved),
                    transition: isInvisible
                      ? "opacity 300ms ease, filter 300ms ease"
                      : "opacity 200ms ease",
                    willChange: done ? "auto" : "opacity",
                  }}
                >
                  {isInvisible && !isResolved ? text[globalIndex] : ch}
                </span>
              )
            })}
          </span>
        ),
      )}
    </Tag>
  )
}
