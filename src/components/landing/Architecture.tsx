import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Smartphone, Database, Radio } from "lucide-react";

const nodes = [
  {
    icon: Smartphone,
    label: "Your Device",
    sub: "Flutter App",
    items: ["Material UI", "Provider State", "Local Cache"],
    gradient: "from-indigo to-indigo-deep",
  },
  {
    icon: Database,
    label: "Firebase",
    sub: "Backend Services",
    items: ["Auth", "FCM", "Firestore", "Storage"],
    gradient: "from-teal to-indigo",
  },
  {
    icon: Radio,
    label: "Agora RTC",
    sub: "Media Engine",
    items: ["Video P2P", "Audio P2P", "Signaling"],
    gradient: "from-indigo-deep to-teal",
  },
];

function DashedArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center flex-shrink-0 px-2">
      <svg width="80" height="24" viewBox="0 0 80 24" className="text-indigo/50">
        <line
          x1="0" y1="12" x2="68" y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-dash-flow"
        />
        <polygon points="68,6 80,12 68,18" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function Architecture() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="architecture" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-medium text-teal border border-teal/20 rounded-full px-4 py-1.5 mb-4 bg-teal/5">
            Architecture
          </span>
          <h2 className="display-font text-4xl sm:text-5xl font-bold tracking-[-0.03em] mb-4">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            A clean three-layer architecture for reliable communication at scale.
          </p>
        </div>

        <div
          className={`flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {nodes.map((node, i) => (
            <div key={node.label} className="contents">
              <div className="glow-card group w-full sm:w-72 lg:w-80 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:border-indigo/40 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${node.gradient} mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <node.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="display-font font-bold text-lg mb-0.5">{node.label}</h3>
                <p className="text-xs text-muted-foreground mb-5">{node.sub}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {node.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] border border-border rounded-full px-3 py-1 text-muted-foreground bg-background/50 transition-colors duration-200 hover:border-indigo/30 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {i < nodes.length - 1 && <DashedArrow />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
