import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MicOff, VideoOff, Volume2, RotateCw, Pause, Timer } from "lucide-react";

const callFeatures = [
  { icon: MicOff, label: "Mute / Unmute" },
  { icon: VideoOff, label: "Video Toggle" },
  { icon: Volume2, label: "Speaker Output" },
  { icon: RotateCw, label: "Flip Camera" },
  { icon: Pause, label: "Hold Call" },
  { icon: Timer, label: "Real-time Timer" },
];

function MiniPhone({ variant }: { variant: "outgoing" | "incoming" }) {
  const isOutgoing = variant === "outgoing";
  return (
    <div className={`glow-card w-[150px] h-[300px] sm:w-[180px] sm:h-[360px] rounded-[28px] border border-border bg-card/50 backdrop-blur-sm p-2.5 flex-shrink-0 transition-all duration-500 hover:-translate-y-2 ${isOutgoing ? "" : "mt-8"}`}>
      <div className="w-full h-full rounded-[20px] bg-background flex flex-col items-center justify-center gap-4">
        {/* Avatar circle */}
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${isOutgoing ? "from-indigo to-indigo-deep" : "from-teal to-indigo"} flex items-center justify-center shadow-lg ${isOutgoing ? "shadow-indigo/20" : "shadow-teal/20"}`}>
          <span className="text-xl font-bold text-primary-foreground">
            {isOutgoing ? "A" : "B"}
          </span>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-foreground">
            {isOutgoing ? "Alex" : "Bailey"}
          </p>
          <p className={`text-[10px] font-medium ${isOutgoing ? "text-indigo" : "text-teal"}`}>
            {isOutgoing ? "Calling..." : "Incoming call"}
          </p>
        </div>
        {/* Pulse ring */}
        <div className={`w-12 h-12 rounded-full border-2 ${isOutgoing ? "border-indigo/30" : "border-teal/30"} animate-pulse-subtle`} />
        {/* Buttons */}
        <div className="flex gap-3">
          {isOutgoing ? (
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center hover:bg-destructive/30 transition-colors cursor-pointer">
              <span className="text-destructive text-lg">✕</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="text-destructive text-sm">✕</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                <span className="text-teal text-sm">✓</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DemoHighlight() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section aria-label="In-call experience demo" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-indigo/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Phone mockups */}
          <div className="flex gap-4 sm:gap-6 flex-shrink-0 relative">
            <div className="absolute -inset-10 bg-indigo/5 rounded-full blur-3xl pointer-events-none" />
            <MiniPhone variant="outgoing" />
            <MiniPhone variant="incoming" />
          </div>

          {/* Feature list */}
          <div className="flex-1">
            <span className="inline-block text-xs font-medium text-teal border border-teal/20 rounded-full px-4 py-1.5 mb-4 bg-teal/5">
              In-Call Experience
            </span>
            <h2 className="display-font text-4xl sm:text-5xl font-bold tracking-[-0.03em] mb-3">
              Full in-call <span className="gradient-text">controls</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md text-base">
              Every feature you'd expect from a production calling app — nothing left out.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {callFeatures.map((f, i) => (
                <div key={f.label} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-indigo/10 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo/20 group-hover:scale-110">
                    <f.icon className="w-4 h-4 text-indigo" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
