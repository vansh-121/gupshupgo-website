import { cn } from "@/lib/utils";

/**
 * Route/section loading fallback (design §5, Requirement 14.2).
 *
 * Retokenised to the shared palette: placeholder blocks are drawn with
 * `bg-hairline-divider` on `bg-surface`, cards use `border-hairline`, and all
 * spacing comes from the `section` / `gutter` scale.
 *
 * The skeleton is purely decorative and is rendered inside the shell's existing
 * `main` landmark, so it uses plain `div`s (no `nav` / `main` / `footer`) and is
 * hidden from assistive technology (Requirement 12.9 — one landmark set only).
 */

const BLOCK = "bg-hairline-divider";

function Block({ className }: { className?: string }) {
  return <div className={cn("rounded-md", BLOCK, className)} />;
}

const CARD = "rounded-xl border border-hairline bg-surface";

function HeaderSkeleton() {
  return (
    <div className="border-b border-hairline bg-surface py-3">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-gutter">
        <div className="flex items-center gap-2.5">
          <Block className="h-9 w-9 rounded-lg" />
          <Block className="h-5 w-28" />
        </div>
        <div className="hidden items-center gap-6 md:flex">
          {[1, 2, 3, 4].map((i) => (
            <Block key={i} className="h-4 w-16" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Block className="h-11 w-11 rounded-pill" />
          <Block className="hidden h-11 w-32 rounded-pill md:block" />
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="px-gutter py-section-lg">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-12 lg:flex-row">
        <div className="w-full flex-1 text-center lg:text-left">
          <Block className="mx-auto mb-6 h-7 w-40 rounded-pill lg:mx-0" />
          <div className="mb-6 space-y-3">
            <Block className="mx-auto h-12 w-[80%] lg:mx-0" />
            <Block className="mx-auto h-12 w-[60%] lg:mx-0" />
          </div>
          <div className="mx-auto mb-10 max-w-lg space-y-2 lg:mx-0">
            <Block className="h-5 w-full" />
            <Block className="h-5 w-[85%]" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Block className="h-11 w-36 rounded-pill" />
            <Block className="h-11 w-32 rounded-pill" />
          </div>
        </div>
        <div className="shrink-0">
          <Block className="h-[440px] w-[220px] rounded-[40px] sm:h-[520px] sm:w-[260px]" />
        </div>
      </div>
    </div>
  );
}

function SectionHeadingSkeleton() {
  return (
    <div className="mb-12 text-center">
      <Block className="mx-auto mb-4 h-7 w-24 rounded-pill" />
      <Block className="mx-auto mb-4 h-10 w-[50%]" />
      <Block className="mx-auto h-5 w-72" />
    </div>
  );
}

function CardGridSkeleton() {
  return (
    <div className="bg-surface-alt px-gutter py-section">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeadingSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className={cn(CARD, "p-6")}>
              <Block className="mb-5 h-10 w-10 rounded-xl" />
              <Block className="mb-2 h-4 w-28" />
              <Block className="h-3 w-full" />
              <Block className="mt-1 h-3 w-[80%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SplitSectionSkeleton() {
  return (
    <div className="px-gutter py-section">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="shrink-0">
          <Block className="h-[360px] w-[180px] rounded-[28px]" />
        </div>
        <div className="w-full flex-1">
          <Block className="mb-4 h-7 w-36 rounded-pill" />
          <Block className="mb-3 h-10 w-[60%]" />
          <Block className="mb-10 h-5 w-[80%]" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Block className="h-9 w-9 rounded-xl" />
                <Block className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="bg-surface-alt px-gutter py-section">
      <div className={cn(CARD, "mx-auto w-full max-w-2xl p-8 text-center sm:p-12")}>
        <Block className="mx-auto mb-3 h-10 w-[70%]" />
        <Block className="mx-auto mb-8 h-5 w-[60%]" />
        <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <Block className="h-12 flex-1 rounded-xl" />
          <Block className="h-12 w-32 rounded-pill" />
        </div>
      </div>
    </div>
  );
}

function FooterSkeleton() {
  return (
    <div className="border-t border-hairline bg-surface-alt px-gutter py-section">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-3">
          {[1, 2, 3].map((column) => (
            <div key={column} className="flex flex-col gap-3">
              <Block className="h-5 w-28" />
              <Block className="h-3 w-40" />
              <Block className="h-3 w-32" />
              <Block className="h-3 w-36" />
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-hairline-divider pt-6">
          <Block className="h-3 w-48" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-testid="loading-skeleton"
      className="min-h-screen animate-pulse bg-surface text-ink-high motion-reduce:animate-none"
    >
      <HeaderSkeleton />
      <HeroSkeleton />
      <CardGridSkeleton />
      <SplitSectionSkeleton />
      <PanelSkeleton />
      <FooterSkeleton />
    </div>
  );
}
