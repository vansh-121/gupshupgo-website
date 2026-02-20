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
    <div className="w-[190px] h-[380px] rounded-[32px] border border-border bg-card p-3 flex-shrink-0 shadow-lg shadow-primary/[0.03]">
      <div className="w-full h-full rounded-[24px] bg-background flex flex-col items-center justify-center gap-4 border border-border/50">
        {/* Avatar circle */}
        <div className={`w-16 h-16 rounded-full ${isOutgoing ? "bg-primary/10" : "bg-accent/10"} flex items-center justify-center`}>
          <span className={`text-xl font-bold ${isOutgoing ? "text-primary" : "text-accent"}`}>
            {isOutgoing ? "A" : "B"}
          </span>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground tracking-tight">
            {isOutgoing ? "Alex" : "Bailey"}
          </p>
          <p className={`text-[11px] font-medium ${isOutgoing ? "text-primary" : "text-accent"}`}>
            {isOutgoing ? "Calling..." : "Incoming call"}
          </p>
        </div>
        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          {isOutgoing ? (
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive text-lg">✕</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <span className="text-destructive text-sm">✕</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-sm">✓</span>
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
    <section className="py-28 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col lg:flex-row items-center gap-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Phone mockups */}
          <div className="flex gap-6 flex-shrink-0">
            <MiniPhone variant="outgoing" />
            <MiniPhone variant="incoming" />
          </div>

          {/* Feature list */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Demo</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
              Full in-call controls
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md text-lg">
              Every feature you'd expect from a production calling app — nothing left out.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {callFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-primary" />
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
