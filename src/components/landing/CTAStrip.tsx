import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Github, BookOpen, ArrowRight } from "lucide-react";

export default function CTAStrip() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-28">
      <div className="container mx-auto px-6">
        <div
          className={`relative rounded-3xl border border-indigo/20 overflow-hidden ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo/8 via-background to-teal/5" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/5 rounded-full blur-[80px]" />
          <div className="absolute inset-0 dot-grid opacity-10" />

          <div className="relative px-8 py-20 text-center">
            <h2 className="display-font text-4xl sm:text-5xl font-bold tracking-[-0.03em] mb-4">
              Open source. Production quality.
              <br />
              <span className="gradient-text">Zero compromise.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-base">
              Clone it, fork it, build on it. Licensed under MIT.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-indigo to-indigo-deep hover:opacity-90 text-primary-foreground shadow-lg shadow-indigo/20 transition-all duration-300 hover:shadow-indigo/30 hover:scale-[1.02] rounded-xl" asChild>
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub Repo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 border-border hover:border-indigo/40 rounded-xl transition-all duration-300" asChild>
                <a href="https://github.com/vansh-121/GupShupGo#architecture" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-4 h-4" />
                  Read Architecture Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
