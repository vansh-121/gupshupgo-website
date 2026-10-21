import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircle, Download, ExternalLink, ShieldCheck, WifiOff, Sparkles } from "lucide-react";

import SiteShell from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo/SEOHead";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.gupshupgo.app";

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const cleanUsername = (username || "").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 30);
  const [attemptedAutoOpen, setAttemptedAutoOpen] = useState(false);

  const intentUrl = `intent://gupshupgo.app/u/${cleanUsername}#Intent;scheme=https;package=com.gupshupgo.app;end`;
  const customSchemeUrl = `videocallapp://u/${cleanUsername}`;

  useEffect(() => {
    if (!cleanUsername) return;

    // Detect mobile device
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      setAttemptedAutoOpen(true);
      const timer = setTimeout(() => {
        window.location.href = intentUrl;
      }, 400);
      return () => clearTimeout(timer);
    } else if (isMobile) {
      setAttemptedAutoOpen(true);
      const timer = setTimeout(() => {
        window.location.href = customSchemeUrl;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [cleanUsername, intentUrl, customSchemeUrl]);

  const handleOpenApp = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    window.location.href = isAndroid ? intentUrl : customSchemeUrl;
  };

  const initialLetter = cleanUsername ? cleanUsername.charAt(0).toUpperCase() : "?";

  return (
    <SiteShell mainClassName="bg-layer-1 text-ink-high">
      <SEOHead
        title={`Connect with @${cleanUsername} on GupShupGo`}
        description={`Open GupShupGo to chat, call, or exchange messages securely with @${cleanUsername}.`}
      />

      {/* Main Container */}
      <div className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-[1200px] flex-col items-center justify-center px-16px py-48px bp480:px-24px bp810:py-72px">
        
        {/* Profile Card */}
        <div className="relative flex w-full max-w-[580px] flex-col items-center rounded-32 border border-hairline-56 bg-layer-0/95 p-32px text-center shadow-elevation backdrop-blur-md bp480:p-48px">
          
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-40px left-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />

          {/* Profile Avatar Circle with Bold Prominent Initial */}
          <div className="relative mb-24px flex h-[104px] w-[104px] items-center justify-center rounded-full bg-gradient-to-tr from-brand to-brand-accent shadow-elevation ring-4 ring-layer-0 bp480:h-[116px] bp480:w-[116px]">
            <span className="text-48 font-bold leading-none text-white bp480:text-57">{initialLetter}</span>
            <div className="absolute -bottom-2px -right-2px flex h-[36px] w-[36px] items-center justify-center rounded-full border-2 border-layer-0 bg-brand text-white shadow-sm">
              <MessageCircle className="h-[20px] w-[20px]" />
            </div>
          </div>

          {/* Member Badge */}
          <div className="mb-16px inline-flex items-center gap-6px rounded-full bg-brand/10 px-16px py-6px text-13 font-semibold tracking-wide text-brand dark:bg-brand/20">
            <Sparkles className="h-[16px] w-[16px] shrink-0" />
            GupShupGo Member
          </div>

          {/* BIG, Bold, High-Impact Username Title */}
          <h1 className="mb-20px max-w-full break-all text-39 font-bold leading-110 tracking-tight text-ink-high bp480:text-48 bp810:text-57">
            @{cleanUsername}
          </h1>

          {/* Contextual Description with relaxed leading and clear breathing space */}
          <p className="mb-32px max-w-[460px] text-16 leading-140 text-ink-secondary bp480:text-19">
            {attemptedAutoOpen ? (
              <>Attempting to open profile in the <strong>GupShupGo</strong> app...</>
            ) : (
              <>Connect with <strong>@{cleanUsername}</strong> on GupShupGo for private, end-to-end encrypted messaging, HD video calling, and offline mesh chat.</>
            )}
          </p>

          {/* Feature Badges - Comfortable pills with generous padding */}
          <div className="mb-36px flex flex-wrap items-center justify-center gap-12px bp480:gap-16px">
            <div className="inline-flex items-center gap-8px rounded-full border border-hairline-56 bg-layer-2/80 px-20px py-10px text-13 font-medium text-ink-secondary shadow-hairline-56 bp480:text-14">
              <ShieldCheck className="h-[18px] w-[18px] shrink-0 text-status-success" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="inline-flex items-center gap-8px rounded-full border border-hairline-56 bg-layer-2/80 px-20px py-10px text-13 font-medium text-ink-secondary shadow-hairline-56 bp480:text-14">
              <WifiOff className="h-[18px] w-[18px] shrink-0 text-brand" />
              <span>Offline Mesh Ready</span>
            </div>
          </div>

          {/* Action Buttons with explicit verified gap-20px */}
          <div className="mb-24px flex w-full flex-col items-center gap-20px">
            {/* Primary Action Button */}
            <Button
              onClick={handleOpenApp}
              className="h-[54px] w-full max-w-[420px] rounded-pill bg-brand px-28px text-16 font-semibold text-white shadow-elevation transition-standard hover:bg-brand-dark active:scale-[0.98] bp480:text-19"
            >
              <ExternalLink className="mr-10px h-[20px] w-[20px] shrink-0" />
              Open in GupShupGo App
            </Button>

            {/* Secondary Action Button */}
            <Button
              asChild
              variant="outline"
              className="h-[54px] w-full max-w-[420px] rounded-pill border-hairline-56 bg-layer-2 px-28px text-16 font-medium text-ink-high shadow-hairline-56 transition-standard hover:bg-layer-1 active:scale-[0.98] bp480:text-19"
            >
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <Download className="mr-10px h-[20px] w-[20px] shrink-0 text-brand" />
                Download on Google Play
              </a>
            </Button>
          </div>

          {/* Status Hint */}
          <p className="text-13 leading-140 text-ink-secondary">
            Already have the app? Tap <strong>Open in GupShupGo App</strong> above.
          </p>
        </div>

        {/* Footer info link */}
        <div className="mt-36px text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-6px text-14 font-medium text-ink-secondary transition-standard hover:text-ink-high hover:underline"
          >
            Learn more about GupShupGo features →
          </Link>
        </div>

      </div>
    </SiteShell>
  );
};

export default PublicProfile;
