import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected() {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}
