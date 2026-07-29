import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart, type Order } from "@/context/CartContext";
import {
  CheckCircle2,
  CreditCard,
  Truck,
  Building2,
  ArrowRight,
  Smartphone,
  ShieldCheck,
  QrCode,
  Printer,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    totalPrice,
    placeOrder,
    lastOrder,
    setIsOrderHistoryOpen,
  } = useCart();

  const [step, setStep] = React.useState<"details" | "confirmation">("details");
  const [shippingMode, setShippingMode] = React.useState<"courier" | "atelier">("courier");
  const [paymentMode, setPaymentMode] = React.useState<"card" | "bkash" | "nagad" | "rocket">("card");
  const [confirmedOrder, setConfirmedOrder] = React.useState<Order | null>(null);

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Bangladesh",
    atelierCity: "Florence Atelier (Via de' Tornabuoni 8)",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    mobileAccount: "",
    trxId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => {
      setStep("details");
    }, 300);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const createdOrder = placeOrder({
      items: cartItems,
      totalPrice,
      shippingMode,
      paymentMode,
      paymentDetails: {
        cardNumber: formData.cardNumber ? `•••• ${formData.cardNumber.slice(-4)}` : undefined,
        mobileAccount: formData.mobileAccount,
        trxId: formData.trxId,
      },
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        atelierCity: formData.atelierCity,
      },
    });

    setConfirmedOrder(createdOrder);

    toast.success("Order Placed & Recorded Successfully", {
      description: `Reference ${createdOrder.orderRef}. Saved to your Atelier Order Ledger.`,
    });

    setStep("confirmation");
  };

  const handlePrintReceipt = () => {
    if (!confirmedOrder) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = confirmedOrder.items
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
          <title>Receipt - ${confirmedOrder.orderRef}</title>
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
              <p><strong>Order Reference:</strong> <span class="gold">${confirmedOrder.orderRef}</span></p>
              <p><strong>Date:</strong> ${new Date(confirmedOrder.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <div style="text-align: right;">
              <p><strong>Customer:</strong> ${confirmedOrder.customer.fullName}</p>
              <p><strong>Email:</strong> ${confirmedOrder.customer.email}</p>
              <p><strong>Payment Method:</strong> ${confirmedOrder.paymentMode.toUpperCase()}</p>
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
            <h3>Total Paid: <span class="gold">€${confirmedOrder.totalPrice.toLocaleString()}</span></h3>
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

  const currentReceipt = confirmedOrder || lastOrder;

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto border-border/80 bg-onyx p-6 md:p-8 text-foreground shadow-2xl sm:rounded-xl">
        {step === "details" ? (
          <div>
            <DialogHeader className="text-left border-b border-border/60 pb-4">
              <span className="eyebrow">Private Concierge Checkout</span>
              <DialogTitle className="font-serif text-2xl text-foreground">
                Acquire Your Handcrafted Pair
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Complete your details below for complimentary express courier delivery or flagship atelier pickup.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
              {/* Items Summary Header */}
              <div className="rounded-lg border border-border/50 bg-charcoal/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                  Order Breakdown ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
                </div>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.shoe.name}</span>
                        <span className="text-muted-foreground">
                          ({item.size}, {item.width}) {item.monogram ? `· Monogram: ${item.monogram}` : ""}
                        </span>
                      </div>
                      <span className="font-serif text-gold">{item.shoe.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-border/40 pt-2 flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-gold font-serif text-base">€{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Preference */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Delivery Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShippingMode("courier")}
                    className={`flex items-center gap-3 rounded-lg border p-3 text-left transition cursor-pointer ${
                      shippingMode === "courier"
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border/60 bg-onyx text-muted-foreground hover:border-gold/40"
                    }`}
                  >
                    <Truck className="h-4 w-4 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-foreground">Express Courier</div>
                      <div className="text-[0.65rem] opacity-80">Complimentary Worldwide</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMode("atelier")}
                    className={`flex items-center gap-3 rounded-lg border p-3 text-left transition cursor-pointer ${
                      shippingMode === "atelier"
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border/60 bg-onyx text-muted-foreground hover:border-gold/40"
                    }`}
                  >
                    <Building2 className="h-4 w-4 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-foreground">Atelier Fitting Pickup</div>
                      <div className="text-[0.65rem] opacity-80">Florence / London / NYC</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.7rem] text-muted-foreground mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Lord Julian Ashcroft"
                      className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.7rem] text-muted-foreground mb-1">Concierge Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ashcroft@domain.com"
                      className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.7rem] text-muted-foreground mb-1">Phone / Mobile</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+880 1712-345678"
                    className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                  />
                </div>

                {shippingMode === "courier" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[0.7rem] text-muted-foreground mb-1">Delivery Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street Address / Residence"
                        className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.7rem] text-muted-foreground mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Dhaka / London / Milan"
                          className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.7rem] text-muted-foreground mb-1">Country</label>
                        <input
                          type="text"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Bangladesh"
                          className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[0.7rem] text-muted-foreground mb-1">Select Atelier Flagship</label>
                    <select
                      name="atelierCity"
                      value={formData.atelierCity}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                    >
                      <option value="Florence Atelier (Via de' Tornabuoni 8)">Florence Atelier (Via de' Tornabuoni 8, Italy)</option>
                      <option value="London Atelier (Jermyn Street 42)">London Atelier (42 Jermyn St, St James's)</option>
                      <option value="New York Atelier (Madison Ave 740)">New York Atelier (740 Madison Ave, NY)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Payment Method Options */}
              <div className="space-y-3">
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Payment Method
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "card", label: "Card", sub: "Credit / Debit", icon: CreditCard, accent: "border-gold text-gold" },
                    { id: "bkash", label: "bKash", sub: "Mobile Banking", icon: Smartphone, accent: "border-pink-500 text-pink-400" },
                    { id: "nagad", label: "Nagad", sub: "Mobile Banking", icon: Smartphone, accent: "border-amber-500 text-amber-400" },
                    { id: "rocket", label: "Rocket", sub: "Mobile Banking", icon: Smartphone, accent: "border-purple-500 text-purple-400" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMode(p.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition cursor-pointer ${
                        paymentMode === p.id
                          ? `${p.accent} bg-gold/15 font-semibold shadow-sm`
                          : "border-border/60 bg-onyx text-muted-foreground hover:border-gold/40 hover:text-foreground"
                      }`}
                    >
                      <p.icon className="h-4 w-4 mb-1" />
                      <span className="text-xs font-medium">{p.label}</span>
                      <span className="text-[0.6rem] opacity-70 mt-0.5">{p.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Dynamic Payment Details Inputs */}
                {paymentMode === "card" && (
                  <div className="rounded-lg border border-border/50 bg-charcoal/30 p-4 space-y-3 text-xs animate-in fade-in-50">
                    <div className="flex items-center justify-between text-gold text-[0.7rem] font-medium uppercase tracking-wider">
                      <span>Card Details</span>
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] text-muted-foreground mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4532 ···· ···· 8901"
                        className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.68rem] text-muted-foreground mb-1">Expiration</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          required
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.68rem] text-muted-foreground mb-1">CVC / CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          name="cardCvc"
                          required
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="•••"
                          className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(paymentMode === "bkash" || paymentMode === "nagad" || paymentMode === "rocket") && (
                  <div className="rounded-lg border border-border/50 bg-charcoal/30 p-4 space-y-3 text-xs animate-in fade-in-50">
                    <div className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-wider">
                      <span className={
                        paymentMode === "bkash"
                          ? "text-pink-400"
                          : paymentMode === "nagad"
                          ? "text-amber-400"
                          : "text-purple-400"
                      }>
                        {paymentMode.toUpperCase()} Merchant Payment
                      </span>
                      <QrCode className="h-4 w-4 text-gold" />
                    </div>

                    <div className="rounded border border-gold/30 bg-onyx p-3 text-[0.7rem] text-muted-foreground space-y-1">
                      <div className="flex justify-between text-foreground">
                        <span>Official Merchant Number:</span>
                        <span className="font-mono text-gold font-bold">01700-192700</span>
                      </div>
                      <p>
                        Please Send Money or Make Payment to the Merchant Number above, then enter your Mobile Number and Transaction ID below.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.68rem] text-muted-foreground mb-1">
                          Your {paymentMode.toUpperCase()} Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="mobileAccount"
                          required
                          value={formData.mobileAccount}
                          onChange={handleInputChange}
                          placeholder="017XXXXXXXX"
                          className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.68rem] text-muted-foreground mb-1">Transaction ID (TrxID)</label>
                        <input
                          type="text"
                          name="trxId"
                          required
                          value={formData.trxId}
                          onChange={handleInputChange}
                          placeholder="e.g. 9J28A109"
                          className="w-full rounded-md border border-border/60 bg-onyx px-3 py-2 font-mono text-xs uppercase tracking-wider text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:brightness-110 cursor-pointer"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <span>Confirm Order & Pay €{totalPrice.toLocaleString()}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen with Full Itemized Receipt */
          <div className="py-4 text-center space-y-5 animate-in fade-in-50">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <span className="eyebrow">Order Placed & Recorded</span>
              <h2 className="mt-1 font-serif text-2xl text-foreground">
                Thank You, {currentReceipt?.customer.fullName || "Gentleman"}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Order Ref: <strong className="text-gold font-mono">{currentReceipt?.orderRef}</strong> · Saved to your Atelier Ledger
              </p>
            </div>

            {/* Rich Itemized Receipt Card */}
            {currentReceipt && (
              <div className="rounded-xl border border-border/60 bg-charcoal/40 p-4 text-left text-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="font-semibold uppercase tracking-wider text-gold">
                    Itemized Order Receipt
                  </span>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    {new Date(currentReceipt.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Items Breakdown */}
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {currentReceipt.items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center rounded-lg bg-onyx/80 p-2 border border-border/40">
                      <img
                        src={item.shoe.img}
                        alt={item.shoe.name}
                        className="h-10 w-12 object-cover rounded bg-charcoal shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <span className="font-serif font-medium text-foreground truncate">{item.shoe.name}</span>
                          <span className="font-serif text-gold font-medium ml-2">{item.shoe.price}</span>
                        </div>
                        <div className="text-[0.65rem] text-muted-foreground flex gap-2">
                          <span>Size: {item.size}</span>
                          <span>Fit: {item.width}</span>
                          {item.monogram && (
                            <span className="text-gold font-medium flex items-center gap-0.5">
                              <Sparkles className="h-2 w-2" />
                              Initials: {item.monogram}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment & Customer Summary */}
                <div className="space-y-1.5 pt-2 border-t border-border/40 text-[0.7rem] text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Payment Gateway:</span>
                    <span className="text-foreground font-medium uppercase">
                      {currentReceipt.paymentMode} {currentReceipt.paymentDetails.trxId ? `(TrxID: ${currentReceipt.paymentDetails.trxId})` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Option:</span>
                    <span className="text-foreground capitalize">
                      {currentReceipt.shippingMode === "courier" ? "Express Courier" : currentReceipt.customer.atelierCity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concierge Email:</span>
                    <span className="text-foreground">{currentReceipt.customer.email}</span>
                  </div>
                  <div className="border-t border-border/40 pt-1.5 flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Total Paid:</span>
                    <span className="text-gold font-serif text-sm">€{currentReceipt.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-gold hover:bg-gold/15 transition cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                Print Receipt
              </button>

              <button
                type="button"
                onClick={() => {
                  handleClose();
                  setIsOrderHistoryOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-gold hover:bg-gold hover:text-primary-foreground transition cursor-pointer"
              >
                <PackageCheck className="h-3.5 w-3.5" />
                View All My Orders
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground hover:brightness-110 transition cursor-pointer"
              >
                Return to Maison
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
