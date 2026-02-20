import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const techs = [
  "Flutter", "Dart", "Firebase", "Agora", "Provider",
  "Firestore", "FCM", "Firebase Storage", "Material Design 3",
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tech-stack" className="py-28" ref={ref}>
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Tech Stack</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
          Built on rock-solid infrastructure
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-14 text-lg">
          Industry-proven technologies, battle-tested at scale.
        </p>

        <div
          className={`flex flex-wrap justify-center gap-3 max-w-2xl mx-auto ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {techs.map((t) => (
            <span
              key={t}
              className="text-sm border border-border rounded-xl px-5 py-2.5 text-muted-foreground bg-card transition-all duration-200 hover:border-primary/40 hover:text-foreground cursor-default font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
