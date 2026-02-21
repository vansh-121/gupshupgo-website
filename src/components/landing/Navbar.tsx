import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Star, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/app_icon.png"
            alt="GupShupGo — open source video calling and chat app"
            className="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
            loading="eager"
          />
          <span className="display-font text-lg font-bold tracking-tight text-foreground">
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
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-indigo after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-indigo/30 hover:bg-card/50 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border text-foreground hover:border-indigo/40 hover:bg-indigo/5 rounded-xl transition-all duration-300"
            asChild
          >
            <a
              href="https://github.com/vansh-121/GupShupGo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              <span>Star on GitHub</span>
              <Star className="w-3 h-3 text-muted-foreground" />
            </a>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-xl hover:bg-card transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/50 px-6 py-5 space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl" asChild>
            <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
