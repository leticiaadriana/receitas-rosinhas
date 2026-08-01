import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const api = axios.create({ baseURL: "http://localhost:5001" });

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/recipe/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível encontrar essa receita.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p className="recipe-detail-status">Carregando receita...</p>;
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-status">
        <p>{error || "Receita não encontrada."}</p>
        <Link to="/receitas" className="recipe-detail-back">← Voltar para receitas</Link>
      </div>
    );
  }

  return (
    <section className="recipe-detail-page">
      <div className="recipe-detail-container">
        <Link to="/receitas" className="recipe-detail-back">← Voltar para receitas</Link>

        <div className="recipe-detail-header">
          <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
          <div className="recipe-detail-info">
            <span className="recipe-detail-type">{recipe.type}</span>
            <h1 className="recipe-detail-title">{recipe.name}</h1>
            {recipe.description && (
              <p className="recipe-detail-description">{recipe.description}</p>
            )}
          </div>
        </div>

        <div className="recipe-detail-body">
          {recipe.ingredients?.length > 0 && (
            <div className="recipe-detail-section">
              <h2>Ingredientes</h2>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {recipe.prepair?.length > 0 && (
            <div className="recipe-detail-section">
              <h2>Modo de Preparo</h2>
              <ol>
                {recipe.prepair.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
