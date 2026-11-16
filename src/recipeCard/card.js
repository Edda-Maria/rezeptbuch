import { cookingIcon, bakingIcon } from "../icons.js";
export function renderRecipes(recipes) {
  const recipeList = document.querySelector("#recipes");

  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipeList.append(card);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement("li");
  const categoryIcon = recipe.category === "cooking" ? cookingIcon : bakingIcon;
  card.innerHTML = `
  <div class="recipe-card">
  ${
    recipe.image
      ? `<img src="${recipe.image}" alt="${recipe.name}">`
      : `<div class="recipe-placeholder">${categoryIcon}</div>`
  }

    <h3>${recipe.name}</h3>
    <p>Zubereitungszeit: ${recipe.time}</p>
    <button class="ingredients-btn" ">Zutaten</button>
    </div>
  `;
  return card;
}
