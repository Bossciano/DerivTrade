import { useState } from "react";
import { Home, LineChart, Trophy, Crown, User } from "lucide-react";
import HomeScreen from "@/pages/HomeScreen";
import ChartScreen from "@/pages/ChartScreen";
import PropScreen from "@/pages/PropScreen";
import PremiumScreen from "@/pages/PremiumScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import LoginScreen from "@/pages/LoginScreen";

type Tab = "home" | "charts" | "prop" | "premium" | "profile";

const navItems: { id: Tab; Icon: React.FC<{ size?: number; strokeWidth?: number }>; label: string }[] = [
  { id: "home", Icon: Home, label: "Home" },
  { id: "charts", Icon: LineChart, label: "Charts" },
  { id: "prop", Icon: Trophy, label: "Prop" },
  { id: "premium", Icon: Crown, label: "Premium" },
  { id: "profile", Icon: User, label: "Profile" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  if (!isLoggedIn) {
    return (
      <div className="app-shell">
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      {activeTab === "home" && <HomeScreen />}
      {activeTab === "charts" && <ChartScreen onNavigate={(tab) => setActiveTab(tab as Tab)} />}
      {activeTab === "prop" && <PropScreen />}
      {activeTab === "premium" && <PremiumScreen />}
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
