import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Github, BookOpen } from "lucide-react";

export default function CTAStrip() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-6">
        <div
          className={`rounded-2xl border border-indigo/20 bg-indigo/5 px-8 py-16 text-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Open source. Production quality. Zero compromise.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Clone it, fork it, build on it. Licensed under MIT.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2 bg-indigo hover:bg-indigo/90 text-primary-foreground" asChild>
              <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub Repo
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 border-border hover:border-indigo" asChild>
              <a href="https://github.com/vansh-121/GupShupGo#architecture" target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4" />
                Read Architecture Docs
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
