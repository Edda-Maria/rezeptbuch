export function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  console.log(recipes);
}
