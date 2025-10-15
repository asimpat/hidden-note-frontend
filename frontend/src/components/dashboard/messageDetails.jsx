import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  CheckCircle,
  Calendar,
  User,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import { API } from "../../config/api";

const MessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get(API.MESSAGE_DETAIL(id));
        setMessage(response.data);
        setError(null);

        // Automatically mark as read if it's unread
        if (!response.data.is_read) {
          await axiosInstance.patch(API.MESSAGE_DETAIL(id), {
            is_read: true,
          });
          // Update local state
          setMessage((prev) => ({ ...prev, is_read: true }));
        }
      } catch (error) {
        console.error("Error fetching message detail:", error);
        setError("Failed to load message. It may have been deleted.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      return;
    }

    setActionLoading(true);
    try {
      await axiosInstance.delete(API.MESSAGE_DETAIL(id));
      navigate("/dashboard", { state: { messageDeleted: true } });
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInHours < 48) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading message...</p>
        </div>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
            <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Message Not Found
            </h2>
            <p className="text-slate-300 mb-6">
              {error || "This message doesn't exist or has been deleted."}
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Messages</span>
          </button>

          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            <span className="text-white font-semibold">HiddenNote</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Status Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Read
          </span>
          <span className="text-slate-400 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(message.created_at)}
          </span>
        </div>

        {/* Message Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-amber-400/10 p-3 rounded-full">
              <User className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">
                Anonymous Sender
              </h3>
              <p className="text-slate-400 text-sm">
                This message was sent anonymously
              </p>
            </div>
            <button
              onClick={() => handleDelete(message.id)}
              className="text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          </div>
        </div>


        {/* Info Box */}
        <div className="mt-8 bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            About Anonymous Messages
          </h4>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>
              • The sender's identity is completely anonymous and cannot be
              traced
            </li>
            <li>• You cannot reply to anonymous messages</li>
            <li>• Deleted messages cannot be recovered</li>
          
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MessageDetail;
