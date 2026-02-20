import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Video, Mic, MessageSquare, Camera, Bell, ClipboardList, ShieldCheck, Circle } from "lucide-react";

const features = [
  { icon: Video, title: "HD Video Calling", desc: "Agora RTC Engine powered crystal-clear one-to-one video calls with adaptive quality.", color: "from-indigo to-indigo-deep" },
  { icon: Mic, title: "Voice Calls", desc: "Audio-only lightweight calling with full in-call controls and noise suppression.", color: "from-teal to-indigo" },
  { icon: MessageSquare, title: "Real-Time Messaging", desc: "Typing indicators, read receipts, media sharing — all in real time via Firestore.", color: "from-indigo-deep to-teal" },
  { icon: Camera, title: "Status Updates", desc: "Text, image & video statuses with 24-hour auto-expiry. Stories done right.", color: "from-teal to-indigo-deep" },
  { icon: Bell, title: "Background Calls", desc: "Push notifications ring through even when the app is closed or killed.", color: "from-indigo to-teal" },
  { icon: ClipboardList, title: "Call Logs", desc: "Full history with call type, duration, timestamps and missed/answered status.", color: "from-indigo-deep to-indigo" },
  { icon: ShieldCheck, title: "Phone Auth", desc: "OTP verification via Firebase Authentication with guest login fallback.", color: "from-teal to-indigo" },
  { icon: Circle, title: "Presence System", desc: "Live online/offline indicators across all users, updated in real time.", color: "from-indigo to-indigo-deep" },
];

export default function FeatureGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-28 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-medium text-indigo border border-indigo/20 rounded-full px-4 py-1.5 mb-4 bg-indigo/5">
            Features
          </span>
          <h2 className="display-font text-4xl sm:text-5xl font-bold tracking-[-0.03em] mb-4">
            Everything you need to <span className="gradient-text">connect</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Production-grade features, not a prototype. Every detail built for real users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glow-card group rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-500 ease-out hover:border-indigo/40 hover:bg-card/80 hover:-translate-y-1 ${
                isVisible ? "animate-stagger-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-bold mb-2 text-foreground tracking-tight">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
