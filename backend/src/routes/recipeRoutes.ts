import { Router } from 'express';
import { getRecipes, getRecipeById } from '../controllers/recipeController';

const router = Router();

router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);

export default router;