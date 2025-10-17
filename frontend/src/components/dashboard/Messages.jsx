import { useState } from "react";
import {
  Copy,
  Trash2,
  Clock,
  CheckCircle,
  Search,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

function Messages({
  user,
  messages,
  count,
  nextPage,
  prevPage,
  loading,
  handleDelete,
  handleMarkAsRead,
  fetchMessages,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [copiedLink, setCopiedLink] = useState(false);

  const userSecretLink = user?.secret_link || "unknown";
  const userLink = `${window.location.origin}/to/${userSecretLink}/`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(userLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
        <p className="text-slate-400 mt-4">Loading messages...</p>
      </div>
    );
  }

  const filteredMessages = messages
    .filter((msg) =>
      (msg.message?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    )
    .filter((msg) =>
      filterStatus === "all"
        ? true
        : filterStatus === "read"
        ? msg.is_read
        : !msg.is_read
    )
    .sort((a, b) => (sortBy === "newest" ? b.id - a.id : a.id - b.id));

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Your Messages
        </h1>
        <p className="text-slate-400">
          {count} {count === 1 ? "message" : "messages"} received
        </p>
      </div>

      {/* Unique Link Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-white font-semibold mb-3 text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          Your Unique Link
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={userLink}
            readOnly
            className="flex-1 bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 text-sm"
          />
          <button
            onClick={handleCopyLink}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Copy className="w-5 h-5" />
            {copiedLink ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <p className="text-slate-400 text-sm mt-3">
          Share this link to receive anonymous messages
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 border border-slate-700 rounded-xl">
            <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No messages yet
            </h3>
            <p className="text-slate-400">
              Share your link to start receiving anonymous messages!
            </p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-slate-800 border rounded-xl p-4 sm:p-6 transition-all hover:border-amber-400/50 ${
                message.is_read
                  ? "border-slate-700"
                  : "border-amber-400/50 bg-slate-800/80"
              }`}
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-400 text-xs sm:text-sm">
                    {new Date(message.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {!message.is_read && (
                    <span className="bg-amber-400 text-slate-900 text-xs px-2 py-1 rounded-full font-semibold">
                      New
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-white text-base sm:text-lg mb-3 break-words line-clamp-3">
                {message.message}
              </p>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                {!message.is_read ? (
                  <button
                    onClick={() => handleMarkAsRead(message.id)}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Read
                  </button>
                ) : (
                  <span className="text-green-500 text-sm flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Read
                  </span>
                )}
                <Link
                  to={`/message/${message.id}`}
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  View Message
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {(nextPage || prevPage) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <button
            onClick={() => prevPage && fetchMessages(prevPage)}
            disabled={!prevPage}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-colors ${
              prevPage
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-900 text-slate-500 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          <span className="text-slate-400 text-sm text-center">
            Showing {filteredMessages.length} of {count} messages
          </span>

          <button
            onClick={() => nextPage && fetchMessages(nextPage)}
            disabled={!nextPage}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-colors ${
              nextPage
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-900 text-slate-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Messages;
