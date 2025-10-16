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

function Features() {
  return (
    <section id="how" className="py-20 px-6 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors">
            <div className="bg-amber-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              1. Sign Up Free
            </h3>
            <p className="text-slate-300">
              Create your account in seconds and get your unique anonymous
              message link.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors">
            <div className="bg-amber-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Copy className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              2. Share Your Link
            </h3>
            <p className="text-slate-300">
              Share your link on social media, with friends, or anywhere you want
              honest feedback.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors">
            <div className="bg-amber-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              3. Receive Messages
            </h3>
            <p className="text-slate-300">
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
