import { useState } from "react";
import HomeScreen from "@/pages/HomeScreen";
import ChartScreen from "@/pages/ChartScreen";
import PropScreen from "@/pages/PropScreen";
import PremiumScreen from "@/pages/PremiumScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import LoginScreen from "@/pages/LoginScreen";

type Tab = "home" | "charts" | "prop" | "premium" | "profile";

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "charts", icon: "📊", label: "Charts" },
  { id: "prop", icon: "🏆", label: "Prop" },
  { id: "premium", icon: "💳", label: "Premium" },
  { id: "profile", icon: "👤", label: "Profile" },
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
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item${activeTab === item.id ? " active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
