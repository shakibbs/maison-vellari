import * as React from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  isMounted: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = React.createContext<AdminAuthContextType | undefined>(undefined);

const LOCAL_STORAGE_ADMIN_KEY = "maison_vellari_admin_auth_v1";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [adminEmail, setAdminEmail] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ADMIN_KEY);
      if (saved === "true") {
        setIsAuthenticated(true);
        setAdminEmail("concierge@vellari.com");
      }
    } catch (e) {
      console.error("Failed to read admin auth from localStorage", e);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    if (
      (email.toLowerCase() === "concierge@vellari.com" && pass === "master1927") ||
      pass === "master1927" ||
      pass === "admin123"
    ) {
      setIsAuthenticated(true);
      setAdminEmail(email || "concierge@vellari.com");
      try {
        localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, "true");
      } catch (e) {
        console.error("Failed to save admin auth", e);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminEmail(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_ADMIN_KEY);
    } catch (e) {
      console.error("Failed to remove admin auth", e);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminEmail, isMounted, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = React.useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
