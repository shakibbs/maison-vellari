import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";

import shoeOxford from "@/assets/shoe-oxford.jpg";
import shoeDerby from "@/assets/shoe-derby.jpg";
import shoeMonk from "@/assets/shoe-monk.jpg";
import shoeLoafer from "@/assets/shoe-loafer.jpg";
import heritageImg from "@/assets/heritage.jpg";
import { ShoeDetailModal, type ShoeProduct } from "@/components/ShoeDetailModal";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — Maison Vellári" },
      {
        name: "description",
        content:
          "Explore the full Maison Vellári collection of handcrafted formal shoes — Oxfords, Derbies, Monks, Loafers and Boots, made by hand in Italy.",
      },
      { property: "og:title", content: "The Collection — Maison Vellári" },
      {
        property: "og:description",
        content:
          "A complete atelier of hand-lasted silhouettes in Italian calfskin, patent, suede and cordovan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});

type Category = "All" | "Oxford" | "Derby" | "Monk" | "Loafer" | "Boot";

const PRODUCTS: {
  name: string;
  code: string;
  category: Exclude<Category, "All">;
  material: string;
  price: string;
  img: string;
  tag?: string;
}[] = [
  {
    name: "Whole-cut Oxford",
    code: "N° 01",
    category: "Oxford",
    material: "Onyx Calfskin",
    price: "€2,480",
    img: shoeOxford,
    tag: "Signature",
  },
  {
    name: "Cap-toe Oxford",
    code: "N° 02",
    category: "Oxford",
    material: "Patent Noir",
    price: "€1,890",
    img: shoeOxford,
  },
  {
    name: "Opera Pump",
    code: "N° 03",
    category: "Oxford",
    material: "Patent · Grosgrain",
    price: "€2,890",
    img: shoeOxford,
    tag: "Evening",
  },
  {
    name: "Burnished Derby",
    code: "N° 04",
    category: "Derby",
    material: "Cognac Museum Calf",
    price: "€1,920",
    img: shoeDerby,
    tag: "Best-seller",
  },
  {
    name: "Plain Derby",
    code: "N° 05",
    category: "Derby",
    material: "Espresso Calfskin",
    price: "€1,690",
    img: shoeDerby,
  },
  {
    name: "Country Derby",
    code: "N° 06",
    category: "Derby",
    material: "Waxed Suede",
    price: "€1,780",
    img: shoeDerby,
  },
  {
    name: "Double Monk",
    code: "N° 07",
    category: "Monk",
    material: "Onyx Calfskin",
    price: "€2,150",
    img: shoeMonk,
    tag: "Signature",
  },
  {
    name: "Single Monk",
    code: "N° 08",
    category: "Monk",
    material: "Cognac Calfskin",
    price: "€1,940",
    img: shoeMonk,
  },
  {
    name: "Belgian Loafer",
    code: "N° 09",
    category: "Loafer",
    material: "Velvet Noir",
    price: "€1,480",
    img: shoeLoafer,
  },
  {
    name: "Tasselled Loafer",
    code: "N° 10",
    category: "Loafer",
    material: "Suede Tabac",
    price: "€1,540",
    img: shoeLoafer,
  },
  {
    name: "Penny Loafer",
    code: "N° 11",
    category: "Loafer",
    material: "Bordeaux Calf",
    price: "€1,620",
    img: shoeLoafer,
  },
  {
    name: "Chelsea Boot",
    code: "N° 12",
    category: "Boot",
    material: "Onyx Suede",
    price: "€2,240",
    img: shoeMonk,
    tag: "New",
  },
];

const CATEGORIES: Category[] = ["All", "Oxford", "Derby", "Monk", "Loafer", "Boot"];

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
          <Link to="/collection" className="text-gold transition">
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
          <Link to="/contact" className="transition hover:text-gold">
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
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="divider-gold opacity-40" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[0.7rem] uppercase tracking-[0.4em] text-gold"
        >
          The Atelier · Autumn MMXXVI
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]"
        >
          The <span className="italic text-gold">Collection</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Twelve silhouettes. One obsession. Each pair is hand-lasted over forty-eight hours in our
          Bologna atelier, in leathers cured for a season and finished by a single artisan from welt
          to patina.
        </motion.p>
      </div>
    </section>
  );
}

