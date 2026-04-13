"use client"

import { PreviewSidebar } from "./preview-sidebar"

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded bg-foreground/[0.05] ${className ?? ""}`}
      style={{ animation: "skeletonShimmer 2s ease-in-out infinite" }}
    />
  )
}

export function PreviewWorkspace({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="flex h-full">
      <PreviewSidebar workspaceName={workspaceName} activeNav="home" animateIn />

      {/* Main content: skeleton filling in */}
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
              <Skeleton className="h-10 w-full rounded-lg mt-1" />

              <div className="mt-2 flex flex-col gap-1.5">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-3 w-52" />
                <Skeleton className="h-3 w-44" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
