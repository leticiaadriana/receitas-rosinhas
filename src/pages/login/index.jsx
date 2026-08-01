import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import kirby from "../../assets/kirby.png"
import lele from "../../assets/strawberry_lele.png"
import './style.css';

export default function LoginPage(){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        setError();

        try{
            const response = await axios.post("http://localhost:5001/auth/login", {
                email,
                password,
            });

            if(response.data.firstAccess){
                localStorage.setItem("token", response.data.token);
                alert("Você precisa criar uma senha!");
                navigate("/reset-password");
                return;
            }
            localStorage.setItem("token", response.data.token);
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.error || "Erro ao fazer login");
        }
    }

    return(
        <section className="login-container">
            <div className="left">
                <img src={lele} alt="Lele com Chapéu de Morango"/>
                <img src={kirby} alt="Kirby com Chapéu de Chef"/>
            </div>
            <div className="right">
                <h3>₊˚⊹ Entrar ₊˚⊹</h3>
                <form onSubmit={handleLogin}>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <a className="forgot" href="/forgot-password">Esqueceu a senha?</a>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </section>
    )
}