import { saveRecipe } from "../storage.js";

export function setupRecipeForm() {
  const formContainer = document.querySelector("#form-container");
  const recipeForm = document.querySelector("#recipe-form");
  const closeButton = document.querySelector("#close-form");
  const resetButton = document.querySelector("#reset-form");
  const categoryButtons = document.querySelectorAll("[data-category]");

  let activeCategory = null;

  const recipeNameInput = document.querySelector("#recipe-name");
  const recipeTimeInput = document.querySelector("#recipe-time");
  const ingredientsInput = document.querySelector("#recipe-ingredients");
  const instructionsInput = document.querySelector("#recipe-instructions");
  const imageInput = document.querySelector("#recipe-image");

  if (!formContainer || !recipeForm || !closeButton || !resetButton) {
    return;
  }

  const hideForm = () => {
    formContainer.classList.add("hidden");
    categoryButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.classList.remove("is-active");
    });
  };

  const showForm = (activeButton) => {
    formContainer.classList.remove("hidden");
    categoryButtons.forEach((button) => {
      button.setAttribute("aria-expanded", String(button === activeButton));
      button.classList.toggle("is-active", button === activeButton);
    });
  };

  const resetCurrentCategory = () => {
    const categoryFields = document.querySelector("#category-fields");

    if (!categoryFields) {
      return;
    }

    if (!activeCategory) {
      categoryFields.innerHTML = "";
      return;
    }

    renderForm(activeCategory);
  };

  const resetForm = () => {
    recipeForm.reset();
    resetCurrentCategory();
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      formContainer.classList.toggle("cooking", activeCategory === "cooking");
      formContainer.classList.toggle("baking", activeCategory === "baking");
      showForm(button);
      renderForm(activeCategory);
      document.querySelector("#form-title")?.focus();
    });
  });

  closeButton.addEventListener("click", hideForm);

  resetButton.addEventListener("click", resetForm);

  recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Dynamische Felder basierend auf der Kategorie abrufen
    const subcategorySelect = document.querySelector("#subcategory");
    const customSubcategoryInput = document.querySelector(
      "#custom-subcategory",
    );
    const servingsInput = document.querySelector("#servings");
    const bakingShapeSelect = document.querySelector("#baking-shape");
    const diameterInput = document.querySelector("#diameter");
    const lengthInput = document.querySelector("#length");
    const widthInput = document.querySelector("#width");
    const piecesInput = document.querySelector("#pieces");

    const recipe = {
      name: recipeNameInput.value,
      time: recipeTimeInput.value,
      category: activeCategory,
      subcategory:
        subcategorySelect.value === "custom"
          ? customSubcategoryInput.value
          : subcategorySelect
            ? subcategorySelect.value
            : null,
      servings: servingsInput ? servingsInput.value : null,
      bakingShape: bakingShapeSelect ? bakingShapeSelect.value : null,
      diameter: diameterInput ? diameterInput.value : null,
      length: lengthInput ? lengthInput.value : null,
      width: widthInput ? widthInput.value : null,
      pieces: piecesInput ? piecesInput.value : null,
      ingredients: ingredientsInput.value,
      instructions: instructionsInput.value,
      image: imageInput ? imageInput.files[0] : null,
    };

    saveRecipe(recipe);
    resetForm();
    hideForm();
  });
}

