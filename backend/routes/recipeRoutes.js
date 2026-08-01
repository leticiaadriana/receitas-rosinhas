import { Router } from "express";
import { 
    createRecipe, 
    getRecipes, 
    getRecipeById,
    updateRecipe,
    deleteRecipe 
} from "../controllers/recipeController.js";

import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", verifyToken, createRecipe);
router.put("/:id", verifyToken, updateRecipe);
router.delete("/:id", verifyToken,deleteRecipe);

export default router;