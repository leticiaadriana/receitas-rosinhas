import { useEffect, useState } from "react";
import "./style.css"

export default function RecipeModal({ recipe, onClose, onSave, onDelete }){
    const [name, setName] = useState(recipe?.name || "");
    const [imageUrl, setImageUrl] = useState(recipe?.image || "");
    const [type, setType] = useState(recipe?.type || "");
    const [description, setDescription] = useState(recipe?.description || "");
    const [ingredients, setIngredients] = useState(
        recipe?.ingredients?.length ? recipe.ingredients : [""]
    );
    const [prepair, setPrepair] = useState(
        recipe?.prepair?.length ? recipe.prepair : [""]
    );

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = "";
        }
    }, []);

    if (!recipe) return null;

    const handleClose = () => {
        document.body.style.overflow = "";
        onClose();
    }

    const handleIngredientChange = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;

        if (index === updated.length - 1 && value.trim() !== "") {
        updated.push("");
        }
        setIngredients(updated);
    }

    const handleRemoveIngredient = (index) => {
        if (ingredients.length === 1) return; // mantém pelo menos um campo
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated);
    }

    const handlePrepairChange = (index, value) => {
        const updated = [...prepair];
        updated[index] = value;

        if (index === updated.length - 1 && value.trim() !== "") {
        updated.push("");
        }
        setPrepair(updated);
    }

    const handleRemovePrepair = (index) => {
        if (prepair.length === 1) return;
        const updated = prepair.filter((_, i) => i !== index);
        setPrepair(updated);
    }

    const handleSave = () => {
        const cleanIngredients = ingredients.filter(i => i.trim() !== "");
        const cleanPrepair = prepair.filter(p => p.trim() !== "");

        const updateRecipe = {
        ...recipe,
        name,
        description,
        image: imageUrl,
        type,
        ingredients: cleanIngredients,
        prepair: cleanPrepair,
        }
        onSave(updateRecipe);
        handleClose();
    }

    const handleDelete = () => {
        onDelete(recipe._id);
        handleClose();
    }

    return(
        <section className="modal-overlay" onClick={handleClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>X</button>

            <div className="modal-left">
            <img src={imageUrl} alt={name} className="modal-main-img"/>
            </div>

            <div className="modal-right">
            <h3>Editar Receita</h3>

            <label className="info-label">Nome:</label>
            <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="info-label">URL da Imagem:</label>
            <input
                type="text"
                className="input-field"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
            />

            <label className="info-label">Tipo:</label>
            <select
                className="input-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Selecione</option>
                <option value="Doce">Doce</option>
                <option value="Salgado">Salgado</option>
            </select>

            <label className="info-label">Descrição:</label>
            <textarea
                className="input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label className="info-label">Ingredientes:</label>
            {ingredients.map((ing, index) => (
                <div key={index} className="dynamic-field-row">
                <input
                    type="text"
                    className="input-field"
                    value={ing}
                    placeholder={`Ingrediente ${index + 1}`}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                {ingredients.length > 1 && (
                    <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveIngredient(index)}
                    >
                    ×
                    </button>
                )}
                </div>
            ))}

            <label className="info-label">Modo de Preparo:</label>
            {prepair.map((step, index) => (
                <div key={index} className="dynamic-field-row">
                <textarea
                    className="input-field"
                    value={step}
                    placeholder={`Passo ${index + 1}`}
                    onChange={(e) => handlePrepairChange(index, e.target.value)}
                />
                {prepair.length > 1 && (
                    <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemovePrepair(index)}
                    >
                    ×
                    </button>
                )}
                </div>
            ))}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button className="save-btn" onClick={handleSave}>
                Salvar Alterações
                </button>

                {recipe._id && (
                <button className="save-btn" onClick={handleDelete}>
                    Deletar
                </button>
                )}
            </div>
            </div>
        </div>
        </section>
    )
}