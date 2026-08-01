import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    async function verify() {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        setAuthorized(!isExpired);
      } catch {
        setAuthorized(false);
      }
    }
    verify();
  }, []);

  if (authorized === null) return <div>Carregando...</div>;

  return authorized ? children : <Navigate to="/login" />;
}