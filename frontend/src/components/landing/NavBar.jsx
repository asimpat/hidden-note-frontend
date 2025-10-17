import { useState } from "react";
import { MessageSquare, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn = false, onSignOut }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
          <span className="text-xl sm:text-2xl font-bold text-white">
            HiddenNote
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <a
                href="#how"
                className="text-slate-300 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-4 py-4 space-y-3">
            {!isLoggedIn ? (
              <>
                <a
                  href="#how"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-white transition-colors py-2"
                >
                  How It Works
                </a>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-white transition-colors py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  onSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors py-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
