import { useEffect, useState } from "react";
import axios from "axios";
import RecipeModal from "../../components/adminForms";
import Banner from "../../components/banner"
import "./style.css"

const api = axios.create({ baseURL: "http://localhost:5001" });

export default function AdminPage(){
    const [ recipes, setRecipes ] = useState([]);
    const [ selectedRecipe, setSelectedRecipe ] = useState(null);
    const [loading, setLoading ] = useState(true);

    async function fetchRecipes() {
        setLoading(true);
        try {
            const response = await api.get("/recipe");
            setRecipes(response.data);
        } catch (err) {
            console.error(err);
            alert("Erro ao carregar receitas");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    function getAuthHeader() {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    async function handleSave(recipeData) {
        try {
            if (recipeData._id) {
                await api.put(`/recipe/${recipeData._id}`, recipeData, getAuthHeader());
            } else {
                await api.post("/recipe", recipeData, getAuthHeader());
            }
            fetchRecipes();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Erro ao salvar receita");
        }
    }
    async function handleDelete(_id){
        try{
            await api.delete(`/recipe/${_id}`, getAuthHeader());
            fetchRecipes();
        } catch(err){
            console.error(err);
            alert(err.response?.data?.error || "Erro ao deletar receita")
        }
    }
    
    return (
        <div className="admin-page">
            <Banner/>
            <div className="admin-header">
                <div>
                    <h1>Gerenciar Receitas</h1>
                    <p className="subtitle">Adicione, edite ou remova suas receitas ✿</p>
                </div>
                <button className="new-recipe-btn" onClick={() => setSelectedRecipe({})}>
                    + Nova Receita
                </button>
            </div>

            <div className="admin-divider" />

            {loading && <p className="admin-status">Carregando receitas...</p>}

            {!loading && recipes.length === 0 && (
                <div className="empty-state">
                <h2>Nenhuma receita ainda</h2>
                <p>Comece adicionando sua primeira receitinha!</p>
                </div>
            )}

            <div className="recipe-grid">
                {recipes.map((r) => (
                <div key={r._id} className="recipe-card" onClick={() => setSelectedRecipe(r)}>
                    <img src={r.image} alt={r.name} className="recipe-card-image" />
                    <div className="recipe-card-body">
                        <span className="recipe-card-type">{r.type}</span>
                        <h3 className="recipe-card-title">{r.name}</h3>
                    </div>
                </div>
                ))}
            </div>

            {selectedRecipe && (
                <RecipeModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onSave={handleSave}
                onDelete={handleDelete}
                />
            )}
        </div>
    );
}