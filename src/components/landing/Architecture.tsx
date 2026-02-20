import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Smartphone, Database, Radio } from "lucide-react";

const nodes = [
  {
    icon: Smartphone,
    label: "Your Device",
    sub: "Flutter App",
    items: ["Material UI", "Provider State", "Local Cache"],
  },
  {
    icon: Database,
    label: "Firebase",
    sub: "Backend Services",
    items: ["Auth", "FCM", "Firestore", "Storage"],
  },
  {
    icon: Radio,
    label: "Agora RTC",
    sub: "Media Engine",
    items: ["Video P2P", "Audio P2P", "Signaling"],
  },
];

function DashedArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center flex-shrink-0">
      <svg width="80" height="24" viewBox="0 0 80 24" className="text-indigo">
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
    <section id="architecture" className="py-24 bg-card/50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
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
              <div className="group w-full lg:w-72 rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-indigo hover:shadow-lg hover:shadow-indigo/5">
                <node.icon className="w-8 h-8 mx-auto mb-3 text-muted-foreground group-hover:text-indigo transition-colors duration-200" />
                <h3 className="font-bold text-lg mb-0.5">{node.label}</h3>
                <p className="text-xs text-muted-foreground mb-4">{node.sub}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {node.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] border border-border rounded-full px-2.5 py-0.5 text-muted-foreground"
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
