import "./style.css";
import "./recipeCard/card.css";
import "./recipeForm/form.css";

import { setupRecipeForm } from "./recipeForm/form.js";
import { renderRecipes } from "./recipeCard/card.js";
import { getRecipes } from "./storage.js";

setupRecipeForm();
const recipes = getRecipes();
renderRecipes(recipes);
