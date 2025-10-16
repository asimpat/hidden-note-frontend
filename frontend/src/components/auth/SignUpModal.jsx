import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { authService } from "../../services/authService";
import { Link } from "react-router-dom";

function SignUpModal({ isOpen, onClose, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.password2) {
      newErrors.password2 = "Please confirm your password";
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await authService.register(formData);
      localStorage.setItem("user", JSON.stringify(response.user));
      setSuccess(true);

      setTimeout(() => {
        onAuthSuccess();
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      if (err.email) {
        setErrors({
          email: Array.isArray(err.email) ? err.email[0] : err.email,
        });
      } else if (err.username) {
        setErrors({
          username: Array.isArray(err.username)
            ? err.username[0]
            : err.username,
        });
      } else if (err.password) {
        setErrors({
          password: Array.isArray(err.password)
            ? err.password[0]
            : err.password,
        });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Account Created!
          </h2>
          <p className="text-slate-300 mb-6">
            Welcome to HiddenNote! Redirecting...
          </p>
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {errors.general && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Username <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className={`w-full bg-slate-900 border ${
                  errors.username ? "border-red-500" : "border-slate-600"
                } text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors`}
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full bg-slate-900 border ${
                  errors.email ? "border-red-500" : "border-slate-600"
                } text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border ${
                  errors.password ? "border-red-500" : "border-slate-600"
                } text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors`}
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
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type={showPassword2 ? "text" : "password"}
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border ${
                  errors.password2 ? "border-red-500" : "border-slate-600"
                } text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-amber-400 transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword2 ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password2 && (
              <p className="text-red-400 text-sm mt-1">{errors.password2}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-600 disabled:cursor-not-allowed text-slate-900 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
              to="/login"
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
            <Link
              to="/"
              onClick={onClose}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors ml-4"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
