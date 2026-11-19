import "./style.css";
import "./recipeCard/card.css";
import "./recipeForm/form.css";

import { setupRecipeForm } from "./recipeForm/form.js";
import { renderRecipes } from "./recipeCard/card.js";
import { getRecipes } from "./storage.js";
import { cookingIcon, bakingIcon, dividerFloral } from "./icons.js";

setupRecipeForm();
const recipes = getRecipes();
renderRecipes(recipes);

document.querySelector("#cooking-icon").innerHTML = cookingIcon;
document.querySelector("#baking-icon").innerHTML = bakingIcon;
document.querySelector("#floral-divider").innerHTML = dividerFloral;
