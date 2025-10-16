import { useState } from "react";
import { Copy, Trash2, Clock, CheckCircle, Search } from "lucide-react";
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
  const userLink = `http://localhost:5173/to/${userSecretLink}/`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(userLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading messages...</p>;

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
    <section className="py-10">
      <div className="max-w-4xl mx-auto">
        {/* Unique Link Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="text-white font-semibold mb-3">Your Unique Link</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={userLink}
              readOnly
              className="flex-1 bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleCopyLink}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Copy className="w-5 h-5" />
              {copiedLink ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
            />
          </div>

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

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              No messages found.
            </p>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-slate-800 border rounded-xl p-6 transition-colors ${
                  message.is_read
                    ? "border-slate-700"
                    : "border-amber-400/50 bg-slate-800/80"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-sm">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                    {!message.is_read && (
                      <span className="bg-amber-400 text-slate-900 text-xs px-2 py-1 rounded-full font-semibold">
                        New
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white text-lg mb-3 break-words">
                  {message.message}
                </p>

                <div className="flex justify-between items-center">
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
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View Message
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        {(nextPage || prevPage) && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => prevPage && fetchMessages(prevPage)}
              disabled={!prevPage}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                prevPage
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-slate-900 text-slate-500 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <span className="text-slate-400 text-sm">
              Showing {filteredMessages.length} of {count} messages
            </span>

            <button
              onClick={() => nextPage && fetchMessages(nextPage)}
              disabled={!nextPage}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
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
    </section>
  );
}

export default Messages;
