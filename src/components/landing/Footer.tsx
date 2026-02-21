import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "GitHub", href: "https://github.com/vansh-121/GupShupGo" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo/30 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/app_icon.png" alt="GupShupGo logo" className="h-7 w-7 rounded-lg" loading="lazy" />
            <span className="display-font text-sm font-bold text-foreground">GupShupGo</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="https://github.com/vansh-121/GupShupGo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors p-2 rounded-lg hover:bg-card"
            >
              <Github className="w-4 h-4" />
            </a>
            <span className="border border-indigo/20 text-indigo rounded-full px-3 py-0.5 text-[10px] font-medium">MIT</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span className="text-border">·</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Made with Flutter & ❤️ by <span className="text-foreground font-medium">vansh-121</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
