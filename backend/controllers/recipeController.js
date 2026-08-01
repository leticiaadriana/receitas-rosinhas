import Recipe from "../models/recipe.js";

export const createRecipe = async (req, res) => {
    try {
        const { name, image, type, description, ingredients, prepair } = req.body;
        if(!name || !type){
            return res.status(400).json({ error: "Nome e tipo são obrigatórios!"})
        }
        const recipe = await Recipe.create({
            name, 
            image,
            type,
            description,
            ingredients,
            prepair,
            user: req.user.id
        })
        return res.status(201).json(recipe);
    } catch (error){
        return res.status(500).json({ message: "Erro ao criar receita.", error: error.message })
    }
}

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        return res.status(200).json(recipes);
      } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar receitas.", error: error.message });
      }

}

export const getRecipeById = async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if(!recipe){
            return res.status(404).json({ message: "Receita não encontrada." });
        }
        return res.status(200).json(recipe);
    } catch(error){
        return res.status(500).json({ message: "Erro ao buscar receita." , error: error.message})
    }
}

export const updateRecipe = async (req, res) => {
    try {
        const { name, image, type, description, ingredients, prepair } = req.body;

        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { name, image, type, description, ingredients, prepair },
            { new: true, runValidators: true }
        )

        if(!recipe){
            return res.status(404).json({ message: "Receita não encontrada."})
        }
        return res.status(200).json(recipe)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar receita.", error: error.message })
    }
}

export const deleteRecipe = async (req, res) => {
    try{
        const recipe = await Recipe.findOneAndDelete({_id: req.params.id, user: req.user.id });
        if(!recipe){
            return res.status(404).json("Receita não encontrada.");
        }
        return res.status(200).json({ message: "Receita deletada com sucesso."});
    } catch (error){
        return res.status(500).json({ message: "Erro ao deletar receita", error: error.message });
    }
}