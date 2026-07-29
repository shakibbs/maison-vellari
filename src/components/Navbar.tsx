import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const isCollection = pathname === "/collection";
  const isContact = pathname === "/contact";

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl tracking-wide text-foreground">
            Maison <span className="text-gold italic">Vellári</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.28em] text-muted-foreground md:flex">
          <Link
            to="/collection"
            className={`transition hover:text-gold ${isCollection ? "text-gold font-medium" : ""}`}
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
            className={`transition hover:text-gold ${isContact ? "text-gold font-medium" : ""}`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-gold transition hover:bg-gold hover:text-primary-foreground"
          >
            Reserve
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-primary-foreground"
          >
            Reserve
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-xs border-l border-border/80 bg-background/98 p-6 backdrop-blur-xl"
            >
              <SheetHeader className="text-left border-b border-border/60 pb-6">
                <SheetTitle asChild>
                  <Link to="/" onClick={closeMenu} className="inline-block">
                    <span className="font-serif text-2xl tracking-wide text-foreground">
                      Maison <span className="text-gold italic">Vellári</span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col justify-between h-[calc(100%-80px)] pt-8 pb-6">
                <nav className="flex flex-col gap-6 text-sm uppercase tracking-[0.25em]">
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
                </nav>

                <div className="pt-8 border-t border-border/60 flex flex-col gap-4">
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gold bg-gold/10 px-6 py-3 text-xs uppercase tracking-[0.25em] text-gold font-medium transition hover:bg-gold hover:text-primary-foreground"
                  >
                    Reserve Appointment
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground/60 text-center">
                    Paris · Milan · London · Tokyo
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="divider-gold opacity-40" />
      </div>
    </header>
  );
}
