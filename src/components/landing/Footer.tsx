import { Github } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "GitHub", href: "https://github.com/vansh-121/GupShupGo" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/app_icon.png" alt="GupShupGo" className="h-7 w-7 rounded-lg" />
            <span className="text-sm font-bold text-foreground tracking-tight">GupShupGo</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
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
              className="hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <span className="border border-border rounded-full px-2.5 py-0.5 font-medium">MIT</span>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Made with Flutter & ❤️ by vansh-121
        </div>
      </div>
    </footer>
  );
}
