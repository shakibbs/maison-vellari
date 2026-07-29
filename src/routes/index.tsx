import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

import heroShoe from "@/assets/hero-shoe.jpg";
import shoeOxford from "@/assets/shoe-oxford.jpg";
import shoeDerby from "@/assets/shoe-derby.jpg";
import shoeMonk from "@/assets/shoe-monk.jpg";
import shoeLoafer from "@/assets/shoe-loafer.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import materialLeather from "@/assets/material-leather.jpg";
import materialSuede from "@/assets/material-suede.jpg";
import materialStitch from "@/assets/material-stitch.jpg";
import heritageImg from "@/assets/heritage.jpg";
import bespokeImg from "@/assets/bespoke.jpg";
import { ShoeDetailModal, type ShoeProduct } from "@/components/ShoeDetailModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Vellári — Handcrafted Luxury Formal Shoes" },
      {
        name: "description",
        content:
          "Maison Vellári crafts bespoke formal shoes for gentlemen who lead. Italian leather, hand-stitched welts, timeless silhouettes.",
      },
      { property: "og:title", content: "Maison Vellári — Handcrafted Luxury Formal Shoes" },
      {
        property: "og:description",
        content:
          "A house of shoemaking devoted to the craft. Oxford, Derby, Monk & Loafers, made by hand in Italy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const COLLECTION = [
  { name: "The Oxford", tag: "Cap-toe · Patent", price: "€1,890", img: shoeOxford },
  { name: "The Derby", tag: "Burnished · Cognac", price: "€1,690", img: shoeDerby },
  { name: "The Monk", tag: "Double Buckle · Onyx", price: "€2,150", img: shoeMonk },
  { name: "The Loafer", tag: "Tasselled · Suede", price: "€1,540", img: shoeLoafer },
];

const BEST_SELLERS = [
  { name: "Vellári No. 01", sub: "Whole-cut Oxford", price: "€2,480", img: shoeOxford },
  { name: "Vellári No. 02", sub: "Burnished Derby", price: "€1,920", img: shoeDerby },
  { name: "Vellári No. 03", sub: "Double Monk", price: "€2,150", img: shoeMonk },
  { name: "Vellári No. 04", sub: "Suede Tassel", price: "€1,640", img: shoeLoafer },
  { name: "Vellári No. 05", sub: "Patent Opera", price: "€2,890", img: shoeOxford },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden grain"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] rounded-full animate-spotlight"
        style={{
          background: "radial-gradient(circle, oklch(0.82 0.13 82 / 22%) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute block h-[2px] w-[2px] rounded-full bg-gold/40"
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 73) % 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-32 pb-20 md:px-10 lg:grid-cols-12 lg:gap-6 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <span className="eyebrow">Maison Vellári · Est. 1927</span>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Crafted for
            <br />
            <span className="italic text-gold-gradient">Gentlemen</span>
            <br />
            Who Lead.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Every pair is a quiet declaration. Hand-lasted in Tuscany from a single hide of aged
            calfskin, finished with 212 solitary gestures of the artisan's hand.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-primary-foreground transition hover:brightness-110"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              Explore Collection
              <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-gold/40 px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-foreground transition hover:border-gold hover:text-gold"
            >
              Book Consultation
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-8">
            <div>
              <div className="font-serif text-3xl text-gold">98</div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                Years of craft
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-serif text-3xl text-gold">212</div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                Steps per pair
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-serif text-3xl text-gold">1</div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                Master artisan
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y, opacity }} className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative aspect-[5/4] w-full"
          >
            <div className="absolute inset-0 animate-float-slow">
              <img
                src={heroShoe}
                alt="Hand-crafted patent leather oxford under spotlight"
                width={1600}
                height={1408}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
          <div className="absolute bottom-6 right-6 hidden max-w-[220px] rounded-sm glass p-4 md:block">
            <div className="eyebrow text-[0.6rem]">Signature</div>
            <div className="mt-1 font-serif text-lg text-foreground">Nero Lucido</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Patent calf · Cap toe · Blake-rapid
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
        Scroll · Discover the Maison
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={align === "center" ? "text-center" : ""}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </motion.div>
  );
}

