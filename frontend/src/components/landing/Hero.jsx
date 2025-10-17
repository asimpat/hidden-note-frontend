import { useState } from "react";
import { Copy } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyDemo = () => {
    navigator.clipboard.writeText("hiddennote.com/to/demo");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            RECEIVE <span className="text-amber-400">ANONYMOUS</span> MESSAGES
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 px-4">
            Share your link. Get honest feedback. Stay completely anonymous.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 sm:p-8 max-w-2xl mx-auto mb-6 sm:mb-8">
            <label className="block text-slate-400 text-xs sm:text-sm mb-3 text-left">
              Your unique link will look like:
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value="hiddennote.com/to/yourname"
                readOnly
                className="flex-1 bg-slate-900 border border-slate-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-lg focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleCopyDemo}
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 p-3 sm:p-4 rounded-lg transition-colors flex items-center justify-center gap-2 sm:gap-0"
                title="Copy link"
              >
                <Copy className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sm:hidden ml-2 font-semibold">Copy Link</span>
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
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-400/20 inline-block text-center w-full sm:w-auto"
          >
            CREATE YOUR LINK NOW
          </Link>

          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold text-sm sm:text-base">
                f
              </span>
            </button>
            <button className="bg-sky-500 hover:bg-sky-600 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold text-sm sm:text-base">
                𝕏
              </span>
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold text-sm sm:text-base">
                in
              </span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold text-sm sm:text-base">
                @
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
