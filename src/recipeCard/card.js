import { cookingIcon, bakingIcon } from "../icons.js";
export function renderRecipes(recipes) {
  const recipeList = document.querySelector("#recipes");

  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipeList.append(card);
  });
}

function renderField(label, value) {
  return value ? `<p>${label}: ${value}</p>` : "";
}

function renderImage(recipe, categoryIcon) {
  return recipe.image
    ? `<img src="${recipe.image}" alt="${recipe.name}">`
    : `<div class="recipe-placeholder">${categoryIcon}</div>`;
}

function createRecipeCard(recipe) {
  const card = document.createElement("li");
  const categoryIcon = recipe.category === "cooking" ? cookingIcon : bakingIcon;
  card.innerHTML = `
  <div class="recipe-card">
${renderImage(recipe, categoryIcon)}

    <h3>${recipe.name}</h3>
    <p> ${renderField("Zubereitungszeit", recipe.time)}</p>
    <button class="ingredients-btn" ">Zutaten</button>
    </div>
  `;
  return card;
}
