import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Clock,
  Heart,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export interface ShoeProduct {
  name: string;
  code?: string;
  category?: string;
  material?: string;
  price: string;
  img: string;
  tag?: string;
  sub?: string;
  description?: string;
}

interface ShoeDetailModalProps {
  shoe: ShoeProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const SIZES = ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"];
const WIDTHS = ["Standard (D)", "Wide (EE)"];

export function ShoeDetailModal({ shoe, isOpen, onClose }: ShoeDetailModalProps) {
  const [selectedSize, setSelectedSize] = React.useState<string>("EU 42");
  const [selectedWidth, setSelectedWidth] = React.useState<string>("Standard (D)");
  const [monogram, setMonogram] = React.useState<string>("");
  const [isSaved, setIsSaved] = React.useState<boolean>(false);

  const { addToCart, setIsCheckoutOpen } = useCart();

  React.useEffect(() => {
    if (shoe) {
      setSelectedSize("EU 42");
      setSelectedWidth("Standard (D)");
      setMonogram("");
      setIsSaved(false);
    }
  }, [shoe]);

  if (!shoe) return null;

  const codeDisplay = shoe.code ? shoe.code : "N° 01";
  const categoryDisplay = shoe.category || shoe.sub || "Bespoke Formal";
  const materialDisplay = shoe.material || shoe.tag || "Italian Full-Grain Leather";
  const descriptionText =
    shoe.description ||
    `Handcrafted in our Florentine atelier using centuries-old lasting techniques. Each pair undergoes 212 meticulous hand operations, featuring a hand-carved wooden last, oak-bark tanned leather soles, and hand-burnished patinas created layer by layer.`;

  const handleAddToCart = () => {
    addToCart(shoe, selectedSize, selectedWidth, monogram);
    toast.success(`Added ${shoe.name} to Atelier Bag`, {
      description: `Size ${selectedSize} (${selectedWidth}) ${monogram ? `· Initials: ${monogram.toUpperCase()}` : ""}`,
    });
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(shoe, selectedSize, selectedWidth, monogram);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleToggleWishlist = () => {
    setIsSaved(!isSaved);
    toast(isSaved ? "Removed from Wishlist" : "Saved to Wishlist", {
      description: `${shoe.name} has been ${isSaved ? "removed from" : "added to"} your curated collection.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-border/80 bg-onyx p-0 text-foreground shadow-2xl sm:rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Image Showcase */}
          <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-charcoal/80 p-6 md:col-span-6 md:min-h-[480px]">
            {/* Background spotlight */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-black/60" />

            {/* Tag Badge */}
            <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/40 bg-onyx/80 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                {codeDisplay}
              </span>
              {shoe.tag && (
                <span className="rounded-full border border-primary-foreground/20 bg-gold/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                  {shoe.tag}
                </span>
              )}
            </div>

            {/* Image */}
            <div className="relative z-10 w-full max-w-md transition-transform duration-500 hover:scale-105">
              <img
                src={shoe.img}
                alt={shoe.name}
                className="h-auto max-h-[360px] w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Craft Origin */}
            <div className="relative z-10 mt-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span>Florentine Atelier · Hand-Welted</span>
            </div>
          </div>

          {/* Right: Details & Customization */}
          <div className="flex flex-col p-6 md:col-span-6 md:p-8">
            <DialogHeader className="p-0 text-left">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">{categoryDisplay}</span>
                <button
                  onClick={handleToggleWishlist}
                  className={`rounded-full p-2 transition ${
                    isSaved
                      ? "text-red-500 hover:bg-red-500/10"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                </button>
              </div>
              <DialogTitle className="font-serif text-2xl tracking-wide text-foreground md:text-3xl">
                {shoe.name}
              </DialogTitle>
              <DialogDescription className="mt-1 font-serif text-xl font-light text-gold">
                {shoe.price}
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 h-px w-full bg-border/50" />

            {/* Description */}
            <p className="text-xs leading-relaxed text-muted-foreground/90 font-light">
              {descriptionText}
            </p>

            {/* Specification Grid */}
            <div className="my-4 rounded-lg border border-border/40 bg-charcoal/40 p-3 text-[0.72rem]">
              <div className="grid grid-cols-2 gap-y-1.5">
                <div>
                  <span className="text-muted-foreground">Material:</span>
                  <p className="font-medium text-foreground">{materialDisplay}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Construction:</span>
                  <p className="font-medium text-foreground">Goodyear Hand-Welted</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Sole:</span>
                  <p className="font-medium text-foreground">Oak-Bark Tanned Leather</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Crafting Time:</span>
                  <p className="font-medium text-foreground">60+ Hours Artisan Work</p>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium uppercase tracking-wider text-muted-foreground">
                  Select Size
                </span>
                <span className="text-[0.7rem] text-gold/80 hover:underline cursor-pointer">
                  Bespoke Fit Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border py-2 text-center text-xs font-medium transition cursor-pointer ${
                      selectedSize === size
                        ? "border-gold bg-gold/15 text-gold shadow-sm"
                        : "border-border/60 bg-onyx text-muted-foreground hover:border-gold/40 hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Width Selector */}
            <div className="mt-3 space-y-1.5">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Fitting Width
              </span>
              <div className="flex gap-2">
                {WIDTHS.map((width) => (
                  <button
                    key={width}
                    type="button"
                    onClick={() => setSelectedWidth(width)}
                    className={`flex-1 rounded-md border py-2 text-center text-xs font-medium transition cursor-pointer ${
                      selectedWidth === width
                        ? "border-gold bg-gold/15 text-gold shadow-sm"
                        : "border-border/60 bg-onyx text-muted-foreground hover:border-gold/40 hover:text-foreground"
                    }`}
                  >
                    {width}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Monogram Field */}
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-gold" />
                  Bespoke Hot-Stamped Monogram
                </span>
                <span className="text-[0.65rem] text-gold uppercase tracking-wider">Complimentary</span>
              </div>
              <input
                type="text"
                maxLength={3}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                placeholder="Initials (e.g. J.A.)"
                className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs font-medium uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-md border border-gold bg-gold/10 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-primary-foreground cursor-pointer"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add to Bag
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 rounded-md bg-gold py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-md transition hover:brightness-110 cursor-pointer"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  Acquire Now
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[0.68rem] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  Lifetime Warranty
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  Made-to-Order Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
