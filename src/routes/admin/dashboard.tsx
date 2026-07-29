import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PackageCheck,
  TrendingUp,
  Clock,
  Smartphone,
  CreditCard,
  Printer,
  LogOut,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Lock,
  ExternalLink,
  ShieldCheck,
  LayoutDashboard,
  Boxes,
  Users,
  Plus,
  FileSpreadsheet,
  Check,
  X,
  Eye,
  MessageSquarePlus,
  AlertTriangle,
  Edit2,
  Trash2,
  Layers,
  Sparkle,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useCart, type Order, type CatalogShoe } from "@/context/CartContext";

import shoeOxford from "@/assets/shoe-oxford.jpg";
import shoeDerby from "@/assets/shoe-derby.jpg";
import shoeMonk from "@/assets/shoe-monk.jpg";
import shoeLoafer from "@/assets/shoe-loafer.jpg";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Atelier Dashboard — Maison Vellári" },
      { name: "description", content: "Atelier Order Management & Concierge Console" },
    ],
  }),
  component: AdminDashboardPage,
});

const STATUS_OPTIONS: Order["status"][] = [
  "Crafting in Atelier",
  "Hand-Welting",
  "Quality Inspection",
  "Dispatched",
];

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  date: string;
  status: "Confirmed" | "Pending" | "Completed";
}

const INITIAL_FITTINGS: Appointment[] = [
  {
    id: "fit-1",
    name: "Lord Julian Ashcroft",
    email: "ashcroft@domain.com",
    phone: "+44 20 7946 0912",
    city: "London Atelier (Jermyn St)",
    date: "Aug 12, 2026 at 14:00",
    status: "Confirmed",
  },
  {
    id: "fit-2",
    name: "Marco De Luca",
    email: "deluca@milan.it",
    phone: "+39 02 8821",
    city: "Florence Atelier (Via de' Tornabuoni)",
    date: "Aug 14, 2026 at 11:30",
    status: "Pending",
  },
];

