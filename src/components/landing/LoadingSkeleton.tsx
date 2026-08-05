import { cn } from "@/lib/utils";

/**
 * Route/section loading fallback (design §5, Requirement 17.2).
 *
 * Retokenised onto the Nova layer: placeholder blocks are drawn with
 * `bg-hairline-divider` on the surface bands, cards carry the hairline as an
 * inset shadow rather than a `border` (Req 4.3), every radius is `rounded-8`
 * (Req 7.9) and all spacing comes from the Gap_Scale (Req 7.7).
 *
 * The skeleton mirrors the real page's band alternation so the swap to loaded
 * content does not flash a different background.
 *
 * It is purely decorative and is rendered inside the shell's existing `main`
 * landmark, so it uses plain `div`s (no `nav` / `main` / `footer`) and is hidden
 * from assistive technology — one landmark set only.
 */

const BLOCK = "bg-hairline-divider";

function Block({ className }: { className?: string }) {
  return <div className={cn("rounded-8", BLOCK, className)} />;
}

const CARD = "rounded-8 bg-layer-0 shadow-hairline-12";

const SHELL = "px-20px bp810:px-36px";
const RHYTHM = "py-64px bp810:py-128px";

function HeaderSkeleton() {
  return (
    <div className={cn("bg-layer-0 py-12px shadow-hairline-12", SHELL)}>
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-16px">
        <div className="flex items-center gap-10px">
          <Block className="h-9 w-9 rounded-8" />
          <Block className="h-5 w-28" />
        </div>
        <div className="hidden items-center gap-24px bp810:flex">
          {[1, 2, 3, 4].map((i) => (
            <Block key={i} className="h-4 w-16" />
          ))}
        </div>
        <div className="flex items-center gap-12px">
          <Block className="h-11 w-11 rounded-pill" />
          <Block className="hidden h-11 w-32 rounded-pill bp810:block" />
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className={cn("bg-layer-0 py-72px bp810:py-164px", SHELL)}>
      <div className="mx-auto flex w-full max-w-[1199px] flex-col items-center gap-48px">
        <Block className="h-7 w-40 rounded-pill" />
        <div className="flex w-full max-w-[872px] flex-col items-center gap-12px">
          <Block className="h-12 w-[80%]" />
          <Block className="h-12 w-[60%]" />
        </div>
        <div className="flex w-full max-w-[644px] flex-col items-center gap-8px">
          <Block className="h-5 w-full" />
          <Block className="h-5 w-[85%]" />
        </div>
        <div className="flex flex-wrap justify-center gap-12px">
          <Block className="h-14 w-36 rounded-pill" />
          <Block className="h-14 w-32 rounded-pill" />
        </div>
        <Block className="h-[440px] w-full max-w-[320px] rounded-8" />
      </div>
    </div>
  );
}

function SectionHeadingSkeleton() {
  return (
    <div className="mb-48px flex flex-col items-center gap-16px">
      <Block className="h-7 w-24 rounded-pill" />
      <Block className="h-10 w-[50%]" />
      <Block className="h-5 w-72" />
    </div>
  );
}

function CardGridSkeleton() {
  return (
    <div className={cn("bg-layer-1", SHELL, RHYTHM)}>
      <div className="mx-auto w-full max-w-[1199px]">
        <SectionHeadingSkeleton />
        <div className="grid grid-cols-1 gap-16px bp810:grid-cols-2 bp1200:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className={cn(CARD, "p-24px")}>
              <Block className="mb-20px h-10 w-10 rounded-8" />
              <Block className="mb-8px h-4 w-28" />
              <Block className="h-3 w-full" />
              <Block className="mt-4px h-3 w-[80%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SplitSectionSkeleton() {
  return (
    <div className={cn("bg-layer-0", SHELL, RHYTHM)}>
      <div className="mx-auto flex w-full max-w-[1199px] flex-col items-center gap-48px bp1200:flex-row bp1200:gap-80px">
        <div className="shrink-0">
          <Block className="h-[360px] w-[180px] rounded-8" />
        </div>
        <div className="w-full flex-1">
          <Block className="mb-16px h-7 w-36 rounded-pill" />
          <Block className="mb-12px h-10 w-[60%]" />
          <Block className="mb-40px h-5 w-[80%]" />
          <div className="grid grid-cols-1 gap-20px bp810:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-12px">
                <Block className="h-9 w-9 rounded-8" />
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
    <div className={cn("bg-layer-1", SHELL, RHYTHM)}>
      <div className={cn(CARD, "mx-auto w-full max-w-[644px] p-32px text-center bp810:p-48px")}>
        <Block className="mx-auto mb-12px h-10 w-[70%]" />
        <Block className="mx-auto mb-32px h-5 w-[60%]" />
        <div className="mx-auto flex max-w-[448px] flex-col gap-12px bp810:flex-row">
          <Block className="h-12 flex-1 rounded-8" />
          <Block className="h-12 w-32 rounded-pill" />
        </div>
      </div>
    </div>
  );
}

function FooterSkeleton() {
  return (
    <div className={cn("bg-layer-2 shadow-hairline-12", SHELL, RHYTHM)}>
      <div className="mx-auto w-full max-w-[1199px]">
        <div className="grid gap-40px bp810:grid-cols-3">
          {[1, 2, 3].map((column) => (
            <div key={column} className="flex flex-col gap-12px">
              <Block className="h-5 w-28" />
              <Block className="h-3 w-40" />
              <Block className="h-3 w-32" />
              <Block className="h-3 w-36" />
            </div>
          ))}
        </div>
        <div className="mt-40px h-px w-full bg-hairline-divider" />
        <div className="pt-24px">
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
      className="min-h-screen animate-pulse bg-layer-0 text-ink-high motion-reduce:animate-none"
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