function renderForm(category) {
  const title = document.querySelector("#form-title");
  const categoryFields = document.querySelector("#category-fields");

  if (!title || !categoryFields) {
    console.error("Formular-Container nicht gefunden.");
    return;
  }

  if (category === "cooking") {
    title.textContent = "Rezept kochen hinzufügen";
    categoryFields.innerHTML = `
     <div class="form-group">
    <label for="subcategory" class="form-label">
        Unterkategorie: </label>
        <select id="subcategory" class="form-fields" name="subcategory">
          <option value="">Bitte auswählen</option>
          <option value="hauptgericht">Hauptgerichte</option>
          <option value="beilage">Beilagen</option>
          <option value="salat">Salate</option>
          <option value="eintopf">Eintopf</option>
          <option value="custom">Benutzerdefiniert</option>
        </select>
        </div>
     

      <div id="custom-subcategory-wrap"></div>
<div class="form-group">
      <label for="servings" class="form-label">
        Personenzahl:</label>
        <input type="number" class="form-fields" id="servings" name="servings" min="1" />
      </div>
    `;

    const subcategorySelect = document.querySelector("#subcategory");
    const customWrap = document.querySelector("#custom-subcategory-wrap");

    if (subcategorySelect && customWrap) {
      const updateCustomCategory = () => {
        if (subcategorySelect.value === "custom") {
          customWrap.innerHTML = `
          <div class="form-group">
            <label for="custom-subcategory" class="form-label">
              Eigene Unterkategorie:
            </label>
            <input type="text" class="form-fields" id="custom-subcategory" name="custom-subcategory" placeholder="z. B. Pasta" />
          </div>
            `;
          return;
        }

        customWrap.innerHTML = "";
      };

      subcategorySelect.addEventListener("change", updateCustomCategory);
      updateCustomCategory();
    }
    return;
  }

  if (category === "baking") {
    title.textContent = "Rezept backen hinzufügen";
    categoryFields.innerHTML = `
    <div class="form-group">
  <label for="subcategory" class="form-label">
    Unterkategorie:
  </label>
<select id="subcategory" class="form-fields" name="subcategory">
  <option value="nachspeise">Nachspeisen</option>
  <option value="muffins">Muffins</option>
  <option value="kuchen">Kuchen</option>
  <option value="torten">Torten</option>
  <option value="custom">Benutzerdefiniert</option>
</select>
</div>

      <div id="custom-subcategory-wrap"></div>

      <div class="form-group">
      <label for="baking-shape" class="form-label">
        Art:
      </label>
      <select id="baking-shape" class="form-fields" name="baking-shape">
        <option value="">Bitte auswählen</option>
        <option value="round">Runde Backform</option>
        <option value="rectangular">Eckige Backform</option>
        <option value="pieces">Stückzahl</option>
      </select>
      </div>
      <div id="baking-details"></div>
    `;

    const subcategorySelect = document.querySelector("#subcategory");
    const customWrap = document.querySelector("#custom-subcategory-wrap");

    if (subcategorySelect && customWrap) {
      const updateCustomCategory = () => {
        if (subcategorySelect.value === "custom") {
          customWrap.innerHTML = `
          <div class="form-group">
            <label for="custom-subcategory" class="form-label">
              Eigene Unterkategorie:
            </label>
            <input type="text" class="form-fields" id="custom-subcategory" name="custom-subcategory" />
          </div>
            `;
          return;
        }

        customWrap.innerHTML = "";
      };

      subcategorySelect.addEventListener("change", updateCustomCategory);
      updateCustomCategory();
    }

    const shapeSelect = document.querySelector("#baking-shape");
    const bakingDetails = document.querySelector("#baking-details");

    if (!shapeSelect || !bakingDetails) {
      return;
    }

    const updateBakingDetails = () => {
      const shape = shapeSelect.value;

      if (shape === "round") {
        bakingDetails.innerHTML = `
        <div class="form-group">
          <label for="diameter" class="form-label">
            Durchmesser (cm)
          </label>
          <input type="number" class="form-fields" id="diameter" name="diameter" min="1" />
       </div>
          `;
        return;
      }

      if (shape === "rectangular") {
        bakingDetails.innerHTML = `
        <div class="form-group">
          <label for="length" class="form-label">
            Länge (cm)
          </label>
          <input type="number" class="form-fields" id="length" name="length" min="1" />
          </div>
          <div class="form-group">
          <label for="width" class="form-label">
            Breite (cm)
          </label>
          <input type="number" class="form-fields" id="width" name="width" min="1" />
          </div>
        `;
        return;
      }

      if (shape === "pieces") {
        bakingDetails.innerHTML = `
        <div class="form-group">
          <label for="pieces" class="form-label">
            Stückzahl
          </label>
          <input type="number" class="form-fields" id="pieces" name="pieces" min="1" />
        </div>
        `;
        return;
      }

      bakingDetails.innerHTML = "";
    };

    shapeSelect.addEventListener("change", updateBakingDetails);
    updateBakingDetails();
    return;
  }

  title.textContent = "Rezept hinzufügen";
  categoryFields.innerHTML = "";
}
