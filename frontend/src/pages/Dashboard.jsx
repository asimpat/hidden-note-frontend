import { useState } from "react";
import {
  Copy,
  MessageSquare,
  Lock,
  Zap,
  Search,
  Filter,
  Bell,
  User,
  Settings,
  LogOut,
  Trash2,
  Clock,
  CheckCircle,
} from "lucide-react";

import Messages from "../components/dashboard/Messages";
import Notifications from "../components/dashboard/Notification";
import Profile from "../components/dashboard/Profile";
import Setting from "../components/dashboard/Setting";
import Navbar from "../components/landing/NavBar";
import Sidebar from "../components/dashboard/SideBar";

function Dashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar isLoggedIn={true} onSignOut={onSignOut} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="ml-64 pt-20 p-8">
        <div className="max-w-6xl">
          {activeTab === "messages" && <Messages />}
          {/* {activeTab === "notifications" && <Notifications />} */}
          {activeTab === "profile" && <Profile />}
          {activeTab === "settings" && <Setting />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
