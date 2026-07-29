import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, ShoppingBag, PackageCheck, Lock } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useAdminAuth } from "@/context/AdminAuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const { totalItems, totalPrice, setIsCartOpen, setIsOrderHistoryOpen, orders } = useCart();
  const { isAuthenticated } = useAdminAuth();

  const isCollection = pathname === "/collection";
  const isContact = pathname === "/contact";
  const isAdmin = pathname.startsWith("/admin");

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Left: Brand Logo */}
        <Link to="/" className="inline-block group shrink-0">
          <span className="font-serif text-2xl tracking-wide text-foreground group-hover:text-gold transition-colors">
            Maison <span className="text-gold italic font-normal">Vellári</span>
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[0.72rem] uppercase tracking-[0.25em] text-muted-foreground">
          <Link
            to="/collection"
            className={`transition hover:text-gold ${isCollection ? "text-gold font-semibold" : ""}`}
          >
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
          <Link
            to="/contact"
            className={`transition hover:text-gold ${isContact ? "text-gold font-semibold" : ""}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Actions & Utility Controls */}
        <div className="flex items-center gap-3">
          {/* Admin Icon Button (Opens in separate standalone window) */}
          <Link
            to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:grid h-9 w-9 place-items-center rounded-full border transition cursor-pointer ${
              isAdmin
                ? "border-gold bg-gold/15 text-gold"
                : "border-border/60 bg-onyx text-muted-foreground hover:border-gold/40 hover:text-gold"
            }`}
            title="Open Master Atelier Admin Console in New Window"
          >
            <Lock className="h-3.5 w-3.5" />
          </Link>

          {/* Orders Ledger Icon (shown if orders exist) */}
          {orders.length > 0 && (
            <button
              type="button"
              onClick={() => setIsOrderHistoryOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-primary-foreground cursor-pointer"
              title="View your Atelier Order Ledger"
            >
              <PackageCheck className="h-3.5 w-3.5" />
              <span>Ledger ({orders.length})</span>
            </button>
          )}

          {/* Atelier Bag Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full border border-gold/40 bg-onyx/80 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-gold transition hover:bg-gold/15 hover:border-gold cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <div className="flex items-center gap-1 font-mono text-[0.65rem] text-gold font-bold">
              <span className="grid h-4 min-w-4 px-1 place-items-center rounded-full bg-gold text-[0.6rem] font-bold text-primary-foreground">
                {totalItems}
              </span>
              {totalPrice > 0 && <span className="hidden sm:inline">· €{totalPrice.toLocaleString()}</span>}
            </div>
          </button>

          {/* Reserve Fitting CTA */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-primary-foreground font-medium transition hover:brightness-110 shadow-sm"
          >
            Reserve
            <ArrowUpRight className="h-3 w-3" />
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition hover:text-gold focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-xs border-l border-border/80 bg-onyx/98 p-6 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="text-left border-b border-border/60 pb-6">
                    <SheetTitle asChild>
                      <Link to="/" onClick={closeMenu} className="inline-block">
                        <span className="font-serif text-2xl tracking-wide text-foreground">
                          Maison <span className="text-gold italic">Vellári</span>
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="mt-8 flex flex-col gap-5 text-xs uppercase tracking-[0.25em]">
                    <Link
                      to="/collection"
                      onClick={closeMenu}
                      className={`transition hover:text-gold py-1 ${
                        isCollection ? "text-gold font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      Collection
                    </Link>
                    <Link
                      to="/"
                      hash="craft"
                      onClick={closeMenu}
                      className="text-muted-foreground transition hover:text-gold py-1"
                    >
                      Craft
                    </Link>
                    <Link
                      to="/"
                      hash="heritage"
                      onClick={closeMenu}
                      className="text-muted-foreground transition hover:text-gold py-1"
                    >
                      Heritage
                    </Link>
                    <Link
                      to="/"
                      hash="bespoke"
                      onClick={closeMenu}
                      className="text-muted-foreground transition hover:text-gold py-1"
                    >
                      Bespoke
                    </Link>
                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className={`transition hover:text-gold py-1 ${
                        isContact ? "text-gold font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      Contact
                    </Link>

                    <div className="my-2 h-px w-full bg-border/50" />

                    {orders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          closeMenu();
                          setIsOrderHistoryOpen(true);
                        }}
                        className="text-left text-gold font-medium transition hover:brightness-125 py-1 flex items-center gap-2 cursor-pointer"
                      >
                        <PackageCheck className="h-4 w-4" />
                        My Order Ledger ({orders.length})
                      </button>
                    )}

                    <Link
                      to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="text-muted-foreground hover:text-gold transition py-1 flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4 text-gold" />
                      Atelier Admin Console ↗
                    </Link>
                  </nav>
                </div>

                <div className="pt-6 border-t border-border/60 flex flex-col gap-3 text-center">
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground font-semibold shadow-md transition hover:brightness-110"
                  >
                    Reserve Fitting
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <p className="text-[0.62rem] uppercase tracking-widest text-muted-foreground/60">
                    Florence · Paris · London · New York
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="divider-gold opacity-40" />
      </div>
    </header>
  );
}
