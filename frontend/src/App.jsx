import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Navbar from "./components/landing/NavBar";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";

// Pages
import AuthPage from "./pages/AuthPage"; // Your login/signup page
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import SendMessage from "./pages/SendMessage";
import MessageDetail from "./components/dashboard/messageDetails";
// import NotFound from "./pages/NotFound";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page - Public */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="max-w-7xl mx-auto pt-20 px-6">
                <Hero />
                <Features />
                <CTA />
              </div>
              <Footer />
            </>
          }
        />

        {/* Auth Pages - Public only (redirect to dashboard if logged in) */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <AuthPage mode="signup" onAuthSuccess={handleAuthSuccess} />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} />
            </PublicRoute>
          }
        />

        {/* Dashboard - Protected Route (must be logged in) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard onSignOut={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Send Message Page - Public (anyone with link can send) */}
        <Route path="/to/:secretLink" element={<SendMessage />} />

        {/* 404 Page */}
        {/* <Route path="/404" element={<NotFound />} /> */}

        {/* Catch all undefined routes */}
        <Route path="*" element={<Navigate to="/404" replace />} />

        <Route path="/message/:id" element={<MessageDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
