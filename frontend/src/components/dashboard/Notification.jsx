import { useState, useEffect } from "react";
import { Bell, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../../services/notificationService";

function Notifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getUnreadCount();
      setUnreadCount(data.count || 0);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>

      <div className="text-center py-12">
        <div className="bg-slate-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          {unreadCount > 0 ? (
            <Mail className="w-10 h-10 text-blue-400" />
          ) : (
            <Bell className="w-10 h-10 text-slate-600" />
          )}
        </div>

        {unreadCount > 0 ? (
          <>
            <p className="text-white text-xl font-semibold mb-2">
              {unreadCount} {unreadCount === 1 ? "message" : "messages"} unread
            </p>
            <p className="text-slate-400 mb-6">
              You have new anonymous messages waiting
            </p>
            <button
              onClick={() => navigate("/messages")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View Messages
            </button>
          </>
        ) : (
          <>
            <p className="text-white text-xl font-semibold mb-2">
              All caught up!
            </p>
            <p className="text-slate-400">No new messages</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;
