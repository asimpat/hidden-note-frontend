import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  // If user already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow access (e.g., login/register pages)
  return children;
}

export default PublicRoute;
