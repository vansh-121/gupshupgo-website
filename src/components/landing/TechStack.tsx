import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const techs = [
  "Flutter", "Dart", "Firebase", "Agora", "Provider",
  "Firestore", "FCM", "Firebase Storage", "Material Design 3",
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tech-stack" className="py-24" ref={ref}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Built on rock-solid infrastructure
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-12">
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
              className="text-sm border border-border rounded-full px-5 py-2 text-muted-foreground bg-card transition-all duration-200 hover:border-indigo hover:text-foreground cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
