import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Github, BookOpen } from "lucide-react";

export default function CTAStrip() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-28">
      <div className="container mx-auto px-6">
        <div
          className={`rounded-3xl border border-primary/20 bg-primary/[0.04] px-8 py-20 text-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            Open source. Production quality.<br className="hidden sm:block" /> Zero compromise.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg">
            Clone it, fork it, build on it. Licensed under MIT.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-7 text-[15px] font-semibold shadow-lg shadow-primary/20" asChild>
              <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub Repo
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2.5 rounded-xl h-12 px-7 text-[15px] font-semibold border-border hover:border-primary/40 hover:bg-secondary" asChild>
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
