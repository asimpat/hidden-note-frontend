import { MessageSquare } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-700 py-6 sm:py-8 px-4 sm:px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          <span className="text-slate-400 text-sm sm:text-base">
            © 2025 HiddenNote. All rights reserved.
          </span>
        </div>
        <div className="text-slate-400 text-sm sm:text-base">
          Created by{" "}
          <span className="text-amber-400 font-semibold">
            Asim Patrick (Forge)
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
