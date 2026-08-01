import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SectionDivider from "../../components/sectionDivider";
import RecipeGrid from "../../components/recipeGrid"
import Banner from "../../components/banner";
import Title from "../../components/title";
import cat from "../../assets/cupcat.png"
import "./style.css"

const api = axios.create({ baseURL: "http://localhost:5001" });

export default function HomePage(){
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await api.get("/recipe");
                setRecipes(response.data.slice(0, 3)); 
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);
    
    return(
        <>
            <Banner/>
            <Title/>
            <section className="purpleSection">
                <img src={cat} alt="Desenho de um gatinho"/>
                <h3>"Qualquer um pode cozinhar" - Ratatouille</h3>
            </section>
            <section className="homeRecipesSection">
                <SectionDivider/>
                <h2 className="homeRecipesTitle">Descubra novas receitas</h2>

                {loading ? (
                    <p className="homeRecipesStatus">Carregando receitas...</p>
                ) : (
                    <RecipeGrid recipes={recipes}/>
                )}

                <div className="verMaisWrapper">
                    <Link to="/receitas" className="verMaisBtn">Ver mais</Link>
                </div>
            </section>            
        </>
    )
}