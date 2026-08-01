import { Link } from "react-router-dom";
import "./style.css";

export default function RecipeGrid({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <p className="recipe-grid-empty">Nenhuma receita encontrada.</p>;
  }

  return (
    <div className="public-recipe-grid">
      {recipes.map((r) => (
        <Link to={`/receitas/${r._id}`} key={r._id} className="public-recipe-card">
          <img src={r.image} alt={r.name} className="public-recipe-image" />
          <h3 className="public-recipe-title">{r.name}</h3>
        </Link>
      ))}
    </div>
  );
}
