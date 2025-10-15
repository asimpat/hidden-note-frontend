import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
   const token = localStorage.getItem("access_token");

  // If no token found, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the protected page
  return children;
}

export default ProtectedRoute;
