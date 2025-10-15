import React, { useState, useEffect } from "react";
import SignUpModal from "../components/auth/SignUpModal";
import LoginModal from "../components/auth/LoginModal";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";
import messageBg from "../assets/img/message.png";

const AuthPage = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${messageBg})`,
        }}
      >
        {location.pathname === "/signup" && (
          <SignUpModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAuthSuccess={onAuthSuccess}
          />
        )}
        {location.pathname === "/login" && (
          <LoginModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAuthSuccess={onAuthSuccess}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
