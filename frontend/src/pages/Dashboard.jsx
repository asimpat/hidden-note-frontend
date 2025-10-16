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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar (fixed) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section */}
      <div className="flex-1 ml-64 pt-20 px-8">
        <Navbar isLoggedIn={true} onSignOut={onSignOut} />

        <main className="max-w-5xl mx-auto w-full">
          {activeTab === "messages" && <Messages />}
          {activeTab === "profile" && <Profile />}
          {/* {activeTab === "settings" && <Setting />} */}
        </main>
      </div>
    </div>
  );
}


export default Dashboard;


