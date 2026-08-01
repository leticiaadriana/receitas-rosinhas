import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const api = axios.create({ baseURL: "http://localhost:5001" });

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleReset(e) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await api.put(
        "/auth/reset-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="reset-password-container">
      <div className="reset-password-box">
        <h3>₊˚⊹ Crie sua senha ₊˚⊹</h3>
        <p className="reset-subtitle">
          Este é seu primeiro acesso, defina uma nova senha para continuar.
        </p>
        <form onSubmit={handleReset}>
          <label>Nova senha:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirmar senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar senha"}
          </button>
        </form>
      </div>
    </section>
  );
}