function Collection({ onSelectShoe }: { onSelectShoe: (shoe: ShoeProduct) => void }) {
  return (
    <section id="collection" className="relative bg-onyx py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Collection"
            title={
              <>
                Four silhouettes.
                <br />
                <span className="italic text-muted-foreground">One standard.</span>
              </>
            }
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            The canon of formal shoemaking, distilled. Choose your form; refuse compromise.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTION.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() =>
                onSelectShoe({
                  name: p.name,
                  category: "Collection",
                  material: p.tag,
                  price: p.price,
                  img: p.img,
                })
              }
              className="group relative block overflow-hidden bg-charcoal cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-60" />
                <div className="absolute right-4 top-4 rounded-full border border-gold/40 bg-onyx/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-gold opacity-0 backdrop-blur transition group-hover:opacity-100">
                  View
                </div>
              </div>
              <div className="flex items-start justify-between border-t border-border/50 p-6">
                <div>
                  <div className="font-serif text-xl text-foreground group-hover:text-gold transition-colors">
                    {p.name}
                  </div>
                  <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {p.tag}
                  </div>
                </div>
                <div className="font-serif text-lg text-gold">{p.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "I",
    title: "Cutting the Hide",
    desc: "A single hide, selected by hand from Tuscan tanneries aged twelve months.",
  },
  {
    n: "II",
    title: "Lasting",
    desc: "The upper is drawn over a hand-carved wooden last, held for 72 hours.",
  },
  {
    n: "III",
    title: "Hand-Welting",
    desc: "212 stitches join the upper to a Goodyear welt with linen thread.",
  },
  {
    n: "IV",
    title: "Burnishing",
    desc: "Layer upon layer of cream, brushed to a mirror by the artisan's palm.",
  },
];

