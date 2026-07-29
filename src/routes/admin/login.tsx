import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { KeyRound, Mail, ShieldAlert, ArrowRight, Lock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/context/AdminAuthContext";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Atelier Admin Login — Maison Vellári" },
      { name: "description", content: "Master Cordwainer & Concierge Admin Console" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { isAuthenticated, login, isMounted } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("concierge@vellari.com");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isMounted, isAuthenticated, navigate]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const success = login(email, password);
    if (success) {
      toast.success("Atelier Admin Authenticated", {
        description: "Welcome back, Master Cordwainer.",
      });
      navigate({ to: "/admin/dashboard" });
    } else {
      setErrorMsg("Invalid Concierge Email or Master Security Key.");
      toast.error("Authentication Failed", {
        description: "Please verify your credentials or click 'Fill Demo Credentials'.",
      });
    }
  };

  const handleFillDemo = () => {
    setEmail("concierge@vellari.com");
    setPassword("master1927");
    setErrorMsg("");
  };

  if (!isMounted) {
    return <main className="min-h-screen bg-background" />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between grain">
      {/* Standalone Admin Header */}
      <header className="border-b border-border/60 bg-onyx/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-wide text-foreground">
                Maison <span className="text-gold italic font-normal">Vellári</span>
              </span>
              <span className="ml-2 rounded border border-gold/30 bg-gold/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-gold">
                Admin Console
              </span>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition"
          >
            <span>Customer Storefront</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Standalone Login Screen */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background Spotlight */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[75vh] w-[75vh] rounded-full animate-spotlight pointer-events-none"
          style={{
            background: "radial-gradient(circle, oklch(0.82 0.13 82 / 18%) 0%, transparent 65%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="rounded-2xl border border-border/80 bg-onyx/95 p-8 backdrop-blur-2xl shadow-2xl">
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <span className="eyebrow text-[0.65rem]">Private Portal · Est. 1927</span>
              <h1 className="font-serif text-3xl text-foreground font-medium tracking-wide">
                Atelier Admin Login
              </h1>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Separate master management console for cordwainers and order concierges.
              </p>
            </div>

            {errorMsg && (
              <div className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-400 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-gold" />
                  Concierge Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="concierge@vellari.com"
                  className="w-full rounded-lg border border-border/60 bg-charcoal/50 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="h-3 w-3 text-gold" />
                  Master Security Passphrase
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-border/60 bg-charcoal/50 px-4 py-3 text-xs font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:brightness-110 cursor-pointer"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  Access Atelier Console
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 border-t border-border/50 pt-5 text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[0.7rem] text-gold/80 hover:text-gold hover:underline transition cursor-pointer"
              >
                Click to Auto-Fill Demo Admin Credentials
              </button>
              <p className="mt-1 text-[0.62rem] text-muted-foreground">
                Demo Key: <code className="font-mono text-gold/90">master1927</code>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Standalone Admin Footer */}
      <footer className="border-t border-border/60 bg-onyx/80 py-4 px-6 text-center text-[0.7rem] text-muted-foreground">
        © {new Date().getFullYear()} Maison Vellári S.r.l. · Internal Master Cordwainer System
      </footer>
    </main>
  );
}
