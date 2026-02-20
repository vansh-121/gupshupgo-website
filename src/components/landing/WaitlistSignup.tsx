import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Bell, CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
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
    <section className="py-20 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-teal/4 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="glow-card rounded-3xl border border-border bg-card/40 backdrop-blur-md p-8 sm:p-12 text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r from-indigo/10 to-teal/10 text-teal border border-teal/20 rounded-full px-4 py-1.5">
                <Sparkles className="w-3 h-3" />
                Launching Soon on Google Play
              </span>
            </div>

            <h2 className="display-font text-3xl sm:text-4xl font-bold tracking-[-0.03em] mb-3">
              Get notified when we <span className="gradient-text">launch</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Be among the first to experience GupShupGo. Drop your email and we'll
              let you know the moment it hits the Play Store.
            </p>

            {success ? (
              <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 rounded-2xl px-6 py-4 animate-fade-in-up">
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
                  className="flex-1 h-12 bg-background/60 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-indigo rounded-xl"
                  required
                  maxLength={255}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="h-12 gap-2 bg-gradient-to-r from-indigo to-indigo-deep hover:opacity-90 text-primary-foreground px-6 whitespace-nowrap rounded-xl shadow-lg shadow-indigo/20 transition-all duration-300 hover:shadow-indigo/30"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Notify Me
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <p className="text-[10px] text-muted-foreground mt-5">
              No spam, ever. We'll only email you about the launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
