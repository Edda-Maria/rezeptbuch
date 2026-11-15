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
  card.classList.add("recipe-card");
  card.innerHTML = `
    <h3>${recipe.name}</h3>
    <p>Zubereitungszeit: ${recipe.time}</p>
    <p>Zutaten: ${recipe.ingredients}</p>
    <p>Anleitung: ${recipe.instructions}</p>
    <img src="${recipe.image}" alt="${recipe.name}">
  `;
  return card;
}
