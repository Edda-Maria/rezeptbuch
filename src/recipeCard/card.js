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
  card.addEventListener("click", () => {
    renderRecipeLightbox(recipe);
  });

  card.innerHTML = `
  <div class="recipe-card ${recipe.category}">
    <div class="recipe-content">
     <h3>${recipe.name}</h3>
     <p> ${renderField("Zubereitungszeit", recipe.time)}</p>
    </div>
    <div class="recipe-media">
      ${renderImage(recipe, categoryIcon)}
      <button class="ingredients-btn">Zutaten</button>

    </div>
  `;

  const ingredients = card.querySelector(".ingredients-btn");
  ingredients.addEventListener("click", (event) => {
    event.stopPropagation();
    renderRecipeLightbox(recipe, "ingredients");
  });
  return card;
}

export function renderRecipeLightbox(recipe, activeTab = "details") {
  if (activeTab === "ingredients") {
    showIngredients(recipe);
  } else {
    showDetails(recipe);
  }
}
