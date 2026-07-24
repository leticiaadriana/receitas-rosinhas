import "./style.css"
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <header className="header">
            <nav className="nav">
                <Link to="/">Início</Link>
                <Link to="/receitas">Receitas</Link>
                <Link to="/sobre">Sobre</Link>
            </nav>
        </header>
    );
}