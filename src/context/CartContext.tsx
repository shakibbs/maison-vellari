import * as React from "react";
import type { ShoeProduct } from "@/components/ShoeDetailModal";

import shoeOxford from "@/assets/shoe-oxford.jpg";
import shoeDerby from "@/assets/shoe-derby.jpg";
import shoeMonk from "@/assets/shoe-monk.jpg";
import shoeLoafer from "@/assets/shoe-loafer.jpg";

export interface CartItem {
  id: string; // unique key derived from shoe name + size + width + monogram
  shoe: ShoeProduct;
  size: string;
  width: string;
  monogram: string;
  quantity: number;
}

export interface Order {
  orderRef: string;
  createdAt: string;
  items: CartItem[];
  totalPrice: number;
  shippingMode: "courier" | "atelier";
  paymentMode: "card" | "bkash" | "nagad" | "rocket";
  paymentDetails: {
    cardNumber?: string;
    mobileAccount?: string;
    trxId?: string;
  };
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    atelierCity?: string;
  };
  status: "Crafting in Atelier" | "Hand-Welting" | "Quality Inspection" | "Dispatched";
  paymentVerified?: boolean;
  internalNotes?: string[];
}

export interface CatalogShoe {
  id: string;
  name: string;
  category: string;
  price: string;
  material: string;
  img: string;
  section: "Core Collection" | "Best Sellers & Master Editions";
  tag?: string;
  status: "Active in Production" | "Made-to-Order Only" | "Vaulted";
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (shoe: ShoeProduct, size: string, width: string, monogram?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  orders: Order[];
  lastOrder: Order | null;
  placeOrder: (orderPayload: Omit<Order, "orderRef" | "createdAt" | "status">) => Order;
  updateOrderStatus: (orderRef: string, newStatus: Order["status"]) => void;
  togglePaymentVerified: (orderRef: string) => void;
  addOrderNote: (orderRef: string, note: string) => void;
  catalogProducts: CatalogShoe[];
  addCatalogProduct: (shoe: Omit<CatalogShoe, "id">) => void;
  updateCatalogProduct: (id: string, updated: Partial<CatalogShoe>) => void;
  deleteCatalogProduct: (id: string) => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = "maison_vellari_cart_v1";
const LOCAL_STORAGE_ORDERS_KEY = "maison_vellari_orders_v1";
const LOCAL_STORAGE_CATALOG_KEY = "maison_vellari_catalog_v2";

const HOMEPAGE_CATALOG: CatalogShoe[] = [
  // SECTION 1: CORE COLLECTION
  {
    id: "core-1",
    name: "The Oxford",
    category: "Cap-toe · Patent",
    price: "€1,890",
    material: "Black Patent Calfskin",
    img: shoeOxford,
    section: "Core Collection",
    tag: "Classic Cap-Toe",
    status: "Active in Production",
  },
  {
    id: "core-2",
    name: "The Derby",
    category: "Burnished · Cognac",
    price: "€1,690",
    material: "Cognac Hand-Burnished Calf",
    img: shoeDerby,
    section: "Core Collection",
    tag: "Open Lacing",
    status: "Active in Production",
  },
  {
    id: "core-3",
    name: "The Monk",
    category: "Double Buckle · Onyx",
    price: "€2,150",
    material: "Onyx Italian Box Calf",
    img: shoeMonk,
    section: "Core Collection",
    tag: "Double Strap",
    status: "Active in Production",
  },
  {
    id: "core-4",
    name: "The Loafer",
    category: "Tasselled · Suede",
    price: "€1,540",
    material: "Notte Solofra Tuscan Suede",
    img: shoeLoafer,
    section: "Core Collection",
    tag: "Hand-Stitched Tassel",
    status: "Active in Production",
  },

  // SECTION 2: BEST SELLERS & MASTER EDITIONS
  {
    id: "bs-1",
    name: "Vellári No. 01",
    category: "Whole-cut Oxford · Master Series",
    price: "€2,480",
    material: "Single-Hide Tuscan Calf",
    img: shoeOxford,
    section: "Best Sellers & Master Editions",
    tag: "N° 1 Best Seller",
    status: "Active in Production",
  },
  {
    id: "bs-2",
    name: "Vellári No. 02",
    category: "Burnished Derby · Atelier Edition",
    price: "€1,920",
    material: "Patina Hand-Finished Calf",
    img: shoeDerby,
    section: "Best Sellers & Master Editions",
    tag: "N° 2 Best Seller",
    status: "Active in Production",
  },
  {
    id: "bs-3",
    name: "Vellári No. 03",
    category: "Double Monk · Bespoke Strap",
    price: "€2,150",
    material: "Polished Venetian Onyx",
    img: shoeMonk,
    section: "Best Sellers & Master Editions",
    tag: "N° 3 Best Seller",
    status: "Active in Production",
  },
  {
    id: "bs-4",
    name: "Vellári No. 04",
    category: "Suede Tassel Loafer",
    price: "€1,640",
    material: "Velvet Soft Tuscan Suede",
    img: shoeLoafer,
    section: "Best Sellers & Master Editions",
    tag: "N° 4 Best Seller",
    status: "Active in Production",
  },
  {
    id: "bs-5",
    name: "Vellári No. 05",
    category: "Patent Opera Dress Shoe",
    price: "€2,890",
    material: "Mirror Gloss Formal Patent",
    img: shoeOxford,
    section: "Best Sellers & Master Editions",
    tag: "Flagship Edition",
    status: "Made-to-Order Only",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [catalogProducts, setCatalogProducts] = React.useState<CatalogShoe[]>(HOMEPAGE_CATALOG);

  const [lastOrder, setLastOrder] = React.useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState<boolean>(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = React.useState<boolean>(false);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  // Load from localStorage after hydration
  React.useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCatalog = localStorage.getItem(LOCAL_STORAGE_CATALOG_KEY);
      if (savedCatalog) setCatalogProducts(JSON.parse(savedCatalog));
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems, isLoaded]);

  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders to localStorage", e);
    }
  }, [orders, isLoaded]);

  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_CATALOG_KEY, JSON.stringify(catalogProducts));
    } catch (e) {
      console.error("Failed to save catalog to localStorage", e);
    }
  }, [catalogProducts, isLoaded]);

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9]/g, "");
    return parseInt(cleaned, 10) || 0;
  };

  const addToCart = (shoe: ShoeProduct, size: string, width: string, monogram: string = "") => {
    const cleanMonogram = monogram.trim().toUpperCase();
    const itemId = `${shoe.name}-${size}-${width}-${cleanMonogram}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            shoe,
            size,
            width,
            monogram: cleanMonogram,
            quantity: 1,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (orderPayload: Omit<Order, "orderRef" | "createdAt" | "status">): Order => {
    const generatedRef = `MV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderPayload,
      orderRef: generatedRef,
      createdAt: new Date().toISOString(),
      status: "Crafting in Atelier",
      paymentVerified: true,
      internalNotes: ["Order submitted by customer concierge."],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderRef: string, newStatus: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.orderRef === orderRef ? { ...o, status: newStatus } : o))
    );
  };

  const togglePaymentVerified = (orderRef: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.orderRef === orderRef ? { ...o, paymentVerified: !o.paymentVerified } : o
      )
    );
  };

  const addOrderNote = (orderRef: string, note: string) => {
    if (!note.trim()) return;
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.orderRef === orderRef
          ? { ...o, internalNotes: [...(o.internalNotes || []), note.trim()] }
          : o
      )
    );
  };

  const addCatalogProduct = (shoePayload: Omit<CatalogShoe, "id">) => {
    const newShoe: CatalogShoe = {
      ...shoePayload,
      id: `cat-${Date.now()}`,
    };
    setCatalogProducts((prev) => [newShoe, ...prev]);
  };

  const updateCatalogProduct = (id: string, updated: Partial<CatalogShoe>) => {
    setCatalogProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteCatalogProduct = (id: string) => {
    setCatalogProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + parsePrice(item.shoe.price) * item.quantity, 0);
  }, [cartItems]);

  const totalItems = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        orders,
        lastOrder,
        placeOrder,
        updateOrderStatus,
        togglePaymentVerified,
        addOrderNote,
        catalogProducts,
        addCatalogProduct,
        updateCatalogProduct,
        deleteCatalogProduct,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
