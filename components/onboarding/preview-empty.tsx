"use client"

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded bg-foreground/[0.05] ${className ?? ""}`}
      style={{ animation: "skeletonShimmer 2s ease-in-out infinite" }}
    />
  )
}

function SkeletonNavRow({ width }: { width: string }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5">
      <Skeleton className="size-4 rounded" />
      <Skeleton className={`h-2.5 ${width}`} />
    </div>
  )
}

function SkeletonSessionRow({ width }: { width: string }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5">
      <Skeleton className="size-3.5 rounded" />
      <Skeleton className={`h-2 ${width}`} />
    </div>
  )
}

function SkeletonSidebar() {
  return (
    <div className="flex h-full w-[220px] shrink-0 flex-col border-r border-border/30 bg-foreground/[0.015] pt-3.5">
      {/* Org header skeleton */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <Skeleton className="size-6 rounded-lg" />
        <Skeleton className="h-2.5 w-16" />
      </div>

      {/* New session button skeleton */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-foreground/[0.04] px-3 py-1.5">
          <Skeleton className="size-3 rounded" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>

      {/* Nav items skeleton */}
      <div className="flex flex-col px-2 mt-0.5">
        <SkeletonNavRow width="w-12" />
        <SkeletonNavRow width="w-10" />
        <SkeletonNavRow width="w-9" />
        <SkeletonNavRow width="w-14" />
        <SkeletonNavRow width="w-12" />
      </div>

      {/* Today section skeleton */}
      <div className="mt-4 px-4">
        <Skeleton className="h-2 w-8 mb-2.5" />
      </div>
      <div className="flex flex-col px-2">
        <SkeletonSessionRow width="w-28" />
        <SkeletonSessionRow width="w-32" />
      </div>

      {/* This Week section skeleton */}
      <div className="mt-3 px-4">
        <Skeleton className="h-2 w-14 mb-2.5" />
      </div>
      <div className="flex flex-col px-2">
        <SkeletonSessionRow width="w-36" />
        <SkeletonSessionRow width="w-28" />
        <SkeletonSessionRow width="w-32" />
        <SkeletonSessionRow width="w-24" />
        <SkeletonSessionRow width="w-28" />
      </div>
    </div>
  )
}

export function PreviewEmpty() {
  return (
    <div className="flex h-full">
      <SkeletonSidebar />

      {/* Main content skeleton */}
      <div className="flex-1 overflow-hidden">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 border-b border-border/20 px-5 py-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="flex flex-col gap-5 p-5">
          {/* User message skeleton */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-1.5 items-end">
              <Skeleton className="h-3 w-64" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          {/* Agent message skeleton */}
          <div className="flex gap-2.5">
            <Skeleton className="size-7 shrink-0 rounded-lg" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-2 w-40" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />

              {/* Tool call skeleton */}
              <Skeleton className="h-10 w-full rounded-lg mt-1" />

              {/* File list skeleton */}
              <div className="mt-2 flex flex-col gap-1.5">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-3 w-52" />
                <Skeleton className="h-3 w-44" />
                <Skeleton className="h-3 w-48" />
              </div>

              <Skeleton className="h-2 w-36 mt-1" />
            </div>
          </div>

          {/* Second message skeleton */}
          <div className="flex gap-2.5">
            <div className="size-7 shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />

              {/* Diff block skeleton */}
              <div className="mt-1 rounded-lg border border-border/20 p-3 flex flex-col gap-1.5">
                <Skeleton className="h-2.5 w-32" />
                <Skeleton className="h-2.5 w-full" />
                <Skeleton className="h-2.5 w-3/4" />
                <Skeleton className="h-2.5 w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