function Filters({
  active,
  onChange,
  count,
}: {
  active: Category;
  onChange: (c: Category) => void;
  count: number;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="divider-gold opacity-40" />
      <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {CATEGORIES.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => onChange(c)}
                className={`text-[0.72rem] uppercase tracking-[0.32em] transition ${
                  isActive ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
                {isActive && <span className="ml-2 inline-block h-px w-6 bg-gold align-middle" />}
              </button>
            );
          })}
        </div>
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground">
          {count} pairs · Made in Italy
        </p>
      </div>
      <div className="divider-gold opacity-40" />
    </div>
  );
}

function ProductCard({
  product,
  index,
  onSelect,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
  onSelect: (product: (typeof PRODUCTS)[number]) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
      className="group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative overflow-hidden rounded-sm border border-border/60 bg-secondary/40">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.img}
            alt={`${product.name} — ${product.material}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
        </div>
        {product.tag && (
          <span className="absolute left-4 top-4 rounded-full border border-gold/50 bg-background/60 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-gold backdrop-blur">
            {product.tag}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="pointer-events-auto absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between rounded-full border border-gold/50 bg-background/70 px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.3em] text-gold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer"
        >
          View Details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">{product.code}</p>
          <h3 className="mt-1 font-serif text-xl text-foreground group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.material}</p>
        </div>
        <p className="whitespace-nowrap font-serif text-lg text-foreground">{product.price}</p>
      </div>
    </motion.article>
  );
}

function Grid({
  items,
  onSelect,
}: {
  items: typeof PRODUCTS;
  onSelect: (product: (typeof PRODUCTS)[number]) => void;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProductCard key={p.code} product={p} index={i} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function BespokeStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <img
        src={heritageImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-10 md:py-28">
        <div className="max-w-xl">
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold">Bespoke</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Do not find your pair. <span className="italic text-gold">Commission it.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            A private audience with our master last-maker in Bologna, Paris, London or New York.
            Nine months, one pair, entirely yours.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex w-fit items-center gap-3 rounded-full border border-gold/50 bg-background/40 px-7 py-3 text-[0.72rem] uppercase tracking-[0.32em] text-gold backdrop-blur transition hover:bg-gold hover:text-primary-foreground"
        >
          Request an audience
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="font-serif text-3xl text-foreground">
              Maison <span className="italic text-gold">Vellári</span>
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Handcrafted formal shoes for the discerning gentleman. Made in Italy, one pair at a
              time, since 1897.
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">Ateliers</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-gold" /> Bologna · Via Farini 14
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-gold" /> Paris · Rue Saint-Honoré
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-gold" /> London · Savile Row
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold" /> atelier@vellari.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold" /> +39 051 000 1897
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-3.5 w-3.5 text-gold" /> @maisonvellari
              </li>
            </ul>
          </div>
        </div>
        <div className="divider-gold mt-16 opacity-40" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground md:flex-row">
          <p>© MMXXVI Maison Vellári · All rights reserved</p>
          <p>Crafted in Italy · Worn worldwide</p>
        </div>
      </div>
    </footer>
  );
}

function CollectionPage() {
  const [active, setActive] = useState<Category>("All");
  const [selectedShoe, setSelectedShoe] = useState<ShoeProduct | null>(null);
  const items = useMemo(
    () => (active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Filters active={active} onChange={setActive} count={items.length} />
        <div className="pt-14">
          <Grid items={items} onSelect={(shoe) => setSelectedShoe(shoe)} />
        </div>
        <BespokeStrip />
      </main>
      <Footer />
      <ShoeDetailModal
        shoe={selectedShoe}
        isOpen={!!selectedShoe}
        onClose={() => setSelectedShoe(null)}
      />
    </div>
  );
}
