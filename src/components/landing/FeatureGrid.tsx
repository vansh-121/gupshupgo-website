import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Video, Mic, MessageSquare, Camera, Bell, ClipboardList, ShieldCheck, Circle } from "lucide-react";

const features = [
  { icon: Video, title: "HD Video Calling", desc: "Agora RTC Engine powered crystal-clear one-to-one video calls with adaptive quality." },
  { icon: Mic, title: "Voice Calls", desc: "Audio-only lightweight calling with full in-call controls and noise suppression." },
  { icon: MessageSquare, title: "Real-Time Messaging", desc: "Typing indicators, read receipts, media sharing — all in real time via Firestore." },
  { icon: Camera, title: "Status Updates", desc: "Text, image & video statuses with 24-hour auto-expiry. Stories done right." },
  { icon: Bell, title: "Background Calls", desc: "Push notifications ring through even when the app is closed or killed." },
  { icon: ClipboardList, title: "Call Logs", desc: "Full history with call type, duration, timestamps and missed/answered status." },
  { icon: ShieldCheck, title: "Phone Auth", desc: "OTP verification via Firebase Authentication with guest login fallback." },
  { icon: Circle, title: "Presence System", desc: "Live online/offline indicators across all users, updated in real time." },
];

export default function FeatureGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-28" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            Everything you need to connect
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Production-grade features, not a prototype. Every detail built for real users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-lg hover:shadow-primary/[0.03] ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-4 group-hover:bg-primary/[0.12] transition-colors duration-200">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1.5 tracking-tight">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