function Craft() {
  return (
    <section id="craft" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="The Craft"
              title={
                <>
                  Six weeks.
                  <br />
                  <span className="italic">One pair.</span>
                </>
              }
            />
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              We reject the machine's hurry. Each pair passes through the same weathered hands, in
              the same Florentine atelier, in the same order they have for a century. Nothing is
              optimised. Everything is remembered.
            </p>
            <div className="mt-10 divider-gold w-24" />
            <blockquote className="mt-8 font-serif text-2xl italic leading-snug text-foreground">
              "A shoe is a promise between the maker and the man who wears it."
            </blockquote>
            <div className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-gold">
              — Alessandro Vellári, Master Cordwainer
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
            >
              <img
                src={craftHands}
                alt="Artisan cordwainer hand-stitching a formal shoe by candlelight"
                loading="lazy"
                width={1400}
                height={1000}
                className="aspect-[7/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative"
            >
              <div className="font-serif text-6xl italic text-gold/60">{s.n}</div>
              <div className="mt-4 h-px w-12 bg-gold" />
              <div className="mt-4 font-serif text-2xl text-foreground">{s.title}</div>
              <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MATERIALS = [
  {
    name: "Toscana Calf",
    origin: "Santa Croce, Italy",
    img: materialLeather,
    note: "Vegetable-tanned across 30 days in chestnut baths.",
  },
  {
    name: "Notte Suede",
    origin: "Solofra, Italy",
    img: materialSuede,
    note: "A velvet-soft nap on a hide brushed by hand.",
  },
  {
    name: "Waxed Welting",
    origin: "Florence Atelier",
    img: materialStitch,
    note: "Linen thread dressed in beeswax, drawn by needle.",
  },
];

function Materials() {
  return (
    <section className="border-t border-border bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow="Signature Materials"
          title={
            <>
              A dossier of <span className="italic text-gold-gradient">hides</span>.
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MATERIALS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12 }}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent opacity-90 transition group-hover:opacity-70" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="eyebrow text-[0.6rem]">{m.origin}</div>
                  <div className="mt-2 font-serif text-3xl text-foreground">{m.name}</div>
                  <div className="mt-3 max-h-0 overflow-hidden text-sm text-muted-foreground transition-all duration-500 group-hover:max-h-24">
                    {m.note}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers({ onSelectShoe }: { onSelectShoe: (shoe: ShoeProduct) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };
  return (
    <section className="border-t border-border/30 bg-onyx pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Best Sellers"
            title={
              <>
                Chosen by <span className="italic">the few</span>.
              </>
            }
          />
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-14 flex gap-6 overflow-x-auto scroll-smooth px-6 pb-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="shrink-0 w-[max(0px,calc((100vw-80rem)/2))]" />
        {BEST_SELLERS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            onClick={() =>
              onSelectShoe({
                name: p.name,
                category: p.sub,
                price: p.price,
                img: p.img,
                tag: "Best Seller",
              })
            }
            className="group relative flex w-[300px] shrink-0 flex-col sm:w-[360px] cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                width={900}
                height={1100}
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="absolute right-4 top-4 rounded-full border border-gold/40 bg-onyx/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-gold opacity-0 backdrop-blur transition group-hover:opacity-100">
                View
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between">
              <div>
                <div className="font-serif text-xl text-foreground group-hover:text-gold transition-colors">
                  {p.name}
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  {p.sub}
                </div>
              </div>
              <div className="font-serif text-lg text-gold">{p.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Heritage() {
  return (
    <section id="heritage" className="relative overflow-hidden border-y border-border">
      <div className="relative">
        <img
          src={heritageImg}
          alt="Gentleman in tuxedo in a dark leather chair, editorial fashion campaign"
          loading="lazy"
          width={1600}
          height={1000}
          className="h-[92vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <span className="eyebrow">Heritage · Since 1927</span>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
                A quiet house,
                <br />
                <span className="italic text-gold-gradient">loud in its silence.</span>
              </h2>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
                Founded in a two-room workshop in Florence, Maison Vellári has clothed the feet of
                statesmen, virtuosos and quiet legends for four generations. We do not advertise. We
                are simply worn.
              </p>
              <div className="mt-10 flex flex-wrap gap-8">
                {[
                  { k: "1927", v: "Founded, Florence" },
                  { k: "IV", v: "Generations of makers" },
                  { k: "42", v: "Countries served" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-serif text-3xl text-gold">{s.k}</div>
                    <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    quote: "The most quietly extraordinary shoes I have ever owned. They age like an old friend.",
    name: "Sir Julian Ashcroft",
    role: "Barrister, London",
  },
  {
    quote:
      "Vellári fits like memory. Ten years in and the patina tells my story better than I could.",
    name: "Marco De Luca",
    role: "Concert Pianist, Milan",
  },
  {
    quote: "I have worn every house on Jermyn Street. None matches the weight of a Vellári welt.",
    name: "Henrik Solberg",
    role: "Architect, Oslo",
  },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader
          align="center"
          eyebrow="On the Record"
          title={
            <>
              Worn by those who <span className="italic">rarely speak</span>.
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass flex h-full flex-col p-8"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-serif text-xl italic leading-snug text-foreground">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-8 border-t border-border/60 pt-6">
                <div className="text-sm text-foreground">{r.name}</div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  {r.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bespoke() {
  return (
    <section
      id="bespoke"
      className="relative overflow-hidden border-t border-border bg-onyx py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <img
              src={bespokeImg}
              alt="Bespoke shoemaking consultation in a private atelier"
              loading="lazy"
              width={1400}
              height={1000}
              className="aspect-[7/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-onyx/60 via-transparent to-transparent" />
          </motion.div>
        </div>
        <div className="lg:col-span-6 lg:pl-8">
          <SectionHeader
            eyebrow="Bespoke Service"
            title={
              <>
                A pair, <span className="italic text-gold-gradient">only yours</span>.
              </>
            }
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Meet with a master fitter in Florence, London or New York. Choose your last, your
            leather, your welt. Take delivery of a pair no other man will ever wear — in nine to
            eleven months.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                icon: Scissors,
                title: "Measured Consultation",
                desc: "90-minute private fitting, complimentary.",
              },
              {
                icon: Sparkles,
                title: "Hand-Selection",
                desc: "Choose from 40+ hides and 12 signature lasts.",
              },
              {
                icon: Award,
                title: "Lifetime Care",
                desc: "Complimentary refurbishment for the life of the pair.",
              },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <b.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-serif text-lg text-foreground">{b.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-[0.28em] text-primary-foreground transition hover:brightness-110"
            style={{ boxShadow: "var(--shadow-gold)" }}
          >
            Reserve Your Fitting
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Florence",
    "·",
    "London",
    "·",
    "Milano",
    "·",
    "New York",
    "·",
    "Tokyo",
    "·",
    "Paris",
    "·",
  ];
  return (
    <div className="overflow-hidden border-y border-border py-8">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="mx-8 font-serif text-3xl italic text-muted-foreground md:text-5xl"
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-onyx pt-24 pb-10 grain">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="font-serif text-3xl text-foreground">
              Maison <span className="italic text-gold">Vellári</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Handcrafted formal shoes for gentlemen who lead. Florence, since 1927.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="mt-10 max-w-md"
            >
              <label className="eyebrow">The Ledger — Private Letters</label>
              <div className="mt-4 flex items-center border-b border-border/70 focus-within:border-gold">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@address.com"
                  className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold transition hover:brightness-125"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <div className="eyebrow">Maison</div>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {["Heritage", "Craft", "Bespoke", "Journal"].map((l) => (
                  <li key={l}>
                    <a href="#" className="transition hover:text-gold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Collection</div>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {["Oxford", "Derby", "Monk", "Loafer", "Boots"].map((l) => (
                  <li key={l}>
                    <a href="#" className="transition hover:text-gold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Ateliers</div>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>Via de' Tornabuoni 8, Firenze</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>+39 055 214 021</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>concierge@vellari.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border/60 pt-8 md:flex-row md:items-center">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Maison Vellári S.r.l. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            {[Instagram, Mail].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold"
              >
                <I className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const [selectedShoe, setSelectedShoe] = useState<ShoeProduct | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Collection onSelectShoe={(shoe) => setSelectedShoe(shoe)} />
      <BestSellers onSelectShoe={(shoe) => setSelectedShoe(shoe)} />
      <Craft />
      <Materials />
      <Heritage />
      <Testimonials />
      <Bespoke />
      <Marquee />
      <Footer />
      <ShoeDetailModal
        shoe={selectedShoe}
        isOpen={!!selectedShoe}
        onClose={() => setSelectedShoe(null)}
      />
    </main>
  );
}
