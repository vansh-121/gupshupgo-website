import { Skeleton } from "@/components/ui/skeleton";

function NavbarSkeleton() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-5">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>
        <Skeleton className="md:hidden h-9 w-9 rounded-xl" />
      </div>
    </nav>
  );
}

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left w-full">
            <div className="flex justify-center lg:justify-start mb-6">
              <Skeleton className="h-7 w-40 rounded-full" />
            </div>
            <div className="space-y-3 mb-6">
              <Skeleton className="h-12 sm:h-14 w-[80%] mx-auto lg:mx-0" />
              <Skeleton className="h-12 sm:h-14 w-[60%] mx-auto lg:mx-0" />
            </div>
            <div className="space-y-2 mb-10 max-w-lg mx-auto lg:mx-0">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[85%]" />
            </div>
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              <Skeleton className="h-11 w-36 rounded-lg" />
              <Skeleton className="h-11 w-32 rounded-lg" />
            </div>
            <div className="flex justify-center lg:justify-start mb-8">
              <Skeleton className="h-16 w-64 rounded-xl" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-full" />
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Skeleton className="w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] rounded-[40px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WaitlistSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto rounded-3xl border border-border p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-6">
            <Skeleton className="h-7 w-48 rounded-full" />
          </div>
          <Skeleton className="h-10 w-[70%] mx-auto mb-3" />
          <Skeleton className="h-5 w-[60%] mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGridSkeleton() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Skeleton className="h-7 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-[50%] mx-auto mb-4" />
          <Skeleton className="h-5 w-72 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl border border-border p-6">
              <Skeleton className="w-10 h-10 rounded-xl mb-5" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[80%] mt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSkeleton() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Skeleton className="h-7 w-28 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-[40%] mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full sm:w-72 lg:w-80 rounded-2xl border border-border p-8 text-center">
              <Skeleton className="w-14 h-14 rounded-2xl mx-auto mb-4" />
              <Skeleton className="h-5 w-24 mx-auto mb-1" />
              <Skeleton className="h-3 w-20 mx-auto mb-5" />
              <div className="flex flex-wrap justify-center gap-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSkeleton() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6 text-center">
        <Skeleton className="h-7 w-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-12 w-[50%] mx-auto mb-4" />
        <Skeleton className="h-5 w-64 mx-auto mb-14" />
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Skeleton key={i} className="h-11 w-28 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoHighlightSkeleton() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex gap-4 sm:gap-6 flex-shrink-0">
            <Skeleton className="w-[150px] h-[300px] sm:w-[180px] sm:h-[360px] rounded-[28px]" />
            <Skeleton className="w-[150px] h-[300px] sm:w-[180px] sm:h-[360px] rounded-[28px] mt-8" />
          </div>
          <div className="flex-1 w-full">
            <Skeleton className="h-7 w-36 rounded-full mb-4" />
            <Skeleton className="h-12 w-[60%] mb-3" />
            <Skeleton className="h-5 w-[80%] mb-10" />
            <div className="grid grid-cols-2 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-xl" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASkeleton() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl border border-border p-8 py-20 text-center">
          <Skeleton className="h-12 w-[60%] mx-auto mb-2" />
          <Skeleton className="h-12 w-[40%] mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto mb-10" />
          <div className="flex flex-wrap justify-center gap-3">
            <Skeleton className="h-11 w-36 rounded-xl" />
            <Skeleton className="h-11 w-48 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSkeleton() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
    </footer>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      <NavbarSkeleton />
      <main>
        <HeroSkeleton />
        <WaitlistSkeleton />
        <FeatureGridSkeleton />
        <ArchitectureSkeleton />
        <TechStackSkeleton />
        <DemoHighlightSkeleton />
        <CTASkeleton />
      </main>
      <FooterSkeleton />
    </div>
  );
}
