import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Bell, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WaitlistSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("waitlist").insert({ email: trimmed });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "You're already on the list! 🎉" });
        setSuccess(true);
      } else {
        toast({ title: "Something went wrong. Try again.", variant: "destructive" });
      }
      return;
    }

    setSuccess(true);
    toast({ title: "You're on the waitlist! 🚀" });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo/10 border border-indigo/20 mb-6">
            <Bell className="w-6 h-6 text-indigo" />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-teal/10 text-teal border border-teal/20 rounded-full px-3 py-1">
              <Sparkles className="w-3 h-3" />
              Launching Soon on Google Play
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Get notified when we launch
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Be among the first to experience GupShupGo. Drop your email and we'll
            let you know the moment it hits the Play Store.
          </p>

          {success ? (
            <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 rounded-xl px-6 py-4 animate-fade-in-up">
              <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">You're on the list!</p>
                <p className="text-xs text-muted-foreground">We'll email you as soon as we launch.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-indigo"
                required
                maxLength={255}
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="h-12 gap-2 bg-indigo hover:bg-indigo/90 text-primary-foreground px-6 whitespace-nowrap"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Notify Me
                    <Bell className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-[10px] text-muted-foreground mt-4">
            No spam, ever. We'll only email you about the launch.
          </p>
        </div>
      </div>
    </section>
  );
}
