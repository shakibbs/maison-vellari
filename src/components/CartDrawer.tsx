import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, Sparkles, PackageCheck } from "lucide-react";

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsOrderHistoryOpen,
    orders,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOpenOrders = () => {
    setIsCartOpen(false);
    setIsOrderHistoryOpen(true);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-[90vw] max-w-md border-l border-border/80 bg-onyx p-6 backdrop-blur-2xl text-foreground flex flex-col justify-between">
        <div>
          <SheetHeader className="text-left border-b border-border/60 pb-5">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-serif text-2xl tracking-wide text-foreground flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gold" />
                Atelier Bag
              </SheetTitle>

              <div className="flex items-center gap-2">
                {orders.length > 0 && (
                  <button
                    type="button"
                    onClick={handleOpenOrders}
                    className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.15em] text-gold hover:bg-gold hover:text-primary-foreground transition cursor-pointer"
                    title="View Past Placed Orders"
                  >
                    <PackageCheck className="h-3 w-3" />
                    Ledger ({orders.length})
                  </button>
                )}

                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold">
                  {totalItems} {totalItems === 1 ? "Pair" : "Pairs"}
                </span>
              </div>
            </div>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-gold/30 bg-charcoal/50 text-gold/60 mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl text-foreground">Your Bag is Empty</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-xs">
                Explore our handcrafted footwear silhouettes and select your bespoke specifications to add to your bag.
              </p>
              {orders.length > 0 && (
                <button
                  type="button"
                  onClick={handleOpenOrders}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-primary-foreground transition cursor-pointer"
                >
                  <PackageCheck className="h-3.5 w-3.5" />
                  View Past Placed Orders ({orders.length})
                </button>
              )}
            </div>
          ) : (
            <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border border-border/40 bg-charcoal/40 p-4 relative group transition hover:border-gold/30"
                >
                  <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md bg-onyx">
                    <img
                      src={item.shoe.img}
                      alt={item.shoe.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-foreground font-medium">
                          {item.shoe.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-red-400 transition cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[0.7rem] text-muted-foreground">
                        <span className="rounded bg-onyx/80 px-1.5 py-0.5 border border-border/50">
                          {item.size}
                        </span>
                        <span className="rounded bg-onyx/80 px-1.5 py-0.5 border border-border/50">
                          {item.width}
                        </span>
                        {item.monogram && (
                          <span className="rounded bg-gold/15 px-1.5 py-0.5 border border-gold/40 text-gold font-medium flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5" />
                            Initials: {item.monogram}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border/60 rounded bg-onyx">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm text-gold font-medium">
                        {item.shoe.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-border/60 pt-5 space-y-4 bg-onyx">
            <div className="rounded-lg border border-gold/30 bg-gold/5 p-3 text-[0.7rem] text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
              <span>
                Includes complimentary handcrafted wooden shoe trees & express worldwide delivery.
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span className="text-foreground font-serif text-sm font-medium">
                  €{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Express Courier Shipping</span>
                <span className="text-gold uppercase tracking-wider text-[0.65rem]">Complimentary</span>
              </div>
              <div className="border-t border-border/50 pt-2 flex justify-between items-center text-sm font-semibold">
                <span className="text-foreground font-serif text-base">Total Price</span>
                <span className="text-gold font-serif text-xl font-medium">
                  €{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:brightness-110 cursor-pointer"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <span>Proceed to Checkout</span>
              <span className="font-mono text-[0.75rem] bg-primary-foreground/20 px-2 py-0.5 rounded">
                €{totalPrice.toLocaleString()}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
