import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Feather, Target, Flame, Radio, Zap, Database, Bell, Cloud, Palette } from "lucide-react";

const techs = [
  { name: "Flutter", icon: Feather },
  { name: "Dart", icon: Target },
  { name: "Firebase", icon: Flame },
  { name: "Agora", icon: Radio },
  { name: "Provider", icon: Zap },
  { name: "Firestore", icon: Database },
  { name: "FCM", icon: Bell },
  { name: "Firebase Storage", icon: Cloud },
  { name: "Material Design 3", icon: Palette },
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tech-stack" className="py-28 relative" ref={ref}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="inline-block text-xs font-medium text-indigo border border-indigo/20 rounded-full px-4 py-1.5 mb-4 bg-indigo/5">
          Tech Stack
        </span>
        <h2 className="display-font text-4xl sm:text-5xl font-bold tracking-[-0.03em] mb-4">
          Built on <span className="gradient-text">rock-solid</span> infrastructure
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-14 text-base">
          Industry-proven technologies, battle-tested at scale.
        </p>

        <div
          className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {techs.map((t) => (
            <span
              key={t.name}
              className="glow-card group inline-flex items-center gap-2.5 text-sm border border-border rounded-2xl px-5 py-3 text-muted-foreground bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-indigo/40 hover:text-foreground hover:-translate-y-0.5 cursor-default"
            >
              <t.icon className="w-4 h-4 text-indigo transition-transform duration-300 group-hover:scale-125" />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
