import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  console.log(user, loading);

  if (loading) {
    return (
      <div className="text-center mt-20 text-muted-foreground">Загрузка...</div>
    );
  }

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
