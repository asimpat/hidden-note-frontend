import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { authService } from "../../services/authService";

function LoginModal({ isOpen, onClose, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(formData);
      localStorage.setItem("user", JSON.stringify(response.user));
      onAuthSuccess();
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full bg-slate-900 border border-slate-600 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-slate-900 border border-slate-600 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-600 disabled:cursor-not-allowed text-slate-900 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Sign Up Redirect */}
          <div className="text-center pt-2">
            <p className="text-slate-400">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.location.href = "/signup";
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
