import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ADD THIS
import {
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { sendMessage } from "../services/messagesService";
import axiosInstance from "../services/axiosInstance";

function SendMessage() {
  const { secretLink } = useParams(); // GET secretLink from URL params
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(true);
  const [checkingUser, setCheckingUser] = useState(true);
  const [recipientUsername, setRecipientUsername] = useState("");

  const maxLength = 1000;

  // Check if user exists
 useEffect(() => {
   const checkUser = async () => {
     try {
       const response = await axiosInstance.get(`/users/`);
       const users = response.data.results; // Access the array inside 'results'
       const user = users.find((u) => u.secret_link === secretLink);

       if (user) {
         setRecipientUsername(user.username);
         setUserExists(true);
       } else {
         setUserExists(false);
       }
     } catch (err) {
       console.error("Error checking user:", err);
       setUserExists(false);
     } finally {
       setCheckingUser(false);
     }
   };

   checkUser();
 }, [secretLink]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      setError("Please enter a message");
      return;
    }

    if (message.length > maxLength) {
      setError(`Message is too long. Maximum ${maxLength} characters.`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendMessage(secretLink, message.trim());
      setSuccess(true);
      setMessage("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error sending message:", err);

      // ✅ Handle rate-limit error (429 Too Many Requests)
      if (err.response && err.response.status === 429) {
        const detail =
          err.response.data?.detail ||
          "You're sending messages too fast. Please wait a bit before trying again.";
        setError(detail);
      } else if (err.response && err.response.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.message) {
        setError(Array.isArray(err.message) ? err.message[0] : err.message);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  if (checkingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
            <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Invalid Link</h2>
            <p className="text-slate-300 mb-6">
              This link doesn't exist or has been removed.
            </p>
            <a
              href="/"
              className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-12 h-12 text-amber-400" />
            <span className="text-3xl font-bold text-white">HiddenNote</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Send Anonymous Message
          </h1>
          <p className="text-slate-400">
            to{" "}
            <span className="text-amber-400 font-semibold">
              @{recipientUsername}
            </span>
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-900/20 border border-green-500 rounded-xl p-6 mb-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-green-400 font-semibold mb-1">
                Message Sent!
              </h3>
              <p className="text-green-300 text-sm">
                Your anonymous message has been delivered successfully.
              </p>
            </div>
          </div>
        )}

        {/* Message Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            {/* Message Textarea */}
            <div className="mb-6">
              <label className="block text-slate-300 mb-3 font-medium">
                Your Anonymous Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here... Be honest, be kind."
                rows={8}
                maxLength={maxLength}
                className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-slate-500 text-sm">
                  Your identity will remain completely anonymous
                </p>
                <span
                  className={`text-sm ${
                    message.length > maxLength * 0.9
                      ? "text-amber-400"
                      : "text-slate-400"
                  }`}
                >
                  {message.length}/{maxLength}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || message.trim().length === 0}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-600 disabled:cursor-not-allowed text-slate-900 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Anonymous Message
                </>
              )}
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              How it works
            </h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• Your message is completely anonymous</li>
              <li>• The recipient cannot see who sent it</li>
              <li>• Be respectful and constructive</li>
              <li>• Messages are private and secure</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-4">
            Want to receive anonymous messages too?
          </p>
          <a
            href="/"
            className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Create Your Own Link
          </a>
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
