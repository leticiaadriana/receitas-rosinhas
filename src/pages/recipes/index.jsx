import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/title";
import RecipeGrid from "../../components/recipeGrid";
import Banner from "../../components/banner";
import SectionDivider from "../../components/sectionDivider";
import cat from "../../assets/cupcat.png"
import "./style.css"

const api = axios.create({ baseURL: "http://localhost:5001" });

export default function RecipesPage(){
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Todos");

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await api.get("/recipe");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);

    function toggleFilter(type) {
        setFilter((current) => (current === type ? "Todos" : type));
    }

    const filteredRecipes = filter === "Todos"
        ? recipes
        : recipes.filter((r) => r.type === filter);

    return(
        <>
            <Banner/>
            <Title/>
            <section className="exploreSection">
                <h2 className="exploreTitle">--- Explore seu paladar ---</h2>
                <div className="filterButtons">
                    <button
                        className={`filterBtn ${filter === "Salgado" ? "active" : ""}`}
                        onClick={() => toggleFilter("Salgado")}
                    >
                        Salgados
                    </button>
                    <button
                        className={`filterBtn ${filter === "Doce" ? "active" : ""}`}
                        onClick={() => toggleFilter("Doce")}
                    >
                        <img src={cat}/>
                        Doces
                    </button>
                </div>
            </section>

            <section className="allRecipesSection">
                <SectionDivider/>
                <h2 className="allRecipesTitle">Todas as receitas</h2>

                {loading ? (
                    <p className="allRecipesStatus">Carregando receitas...</p>
                ) : (
                    <RecipeGrid recipes={filteredRecipes}/>
                )}
            </section>
        </>
    )
}
