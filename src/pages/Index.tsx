import { Suspense, lazy } from "react";

import SiteShell from "@/components/layout/SiteShell";
import LoadingSkeleton from "@/components/landing/LoadingSkeleton";
import Hero from "@/components/landing/sections/Hero";

/**
 * Landing page composition (design §3.6, Requirements 3.1, 14.1, 14.2).
 *
 * `Hero` is eagerly imported so the above-the-fold content and its CTA paint
 * without an extra network round trip (14.1). The ten below-hero sections each
 * get their own `React.lazy` chunk, all sharing one `<Suspense>` boundary with
 * `LoadingSkeleton` as the fallback (14.2). Render order matches `SECTIONS`
 * in `src/data/sections.ts` (3.1).
 */

const FeatureOverview = lazy(() => import("@/components/landing/sections/FeatureOverview"));
const MeshChatSection = lazy(() => import("@/components/landing/sections/MeshChatSection"));
const ArcadeSection = lazy(() => import("@/components/landing/sections/ArcadeSection"));
const PrivacySection = lazy(() => import("@/components/landing/sections/PrivacySection"));
const CallingSection = lazy(() => import("@/components/landing/sections/CallingSection"));
const AnonymousChatSection = lazy(() => import("@/components/landing/sections/AnonymousChatSection"));
const ProSection = lazy(() => import("@/components/landing/sections/ProSection"));
const TrustSection = lazy(() => import("@/components/landing/sections/TrustSection"));
const NewsletterSection = lazy(() => import("@/components/landing/sections/NewsletterSection"));
const DownloadClose = lazy(() => import("@/components/landing/sections/DownloadClose"));

export default function Index() {
  return (
    <SiteShell>
      <Hero />
      <Suspense fallback={<LoadingSkeleton />}>
        <FeatureOverview />
        <MeshChatSection />
        <ArcadeSection />
        <PrivacySection />
        <CallingSection />
        <AnonymousChatSection />
        <ProSection />
        <TrustSection />
        <NewsletterSection />
        <DownloadClose />
      </Suspense>
    </SiteShell>
  );
}
