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
    <div className="w-[150px] h-[300px] sm:w-[180px] sm:h-[360px] rounded-[28px] border border-border bg-card p-2.5 flex-shrink-0">
      <div className="w-full h-full rounded-[20px] bg-background flex flex-col items-center justify-center gap-4">
        {/* Avatar circle */}
        <div className={`w-16 h-16 rounded-full ${isOutgoing ? "bg-indigo/20" : "bg-teal/20"} flex items-center justify-center`}>
          <span className={`text-xl font-bold ${isOutgoing ? "text-indigo" : "text-teal"}`}>
            {isOutgoing ? "A" : "B"}
          </span>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-foreground">
            {isOutgoing ? "Alex" : "Bailey"}
          </p>
          <p className={`text-[10px] ${isOutgoing ? "text-indigo" : "text-teal"}`}>
            {isOutgoing ? "Calling..." : "Incoming call"}
          </p>
        </div>
        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          {isOutgoing ? (
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
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
    <section className="py-24 bg-card/50" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Phone mockups */}
          <div className="flex gap-4 sm:gap-6 flex-shrink-0">
            <MiniPhone variant="outgoing" />
            <MiniPhone variant="incoming" />
          </div>

          {/* Feature list */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Full in-call controls
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Every feature you'd expect from a production calling app — nothing left out.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {callFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <f.icon className="w-4 h-4 text-indigo flex-shrink-0" />
                  <span className="text-sm text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
