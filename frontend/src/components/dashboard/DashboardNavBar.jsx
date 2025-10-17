import { MessageSquare, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardNavbar({ onSignOut, activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-amber-400" />
          <span className="text-2xl font-bold text-white hidden sm:inline">
            HiddenNote
          </span>
          <span className="text-xl font-bold text-white sm:hidden">HN</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "messages"
                ? "bg-amber-400 text-slate-900"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === "profile"
                ? "bg-amber-400 text-slate-900"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Profile</span>
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default DashboardNavbar;
