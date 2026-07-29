import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowUpRight,
  Clock,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Private Concierge — Maison Vellári" },
      {
        name: "description",
        content:
          "Schedule a private fitting audience with our master last-makers in Bologna, Paris, London, or New York. Bespoke consultations and concierge inquiries.",
      },
      { property: "og:title", content: "Contact & Private Concierge — Maison Vellári" },
      {
        property: "og:description",
        content:
          "Schedule a private fitting audience with our master last-makers in Bologna, Paris, London, or New York.",
      },
    ],
  }),
  component: ContactPage,
});

const ATELIERS = [
  {
    city: "Bologna",
    role: "Global Flagship & Atelier",
    address: "Via Farini 14, 40124 Bologna, Italy",
    phone: "+39 051 000 1897",
    email: "bologna@vellari.com",
    hours: "Tue – Sat: 10:00 – 19:00",
  },
  {
    city: "Paris",
    role: "Salon Privé",
    address: "248 Rue Saint-Honoré, 75001 Paris, France",
    phone: "+33 1 42 68 00 12",
    email: "paris@vellari.com",
    hours: "Tue – Sat: 10:30 – 19:30",
  },
  {
    city: "London",
    role: "Savile Row Fitting Parlour",
    address: "18 Savile Row, Mayfair, London W1S 3PR, UK",
    phone: "+44 20 7494 2200",
    email: "london@vellari.com",
    hours: "Tue – Sat: 10:00 – 18:30",
  },
  {
    city: "New York",
    role: "Fifth Avenue Salon",
    address: "745 Fifth Avenue, Suite 1200, New York, NY 10151",
    phone: "+1 212 555 0198",
    email: "ny@vellari.com",
    hours: "Tue – Sat: 10:00 – 18:00",
  },
];

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/60 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl tracking-wide text-foreground">
            Maison <span className="text-gold italic">Vellári</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.28em] text-muted-foreground md:flex">
          <Link to="/collection" className="transition hover:text-gold">
            Collection
          </Link>
          <Link to="/" hash="craft" className="transition hover:text-gold">
            Craft
          </Link>
          <Link to="/" hash="heritage" className="transition hover:text-gold">
            Heritage
          </Link>
          <Link to="/" hash="bespoke" className="transition hover:text-gold">
            Bespoke
          </Link>
          <Link to="/contact" className="text-gold transition font-medium">
            Contact
          </Link>
        </nav>
        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full border border-gold/40 px-5 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-gold transition hover:bg-gold hover:text-primary-foreground md:inline-flex"
        >
          Reserve
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Bologna",
    inquiryType: "Bespoke Fitting Audience",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry Transmitted", {
        description: `Thank you, ${formData.name || "Sir"}. Our master concierge for ${formData.city} will reach out to you within 24 hours.`,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "Bologna",
        inquiryType: "Bespoke Fitting Audience",
        message: "",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow inline-block"
          >
            Private Concierge & Appointments
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-serif text-5xl leading-tight text-foreground sm:text-6xl md:text-7xl"
          >
            An Audience With <br />
            <span className="italic text-gold-gradient">The Atelier</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Whether commissioning a one-of-one pair or requesting a private fitting consultation in
            Bologna, Paris, London, or New York, our concierge awaits your instructions.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Ateliers Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Interactive Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-xl border border-border/80 bg-onyx p-8 shadow-2xl lg:col-span-7 lg:p-10"
          >
            <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-4 w-4" />
              <span>Commission Inquiry</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl text-foreground">Request a Consultation</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Please specify your preferred city and consultation requirements. A private
              coordinator will contact you promptly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Julian Vance"
                    className="mt-2 w-full rounded-md border border-border/60 bg-charcoal/60 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 transition focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian@vance.co"
                    className="mt-2 w-full rounded-md border border-border/60 bg-charcoal/60 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 transition focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Telephone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0912"
                    className="mt-2 w-full rounded-md border border-border/60 bg-charcoal/60 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 transition focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Preferred Atelier Location
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-2 w-full rounded-md border border-border/60 bg-charcoal/60 px-4 py-3 text-sm text-foreground transition focus:border-gold focus:outline-none cursor-pointer"
                  >
                    <option value="Bologna">Bologna — Via Farini (HQ)</option>
                    <option value="Paris">Paris — Rue Saint-Honoré</option>
                    <option value="London">London — Savile Row</option>
                    <option value="New York">New York — Fifth Avenue</option>
                    <option value="Trunk Show">Private Trunk Show / Residence Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Inquiry Nature
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="mt-2 w-full rounded-md border border-border/60 bg-charcoal/60 px-4 py-3 text-sm text-foreground transition focus:border-gold focus:outline-none cursor-pointer"
                >
                  <option value="Bespoke Fitting Audience">
                    Bespoke Fitting Audience (90 mins)
                  </option>
                  <option value="Private Trunk Show Commission">
                    Private Trunk Show Commission
                  </option>
                  <option value="Existing Pair Refurbishment">
                    Existing Pair Refurbishment & Care
                  </option>
                  <option value="Press & General Concierge">Press & Corporate Concierge</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Personal Instructions / Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your preferred last shape, leather preference, or fitting dates..."
                  className="mt-2 w-full rounded-md border border-border/60 bg-charcoal/60 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 transition focus:border-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-gold py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-lg transition hover:bg-gold/90 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Transmitting..." : "Transmit Private Inquiry"}
                <Send className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-6 pt-2 text-[0.7rem] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Strict Confidentiality
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold" /> 24-Hour Concierge Response
                </span>
              </div>
            </form>
          </motion.div>

          {/* Right: Atelier Locations & Concierge Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-gold">
                <Globe className="h-4 w-4" />
                <span>Global Ateliers</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl text-foreground">Visit Our Salons</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Private audiences are by appointment only to ensure individual attention from our
                master last-makers.
              </p>

              <div className="mt-8 space-y-6">
                {ATELIERS.map((atelier) => (
                  <div
                    key={atelier.city}
                    className="group rounded-lg border border-border/50 bg-charcoal/40 p-5 transition hover:border-gold/50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl text-foreground group-hover:text-gold transition">
                        {atelier.city}
                      </h3>
                      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/80">
                        {atelier.role}
                      </span>
                    </div>
                    <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{atelier.address}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground/80">
                      <a
                        href={`tel:${atelier.phone}`}
                        className="flex items-center gap-1.5 hover:text-gold transition"
                      >
                        <Phone className="h-3.5 w-3.5 text-gold" />
                        <span>{atelier.phone}</span>
                      </a>
                      <a
                        href={`mailto:${atelier.email}`}
                        className="flex items-center gap-1.5 hover:text-gold transition"
                      >
                        <Mail className="h-3.5 w-3.5 text-gold" />
                        <span>{atelier.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link to="/" className="font-serif text-2xl tracking-wide text-foreground">
              Maison <span className="text-gold italic">Vellári</span>
            </Link>
            <div className="flex items-center gap-8 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <Link to="/collection" className="hover:text-gold transition">
                Collection
              </Link>
              <Link to="/" hash="craft" className="hover:text-gold transition">
                Craft
              </Link>
              <Link to="/" hash="heritage" className="hover:text-gold transition">
                Heritage
              </Link>
              <Link to="/contact" className="text-gold transition">
                Contact
              </Link>
            </div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
              © MMXXVI Maison Vellári
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
