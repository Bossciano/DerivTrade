/**
 * DerivTrade — App.tsx (Phase 1)
 *
 * Changes from original:
 * 1. Auth state sourced from Zustand (useAuthStore) — not local useState
 * 2. OAuth callback route: /auth/callback → <AuthCallback />
 * 3. WS connects on login, disconnects on logout
 * 4. Balance subscription starts after login
 * 5. isLoggedIn derived from store — survives page refresh (sessionStorage)
 */

import { useEffect } from "react";
import { Home, LineChart, Trophy, Crown, User } from "lucide-react";
import HomeScreen from "@/pages/HomeScreen";
import ChartScreen from "@/pages/ChartScreen";
import PropScreen from "@/pages/PropScreen";
import PremiumScreen from "@/pages/PremiumScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import LoginScreen from "@/pages/LoginScreen";
import AuthCallback from "@/pages/AuthCallback";
import { useAuthStore, useIsAuthenticated } from "@/store/authStore";
import { derivWS } from "@/services/derivWebSocket";
import { useDerivBalance } from "@/hooks/useDerivBalance";
import { useState } from "react";

type Tab = "home" | "charts" | "prop" | "premium" | "profile";

const navItems: { id: Tab; Icon: React.FC<{ size?: number; strokeWidth?: number }>; label: string }[] = [
  { id: "home", Icon: Home, label: "Home" },
  { id: "charts", Icon: LineChart, label: "Charts" },
  { id: "prop", Icon: Trophy, label: "Prop" },
  { id: "premium", Icon: Crown, label: "Premium" },
  { id: "profile", Icon: User, label: "Profile" },
];

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const { derivToken, isDemoMode, logout } = useAuthStore();

  // Start balance subscription
  useDerivBalance();

  // Connect/disconnect WS based on auth state
  useEffect(() => {
    if (!isDemoMode && derivToken) {
      derivWS.connect(derivToken);
    } else if (isDemoMode) {
      // Connect without auth for demo (public websocket)
      derivWS.connect();
    }

    return () => {
      // Don't disconnect on re-render — only on unmount (i.e., logout)
    };
  }, [derivToken, isDemoMode]);

  const handleLogout = () => {
    derivWS.disconnect();
    logout();
  };

  return (
    <div className="app-shell">
      {activeTab === "home" && <HomeScreen />}
      {activeTab === "charts" && <ChartScreen onNavigate={(tab) => setActiveTab(tab as Tab)} />}
      {activeTab === "prop" && <PropScreen />}
      {activeTab === "premium" && <PremiumScreen />}
      {activeTab === "profile" && (
        <ProfileScreen onLogout={handleLogout} onNavigate={(tab) => setActiveTab(tab as Tab)} />
      )}

      <div className="bottom-nav">
        {navItems.map(({ id, Icon, label }) => {
          const active = activeTab === id;
          return (
            <div
              key={id}
              className={`nav-item${active ? " active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.6}
                color={active ? "var(--brand)" : "var(--dim)"}
                style={active ? { filter: "drop-shadow(0 0 6px var(--brand))" } : undefined}
              />
              <div className="nav-label">{label}</div>
              {active && <div className="nav-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const { loginWithOAuth } = useAuthStore();

  // Handle OAuth callback route
  const isCallback = window.location.pathname === "/auth/callback";

  if (isCallback) {
    return (
      <div className="app-shell">
        <AuthCallback
          onSuccess={() => {
            window.history.replaceState({}, "", "/");
            window.location.reload();
          }}
          onError={() => {
            window.history.replaceState({}, "", "/");
            window.location.reload();
          }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <LoginScreen onLogin={() => window.location.reload()} />
      </div>
    );
  }

  return <AuthenticatedApp />;
}      {activeTab === "premium" && <PremiumScreen />}
      {activeTab === "profile" && <ProfileScreen />}

      <div className="bottom-nav">
        {navItems.map(({ id, Icon, label }) => {
          const active = activeTab === id;
          return (
            <div
              key={id}
              className={`nav-item${active ? " active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.6}
                color={active ? "var(--brand)" : "var(--dim)"}
                style={active ? { filter: "drop-shadow(0 0 6px var(--brand))" } : undefined}
              />
              <div className="nav-label">{label}</div>
              {active && <div className="nav-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
