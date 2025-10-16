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
import { Link } from "react-router-dom";

function Hero() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyDemo = () => {
    navigator.clipboard.writeText("hiddennote.com/to/demo");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            RECEIVE <span className="text-amber-400">ANONYMOUS</span> MESSAGES
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12">
            Share your link. Get honest feedback. Stay completely anonymous.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <label className="block text-slate-400 text-sm mb-3 text-left">
              Your unique link will look like:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value="hiddennote.com/to/yourname"
                readOnly
                className="flex-1 bg-slate-900 border border-slate-600 text-white px-6 py-4 rounded-lg text-lg focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleCopyDemo}
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 p-4 rounded-lg transition-colors"
                title="Copy link"
              >
                <Copy className="w-6 h-6" />
              </button>
            </div>
            {copiedLink && (
              <p className="text-green-400 text-sm mt-2 text-left">
                ✓ Link copied!
              </p>
            )}
          </div>

          <Link
            to="/signup"
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-10 py-5 rounded-xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-400/20 inline-block text-center"
          >
            CREATE YOUR LINK NOW
          </Link>

          <div className="flex justify-center gap-4 mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">f</span>
            </button>
            <button className="bg-sky-500 hover:bg-sky-600 w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">𝕏</span>
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">in</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">@</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Hero;