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

function Footer() {
  return (
    <footer className="border-t border-slate-700 py-8 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-400" />
          <span className="text-slate-400">
            © 2024 HiddenNote. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
