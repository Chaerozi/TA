import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {

  const token = localStorage.getItem("token");

  // kalau belum login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // kalau sudah login
  return children;
}