function AdminDashboardPage() {
  const { isAuthenticated, logout, adminEmail, isMounted } = useAdminAuth();
  const {
    orders,
    updateOrderStatus,
    togglePaymentVerified,
    addOrderNote,
    catalogProducts,
    addCatalogProduct,
    updateCatalogProduct,
    deleteCatalogProduct,
  } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"orders" | "payments" | "catalog" | "fittings" | "materials">("orders");

  // Inspection Drawer State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newNoteInput, setNewNoteInput] = useState("");

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingShoe, setEditingShoe] = useState<CatalogShoe | null>(null);
  const [shoeForm, setShoeForm] = useState({
    name: "",
    category: "",
    price: "",
    material: "",
    img: shoeOxford,
    section: "Core Collection" as CatalogShoe["section"],
    status: "Active in Production" as CatalogShoe["status"],
  });

  // Appointments State
  const [fittingsList, setFittingsList] = useState<Appointment[]>(INITIAL_FITTINGS);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Florence Atelier (Via de' Tornabuoni 8)",
    date: "",
  });

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isMounted, isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.info("Logged Out", { description: "Admin session ended securely." });
    navigate({ to: "/admin/login" });
  };

  // Static sample orders to avoid SSR hydration mismatch
  const displayOrders = useMemo(() => {
    if (orders.length > 0) return orders;

    const sampleOrders: Order[] = [
      {
        orderRef: "MV-2026-98412",
        createdAt: "2026-07-29T18:00:00.000Z",
        totalPrice: 4170,
        shippingMode: "courier",
        paymentMode: "bkash",
        paymentDetails: { mobileAccount: "01711-889922", trxId: "9J28A109" },
        status: "Crafting in Atelier",
        paymentVerified: true,
        internalNotes: ["Payment confirmed via bKash Merchant API.", "Lasting assigned to Master Alessandro."],
        customer: {
          fullName: "Sir Julian Ashcroft",
          email: "ashcroft@domain.com",
          phone: "+880 1711-889922",
          address: "Road 12, Gulshan 2",
          city: "Dhaka",
          country: "Bangladesh",
        },
        items: [
          {
            id: "oxford-42-std-ja",
            shoe: {
              name: "The Oxford",
              price: "€2,480",
              img: shoeOxford,
              category: "Cap-toe · Patent",
            },
            size: "EU 42",
            width: "Standard (D)",
            monogram: "J.A.",
            quantity: 1,
          },
          {
            id: "derby-42-std",
            shoe: {
              name: "The Derby",
              price: "€1,690",
              img: shoeDerby,
              category: "Burnished · Cognac",
            },
            size: "EU 42",
            width: "Standard (D)",
            monogram: "",
            quantity: 1,
          },
        ],
      },
      {
        orderRef: "MV-2026-91204",
        createdAt: "2026-07-28T14:00:00.000Z",
        totalPrice: 2150,
        shippingMode: "atelier",
        paymentMode: "card",
        paymentDetails: { cardNumber: "•••• 4891" },
        status: "Hand-Welting",
        paymentVerified: true,
        internalNotes: ["Card authorized via Stripe Florence."],
        customer: {
          fullName: "Marco De Luca",
          email: "deluca@milan.it",
          phone: "+39 02 8821",
          atelierCity: "Florence Atelier (Via de' Tornabuoni 8)",
        },
        items: [
          {
            id: "monk-43-std",
            shoe: {
              name: "The Monk",
              price: "€2,150",
              img: shoeMonk,
              category: "Double Buckle",
            },
            size: "EU 43",
            width: "Standard (D)",
            monogram: "M.D.",
            quantity: 1,
          },
        ],
      },
    ];

    return sampleOrders;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return displayOrders.filter((order) => {
      const matchesSearch =
        order.orderRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.paymentDetails.trxId && order.paymentDetails.trxId.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPayment =
        filterPayment === "all" ? true : order.paymentMode === filterPayment;

      return matchesSearch && matchesPayment;
    });
  }, [displayOrders, searchTerm, filterPayment]);

  const totalRevenue = useMemo(() => {
    return displayOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  }, [displayOrders]);

  const totalPairsCount = useMemo(() => {
    return displayOrders.reduce(
      (sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0),
      0
    );
  }, [displayOrders]);

  // Sectioned Catalog Shoes
  const coreCollectionShoes = useMemo(() => {
    return catalogProducts.filter((s) => s.section === "Core Collection" || !s.section);
  }, [catalogProducts]);

  const bestSellerShoes = useMemo(() => {
    return catalogProducts.filter((s) => s.section === "Best Sellers & Master Editions");
  }, [catalogProducts]);

  const handleStatusChange = (orderRef: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderRef, newStatus);
    toast.success("Order Craft Status Updated", {
      description: `Reference ${orderRef} updated to ${newStatus}.`,
    });
  };

  const handleTogglePaymentVerified = (orderRef: string) => {
    togglePaymentVerified(orderRef);
    toast.success("Payment Status Updated", {
      description: `Payment verification status toggled for order ${orderRef}.`,
    });
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newNoteInput.trim()) return;
    addOrderNote(selectedOrder.orderRef, newNoteInput.trim());
    setSelectedOrder((prev) =>
      prev
        ? {
            ...prev,
            internalNotes: [...(prev.internalNotes || []), newNoteInput.trim()],
          }
        : null
    );
    setNewNoteInput("");
    toast.success("Artisan Note Added");
  };

  const handleExportCSV = () => {
    const headers = [
      "OrderRef",
      "Date",
      "CustomerName",
      "CustomerEmail",
      "Phone",
      "PaymentMode",
      "TrxID",
      "TotalPriceEUR",
      "CraftStatus",
      "PaymentVerified",
    ];

    const rows = displayOrders.map((o) => [
      o.orderRef,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customer.fullName}"`,
      o.customer.email,
      `"${o.customer.phone}"`,
      o.paymentMode,
      o.paymentDetails.trxId || "N/A",
      o.totalPrice,
      `"${o.status}"`,
      o.paymentVerified !== false ? "Verified" : "Pending",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Maison_Vellari_Order_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Order Ledger Exported to CSV");
  };

  // Product Form Actions
  const handleOpenAddProduct = () => {
    setEditingShoe(null);
    setShoeForm({
      name: "",
      category: "",
      price: "€1,850",
      material: "Tuscan Calfskin",
      img: shoeOxford,
      section: "Core Collection",
      status: "Active in Production",
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (shoe: CatalogShoe) => {
    setEditingShoe(shoe);
    setShoeForm({
      name: shoe.name,
      category: shoe.category,
      price: shoe.price,
      material: shoe.material,
      img: shoe.img,
      section: shoe.section || "Core Collection",
      status: shoe.status,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shoeForm.name.trim() || !shoeForm.price.trim()) {
      toast.error("Please fill required product details.");
      return;
    }

    if (editingShoe) {
      updateCatalogProduct(editingShoe.id, shoeForm);
      toast.success("Footwear Model Updated");
    } else {
      addCatalogProduct(shoeForm);
      toast.success("New Footwear Model Added to Catalog");
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name} from catalog?`)) {
      deleteCatalogProduct(id);
      toast.success(`${name} deleted from catalog.`);
    }
  };

  // Appointments Form Actions
  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentForm.name || !appointmentForm.date) {
      toast.error("Please fill name and date.");
      return;
    }

    const newAppt: Appointment = {
      id: `fit-${Date.now()}`,
      name: appointmentForm.name,
      email: appointmentForm.email || "concierge@vellari.com",
      phone: appointmentForm.phone || "+880 1700-000000",
      city: appointmentForm.city,
      date: appointmentForm.date,
      status: "Confirmed",
    };

    setFittingsList((prev) => [newAppt, ...prev]);
    setIsAppointmentModalOpen(false);
    toast.success("VIP Fitting Reservation Booked");
  };

  const handlePrintReceipt = (order: Order) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = order.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 12px 0;">
          <strong style="color: #ffffff; font-size: 14px;">${item.shoe.name}</strong><br/>
          <span style="font-size: 13px; color: #aaa;">${item.size}, ${item.width} ${item.monogram ? `· Monogram: ${item.monogram}` : ""}</span>
        </td>
        <td style="padding: 12px 0; text-align: center; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; font-size: 14px; color: #d4af37;">${item.shoe.price}</td>
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
            .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; }
            .gold { color: #d4af37; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .footer { margin-top: 40px; border-top: 1px solid #333; pt: 20px; font-size: 13px; color: #aaa; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>MAISON VELLÁRI</h2>
            <p class="gold" style="letter-spacing: 2px; font-size: 13px;">OFFICIAL ATELIER RECEIPT</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 24px; font-size: 15px;">
            <div>
              <p><strong>Order Reference:</strong> <span class="gold">${order.orderRef}</span></p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <div style="text-align: right;">
              <p><strong>Customer:</strong> ${order.customer.fullName}</p>
              <p><strong>Email:</strong> ${order.customer.email}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMode.toUpperCase()}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr style="border-bottom: 2px solid #d4af37; text-align: left; font-size: 14px;">
                <th style="padding: 12px 0;">Item Description</th>
                <th style="padding: 12px 0; text-align: center;">Qty</th>
                <th style="padding: 12px 0; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 24px;">
            <h3 style="font-size: 20px;">Total Paid: <span class="gold">€${order.totalPrice.toLocaleString()}</span></h3>
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

  if (!isMounted) {
    return <div className="min-h-screen bg-zinc-950" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-900/95 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-500/50 bg-amber-500/10 text-amber-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-2xl font-bold tracking-wide text-white">
                  Maison <span className="text-amber-400 italic font-normal">Vellári</span>
                </span>
                <span className="rounded-md border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                  Master Console
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Florence Atelier System · Signed in as: <strong className="text-amber-400 font-mono">{adminEmail}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Export CSV</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-xs font-semibold text-zinc-200 hover:border-amber-500/50 hover:text-amber-400 transition"
            >
              <span>Customer Storefront</span>
              <ExternalLink className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 md:px-10">
        {/* Metric Cards - High Contrast */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Total Atelier Revenue</span>
              <TrendingUp className="h-5 w-5 text-amber-400" />
            </div>
            <div className="mt-3 font-serif text-3xl font-bold text-amber-400">
              €{totalRevenue.toLocaleString()}
            </div>
            <div className="mt-1.5 text-xs text-zinc-400 font-medium">
              From {displayOrders.length} confirmed customer orders
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Pairs In Craft</span>
              <PackageCheck className="h-5 w-5 text-amber-400" />
            </div>
            <div className="mt-3 font-serif text-3xl font-bold text-white">
              {totalPairsCount} Pairs
            </div>
            <div className="mt-1.5 text-xs text-zinc-400 font-medium">
              Hand-welting in Tuscan atelier
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Mobile & Card Verifications</span>
              <Smartphone className="h-5 w-5 text-amber-400" />
            </div>
            <div className="mt-3 font-serif text-3xl font-bold text-white">
              {displayOrders.filter((o) => o.paymentMode !== "card").length} Mobile / {displayOrders.filter((o) => o.paymentMode === "card").length} Cards
            </div>
            <div className="mt-1.5 text-xs text-zinc-400 font-medium">
              bKash, Nagad, Rocket & Cards
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Flagship Fittings</span>
              <Building2 className="h-5 w-5 text-amber-400" />
            </div>
            <div className="mt-3 font-serif text-3xl font-bold text-amber-400">
              {fittingsList.length} Reserved
            </div>
            <div className="mt-1.5 text-xs text-zinc-400 font-medium">
              Florence, London & New York
            </div>
          </motion.div>
        </div>

        {/* Expanded Navigation Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "orders", label: `Order Ledger (${filteredOrders.length})`, icon: LayoutDashboard },
              { id: "payments", label: "Payment Verification Center", icon: ShieldCheck },
              { id: "catalog", label: `Footwear Catalog (${catalogProducts.length})`, icon: Boxes },
              { id: "fittings", label: `VIP Appointments (${fittingsList.length})`, icon: Users },
              { id: "materials", label: "Leather & Materials", icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-zinc-950 shadow-lg font-extrabold"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-amber-500/50 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Filter Controls */}
          {(activeTab === "orders" || activeTab === "payments") && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Ref, Customer, TrxID..."
                  className="rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2 text-xs font-medium text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none w-64 shadow-inner"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Filter className="h-4 w-4 text-amber-400" />
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Payment Methods</option>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                  <option value="card">Cards</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: ORDER LEDGER */}
        {activeTab === "orders" && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-200">
                <thead className="border-b border-zinc-800 bg-zinc-950 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <tr>
                    <th className="px-6 py-4">Order Ref & Date</th>
                    <th className="px-6 py-4">Customer Info</th>
                    <th className="px-6 py-4">Purchased Footwear</th>
                    <th className="px-6 py-4">Payment & TrxID</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Craft Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-sm font-medium text-zinc-400">
                        No orders found matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.orderRef} className="transition hover:bg-zinc-850">
                        <td className="px-6 py-5 align-top">
                          <div className="font-mono text-sm font-bold text-amber-400">
                            {order.orderRef}
                          </div>
                          <div className="mt-1 text-xs text-zinc-400 font-medium">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        <td className="px-6 py-5 align-top">
                          <div className="font-bold text-sm text-white">{order.customer.fullName}</div>
                          <div className="text-xs text-zinc-300 font-mono mt-0.5">{order.customer.email}</div>
                          <div className="text-xs text-zinc-400">{order.customer.phone}</div>
                        </td>

                        <td className="px-6 py-5 align-top max-w-xs">
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                                <img
                                  src={item.shoe.img}
                                  alt={item.shoe.name}
                                  className="h-10 w-14 object-cover rounded bg-zinc-800 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-xs text-white">{item.shoe.name}</div>
                                  <div className="text-xs text-zinc-300 mt-0.5">
                                    {item.size} · {item.width} {item.monogram ? `· Initials: ${item.monogram}` : ""}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="px-6 py-5 align-top">
                          <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                            {order.paymentMode === "card" ? (
                              <CreditCard className="h-3.5 w-3.5" />
                            ) : (
                              <Smartphone className="h-3.5 w-3.5" />
                            )}
                            {order.paymentMode}
                          </div>
                          {order.paymentDetails.trxId && (
                            <div className="mt-2 font-mono text-xs text-white bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 inline-block">
                              TrxID: <strong className="text-amber-400 font-bold">{order.paymentDetails.trxId}</strong>
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-5 align-top">
                          <div className="font-serif text-lg font-bold text-amber-400">
                            €{order.totalPrice.toLocaleString()}
                          </div>
                        </td>

                        <td className="px-6 py-5 align-top">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.orderRef, e.target.value as any)}
                            className="rounded-xl border border-amber-500/50 bg-zinc-950 px-3 py-2 text-xs font-bold text-amber-300 focus:border-amber-400 focus:outline-none cursor-pointer shadow-sm"
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status} className="bg-zinc-900 text-white font-medium">
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-6 py-5 align-top text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-200 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
                            title="Inspect Order Details & Artisan Notes"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Inspect
                          </button>

                          <button
                            type="button"
                            onClick={() => handlePrintReceipt(order)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition cursor-pointer"
                            title="Print Official Atelier Receipt"
                          >
                            <Printer className="h-3.5 w-3.5" />
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENT VERIFICATION CENTER */}
        {activeTab === "payments" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Payment Audit & TrxID Verification Center</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Audit mobile financial service merchant transactions (bKash, Nagad, Rocket) and credit card authorizations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-400">
                    {displayOrders.filter((o) => o.paymentVerified !== false).length} Verified
                  </span>
                  <span className="rounded-full bg-amber-500/15 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-400">
                    {displayOrders.filter((o) => o.paymentVerified === false).length} Unverified
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-200">
                  <thead className="border-b border-zinc-800 bg-zinc-950 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <tr>
                      <th className="px-6 py-4">Order Ref</th>
                      <th className="px-6 py-4">Payment Method</th>
                      <th className="px-6 py-4">Customer & Account Number</th>
                      <th className="px-6 py-4">Transaction ID (TrxID)</th>
                      <th className="px-6 py-4">Amount (€)</th>
                      <th className="px-6 py-4">Audit Status</th>
                      <th className="px-6 py-4 text-right">Verification Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {filteredOrders.map((o) => {
                      const isVerified = o.paymentVerified !== false;
                      return (
                        <tr key={o.orderRef} className="hover:bg-zinc-850">
                          <td className="px-6 py-4 font-mono font-bold text-amber-400">{o.orderRef}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold uppercase text-amber-300">
                              {o.paymentMode}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{o.customer.fullName}</div>
                            <div className="text-xs text-zinc-400 font-mono">{o.paymentDetails.mobileAccount || o.customer.phone}</div>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-amber-400 text-sm">
                            {o.paymentDetails.trxId || "CARD-AUTH"}
                          </td>
                          <td className="px-6 py-4 font-serif font-bold text-amber-400 text-base">
                            €{o.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            {isVerified ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-400">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Payment Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-xs font-bold text-red-400">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                Action Required
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleTogglePaymentVerified(o.orderRef)}
                              className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                                isVerified
                                  ? "border border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-red-400"
                                  : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-extrabold"
                              }`}
                            >
                              {isVerified ? "Flag Unverified" : "Approve & Verify"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECTION-WISE FOOTWEAR CATALOG MANAGEMENT */}
        {activeTab === "catalog" && (
          <div className="mt-6 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-3xl font-bold text-white">Homepage Footwear Catalog Management</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Organized section-wise using authentic Maison Vellári Tuscan handcrafted footwear assets.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-zinc-950 hover:bg-amber-300 transition shadow-lg cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add New Shoe Model
              </button>
            </div>

            {/* SECTION 1: CORE SIGNATURE COLLECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <h4 className="font-serif text-2xl font-bold text-white">Section 1: Core Signature Collection</h4>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  {coreCollectionShoes.length} Models
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {coreCollectionShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4 shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <img
                        src={shoe.img}
                        alt={shoe.name}
                        className="h-48 w-full object-cover rounded-xl bg-zinc-950 border border-zinc-800"
                      />
                      <div className="flex items-center justify-between">
                        <span className="eyebrow text-amber-400">{shoe.category}</span>
                        <span className="font-serif text-xl font-bold text-amber-400">{shoe.price}</span>
                      </div>
                      <h5 className="font-serif text-2xl text-white font-bold">{shoe.name}</h5>
                      <p className="text-xs text-zinc-400">Material: <strong className="text-zinc-200">{shoe.material}</strong></p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{shoe.status}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProduct(shoe)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-xs font-bold text-zinc-200 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Model
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(shoe.id, shoe.name)}
                        className="rounded-lg border border-red-500/40 bg-red-500/10 p-2 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition cursor-pointer"
                        title="Delete model"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: BEST SELLERS & MASTER EDITIONS */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h4 className="font-serif text-2xl font-bold text-white">Section 2: Best Sellers & Master Editions</h4>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  {bestSellerShoes.length} Editions
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bestSellerShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4 shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative">
                        <img
                          src={shoe.img}
                          alt={shoe.name}
                          className="h-48 w-full object-cover rounded-xl bg-zinc-950 border border-zinc-800"
                        />
                        {shoe.tag && (
                          <span className="absolute top-3 left-3 rounded-full bg-amber-400 text-zinc-950 font-bold text-[0.65rem] uppercase px-3 py-1 shadow-md">
                            {shoe.tag}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="eyebrow text-amber-400">{shoe.category}</span>
                        <span className="font-serif text-xl font-bold text-amber-400">{shoe.price}</span>
                      </div>
                      <h5 className="font-serif text-2xl text-white font-bold">{shoe.name}</h5>
                      <p className="text-xs text-zinc-400">Material: <strong className="text-zinc-200">{shoe.material}</strong></p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{shoe.status}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProduct(shoe)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-xs font-bold text-zinc-200 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Model
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(shoe.id, shoe.name)}
                        className="rounded-lg border border-red-500/40 bg-red-500/10 p-2 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition cursor-pointer"
                        title="Delete model"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VIP FITTING APPOINTMENTS */}
        {activeTab === "fittings" && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">VIP Fitting Appointments Manager</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Schedule and confirm 90-minute bespoke fitting appointments in Florence, London, and NYC.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAppointmentModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-zinc-950 hover:bg-amber-300 transition shadow-lg cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Book VIP Reservation
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {fittingsList.map((f) => (
                <div
                  key={f.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-white">{f.name}</span>
                      <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-0.5 text-xs font-bold text-amber-300">
                        {f.status}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-300 flex items-center gap-4">
                      <span>Email: <strong>{f.email}</strong></span>
                      <span>Phone: <strong>{f.phone}</strong></span>
                    </div>
                    <div className="text-xs text-amber-400 flex items-center gap-1.5 pt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{f.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800">
                    <div className="text-xs font-mono font-bold text-white bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-800 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      {f.date}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFittingsList((prev) =>
                          prev.map((item) =>
                            item.id === f.id ? { ...item, status: item.status === "Confirmed" ? "Completed" : "Confirmed" } : item
                          )
                        );
                        toast.success("Appointment status updated.");
                      }}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-bold text-zinc-200 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
                    >
                      Toggle Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LEATHER & MATERIALS STOCK MONITOR */}
        {activeTab === "materials" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 shadow-xl">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Tuscan Leather & Material Supply Stock</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Monitor raw calfskin hides, suede supplies, and welting linen inventory at Florence Tannery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "Toscana Full-Grain Calfskin", stock: "142 Hides", status: "Optimal", color: "text-emerald-400" },
                  { name: "Notte Solofra Suede", stock: "88 Hides", status: "Optimal", color: "text-emerald-400" },
                  { name: "Oak-Bark Tanned Leather Soles", stock: "210 Pairs", status: "Optimal", color: "text-emerald-400" },
                  { name: "Beeswax Welting Linen Thread", stock: "14 Spools", status: "Reorder Required", color: "text-amber-400" },
                ].map((mat) => (
                  <div key={mat.name} className="p-5 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2">
                    <span className="eyebrow text-zinc-400">Material Stock</span>
                    <h4 className="font-bold text-white text-base">{mat.name}</h4>
                    <div className="font-serif text-2xl font-bold text-amber-400">{mat.stock}</div>
                    <div className={`text-xs font-bold ${mat.color}`}>{mat.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INSPECT ORDER DRAWER MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-xl border-l border-zinc-800 bg-zinc-950 p-6 md:p-8 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <span className="eyebrow text-amber-400">Order Inspector</span>
                    <h3 className="font-mono text-xl font-bold text-amber-400">{selectedOrder.orderRef}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Customer Details */}
                <div className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <h4 className="font-bold text-white text-sm">Customer Record</h4>
                  <p className="text-xs text-zinc-300">Name: <strong className="text-white">{selectedOrder.customer.fullName}</strong></p>
                  <p className="text-xs text-zinc-300">Email: <strong className="text-white">{selectedOrder.customer.email}</strong></p>
                  <p className="text-xs text-zinc-300">Phone: <strong className="text-white">{selectedOrder.customer.phone}</strong></p>
                  {selectedOrder.customer.address && (
                    <p className="text-xs text-zinc-300">Address: <strong className="text-white">{selectedOrder.customer.address}, {selectedOrder.customer.city}</strong></p>
                  )}
                </div>

                {/* Items Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">Purchased Shoes</h4>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-zinc-800 bg-zinc-900">
                      <img src={item.shoe.img} alt={item.shoe.name} className="h-16 w-20 object-cover rounded-lg border border-zinc-800" />
                      <div>
                        <div className="font-bold text-white text-sm">{item.shoe.name}</div>
                        <div className="text-xs text-amber-400 font-bold">{item.shoe.price}</div>
                        <div className="text-xs text-zinc-300 mt-1">Size: {item.size} · Width: {item.width}</div>
                        {item.monogram && <div className="text-xs text-amber-300 font-bold">Hot-Stamped Initials: {item.monogram}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Artisan Notes Log */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <MessageSquarePlus className="h-4 w-4 text-amber-400" />
                    Internal Artisan & Cordwainer Notes
                  </h4>
                  <div className="space-y-2">
                    {(selectedOrder.internalNotes || []).map((note, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300">
                        {note}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      placeholder="Add artisan note..."
                      className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-300 transition cursor-pointer"
                    >
                      Add Note
                    </button>
                  </form>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-between">
                <button
                  type="button"
                  onClick={() => handlePrintReceipt(selectedOrder)}
                  className="w-full rounded-xl bg-amber-400 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-300 transition cursor-pointer"
                >
                  Print Official Atelier Receipt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingShoe ? "Edit Footwear Model" : "Add New Footwear Model"}
                </h3>
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Catalog Section</label>
                  <select
                    value={shoeForm.section}
                    onChange={(e) => setShoeForm({ ...shoeForm, section: e.target.value as any })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Core Collection">Section 1: Core Collection</option>
                    <option value="Best Sellers & Master Editions">Section 2: Best Sellers & Master Editions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Shoe Model Name</label>
                  <input
                    type="text"
                    required
                    value={shoeForm.name}
                    onChange={(e) => setShoeForm({ ...shoeForm, name: e.target.value })}
                    placeholder="e.g. Vellári No. 06"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Category & Tag</label>
                  <input
                    type="text"
                    required
                    value={shoeForm.category}
                    onChange={(e) => setShoeForm({ ...shoeForm, category: e.target.value })}
                    placeholder="e.g. Oxford · Patent"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 font-bold mb-1">Price (€)</label>
                    <input
                      type="text"
                      required
                      value={shoeForm.price}
                      onChange={(e) => setShoeForm({ ...shoeForm, price: e.target.value })}
                      placeholder="€1,850"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-bold mb-1">Material</label>
                    <input
                      type="text"
                      required
                      value={shoeForm.material}
                      onChange={(e) => setShoeForm({ ...shoeForm, material: e.target.value })}
                      placeholder="Tuscan Calfskin"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-400 px-5 py-2 font-bold text-zinc-950 hover:bg-amber-300"
                  >
                    Save Model
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOK VIP APPOINTMENT MODAL */}
      <AnimatePresence>
        {isAppointmentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-serif text-xl font-bold text-white">Book VIP Fitting Reservation</h3>
                <button type="button" onClick={() => setIsAppointmentModalOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAppointment} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">VIP Client Name</label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    placeholder="e.g. Lord Julian Ashcroft"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                    placeholder="ashcroft@domain.com"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    placeholder="+44 20 7946 0912"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Flagship Location</label>
                  <select
                    value={appointmentForm.city}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, city: e.target.value })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Florence Atelier (Via de' Tornabuoni 8)">Florence Atelier (Via de' Tornabuoni 8)</option>
                    <option value="London Atelier (Jermyn Street 42)">London Atelier (Jermyn Street 42)</option>
                    <option value="New York Atelier (Madison Ave 712)">New York Atelier (Madison Ave 712)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Date & Time</label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    placeholder="e.g. Aug 18, 2026 at 15:30"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAppointmentModalOpen(false)}
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-400 px-5 py-2 font-bold text-zinc-950 hover:bg-amber-300"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
