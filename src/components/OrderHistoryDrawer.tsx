import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart, type Order } from "@/context/CartContext";
import {
  Clock,
  PackageCheck,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Smartphone,
  CreditCard,
  Truck,
  Building2,
} from "lucide-react";

export function OrderHistoryDrawer() {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders } = useCart();

  const handlePrintReceipt = (order: Order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = order.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 10px 0;">
          <strong>${item.shoe.name}</strong><br/>
          <span style="font-size: 12px; color: #888;">${item.size}, ${item.width} ${item.monogram ? `· Monogram: ${item.monogram}` : ""}</span>
        </td>
        <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; text-align: right;">${item.shoe.price}</td>
      </tr>
    `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${order.orderRef}</title>
          <style>
            body { font-family: 'Georgia', serif; background: #0a0a0a; color: #f5f5f5; padding: 40px; }
            .header { text-align: center; border-bottom: 1px solid #d4af37; padding-bottom: 20px; }
            .gold { color: #d4af37; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .footer { margin-top: 40px; border-top: 1px solid #333; pt: 20px; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>MAISON VELLÁRI</h2>
            <p class="gold" style="letter-spacing: 2px; font-size: 12px;">OFFICIAL ATELIER RECEIPT</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 14px;">
            <div>
              <p><strong>Order Reference:</strong> <span class="gold">${order.orderRef}</span></p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              <p><strong>Status:</strong> ${order.status}</p>
            </div>
            <div style="text-align: right;">
              <p><strong>Customer:</strong> ${order.customer.fullName}</p>
              <p><strong>Email:</strong> ${order.customer.email}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMode.toUpperCase()}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr style="border-bottom: 2px solid #d4af37; text-align: left;">
                <th style="padding: 10px 0;">Item Description</th>
                <th style="padding: 10px 0; text-align: center;">Qty</th>
                <th style="padding: 10px 0; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 20px;">
            <h3>Total Paid: <span class="gold">€${order.totalPrice.toLocaleString()}</span></h3>
          </div>

          <div class="footer">
            <p>Maison Vellári S.r.l. · Florence, Italy · Concierge Support: concierge@vellari.com</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Sheet open={isOrderHistoryOpen} onOpenChange={setIsOrderHistoryOpen}>
      <SheetContent side="right" className="w-[92vw] max-w-lg border-l border-border/80 bg-onyx p-6 backdrop-blur-2xl text-foreground flex flex-col justify-between overflow-y-auto">
        <div>
          <SheetHeader className="text-left border-b border-border/60 pb-5">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-serif text-2xl tracking-wide text-foreground flex items-center gap-3">
                <PackageCheck className="h-5 w-5 text-gold" />
                Atelier Order Ledger
              </SheetTitle>
              <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>
          </SheetHeader>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-gold/30 bg-charcoal/50 text-gold/60 mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl text-foreground">No Placed Orders Found</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-xs">
                Your completed handcrafted footwear orders will be recorded here with live craft status and itemized receipts.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {orders.map((order) => (
                <div
                  key={order.orderRef}
                  className="rounded-xl border border-border/60 bg-charcoal/40 p-5 space-y-4 relative transition hover:border-gold/40 shadow-lg"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between border-b border-border/40 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-gold">
                          {order.orderRef}
                        </span>
                        <span className="rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-[0.62rem] font-medium uppercase tracking-wider text-gold flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-1 text-[0.68rem] text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePrintReceipt(order)}
                      className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-gold hover:bg-gold hover:text-primary-foreground transition cursor-pointer"
                      title="Print Official Atelier Receipt"
                    >
                      <Printer className="h-3 w-3" />
                      Receipt
                    </button>
                  </div>

                  {/* Purchased Items List */}
                  <div className="space-y-3">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Purchased Footwear ({order.items.length} {order.items.length === 1 ? "Pair" : "Pairs"})
                    </span>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center rounded-lg bg-onyx/80 p-2.5 border border-border/40">
                        <img
                          src={item.shoe.img}
                          alt={item.shoe.name}
                          className="h-12 w-16 object-cover rounded bg-charcoal shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h5 className="font-serif text-sm text-foreground truncate font-medium">
                              {item.shoe.name}
                            </h5>
                            <span className="font-serif text-xs text-gold font-medium ml-2 shrink-0">
                              {item.shoe.price}
                            </span>
                          </div>
                          <div className="mt-0.5 flex flex-wrap gap-1.5 text-[0.65rem] text-muted-foreground">
                            <span>Qty: {item.quantity}</span>
                            <span>·</span>
                            <span>{item.size}</span>
                            <span>·</span>
                            <span>{item.width}</span>
                            {item.monogram && (
                              <span className="text-gold font-medium flex items-center gap-0.5">
                                <Sparkles className="h-2 w-2" />
                                Monogram: {item.monogram}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Shipping Summary */}
                  <div className="rounded-lg bg-onyx/50 p-3 text-[0.7rem] space-y-1.5 border border-border/40">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {order.paymentMode === "card" ? (
                          <CreditCard className="h-3 w-3 text-gold" />
                        ) : (
                          <Smartphone className="h-3 w-3 text-gold" />
                        )}
                        Payment ({order.paymentMode.toUpperCase()}):
                      </span>
                      <span className="text-foreground font-medium">
                        {order.paymentDetails.trxId ? `TrxID: ${order.paymentDetails.trxId}` : "Paid & Verified"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {order.shippingMode === "courier" ? (
                          <Truck className="h-3 w-3 text-gold" />
                        ) : (
                          <Building2 className="h-3 w-3 text-gold" />
                        )}
                        Delivery Method:
                      </span>
                      <span className="text-foreground capitalize truncate max-w-[200px]">
                        {order.shippingMode === "courier" ? "Worldwide Express Courier" : order.customer.atelierCity}
                      </span>
                    </div>

                    <div className="border-t border-border/40 pt-1.5 flex justify-between items-center text-xs font-semibold">
                      <span className="text-foreground font-serif">Total Order Amount</span>
                      <span className="text-gold font-serif text-sm font-medium">
                        €{order.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
