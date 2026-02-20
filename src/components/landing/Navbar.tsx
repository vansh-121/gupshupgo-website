import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Star, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "GitHub", href: "https://github.com/vansh-121/GupShupGo" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/app_icon.png"
            alt="GupShupGo"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-foreground">
            GupShupGo
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
            <Star className="w-3 h-3" />
            <span>Star</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border text-foreground hover:border-indigo hover:text-indigo"
            asChild
          >
            <a
              href="https://github.com/vansh-121/GupShupGo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2" asChild>
            <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
