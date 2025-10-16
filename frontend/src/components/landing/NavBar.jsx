import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { notificationService } from "../../services/notificationService";
import { authService } from "../../services/authService";

function Navbar({ isLoggedIn = false, onSignOut }) {

  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(false);

  // Check for unread messages
  // useEffect(() => {
  //   const checkUnreadMessages = async () => {
  //     try {
  //       const data = await notificationService.getUnreadCount();
  //       setHasUnread(data.count > 0);
  //     } catch (error) {
  //       console.error("Error checking unread messages:", error);
  //     }
  //   };

  //   if (authService.isAuthenticated()) {
  //     checkUnreadMessages();
  //     // Poll for updates every 30 seconds
  //     const interval = setInterval(checkUnreadMessages, 30000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-amber-400" />
          <span className="text-2xl font-bold text-white">HiddenNote</span>
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <a
                href="#how"
                className="text-slate-300 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
             
            </>
          ) : (
            <>
              {/* <button
                onClick={() => navigate("/notifications")}
                className="relative text-slate-300 hover:text-white transition-colors"
              >
                <Bell className="w-6 h-6" />
                {hasUnread && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button> */}
              <button
                onClick={onSignOut}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
