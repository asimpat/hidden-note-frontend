import { Copy, Lock, Zap } from "lucide-react";

function Features() {
  return (
    <section id="how" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 text-center hover:border-amber-400 transition-colors">
            <div className="bg-amber-400/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              1. Sign Up Free
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Create your account in seconds and get your unique anonymous
              message link.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 text-center hover:border-amber-400 transition-colors">
            <div className="bg-amber-400/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Copy className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              2. Share Your Link
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Share your link on social media, with friends, or anywhere you
              want honest feedback.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 text-center hover:border-amber-400 transition-colors">
            <div className="bg-amber-400/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              3. Receive Messages
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Get anonymous messages in your dashboard. Senders stay completely
              anonymous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
