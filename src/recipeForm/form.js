export function setupRecipeForm() {
  const formContainer = document.querySelector("#form-container");
  const recipeForm = document.querySelector("#recipe-form");
  const closeButton = document.querySelector("#close-form");
  const resetButton = document.querySelector("#reset-form");

  let activeCategory = null;

  if (!formContainer || !recipeForm || !closeButton || !resetButton) {
    return;
  }

  const hideForm = () => {
    formContainer.classList.add("hidden");
    formContainer.setAttribute("aria-hidden", "true");
  };

  const showForm = () => {
    formContainer.classList.remove("hidden");
    formContainer.setAttribute("aria-hidden", "false");
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

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      formContainer.classList.toggle("cooking", activeCategory === "cooking");
      formContainer.classList.toggle("baking", activeCategory === "baking");
      document.querySelectorAll("[data-category]").forEach((categoryButton) => {
        categoryButton.classList.toggle("is-active", categoryButton === button);
      });
      showForm();
      renderForm(activeCategory);
    });
  });

  closeButton.addEventListener("click", () => {
    hideForm();
  });

  resetButton.addEventListener("click", () => {
    recipeForm.reset();
    resetCurrentCategory();
  });

  recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    hideForm();
  });

  hideForm();
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
      <label>
        Unterkategorie
        <select id="cooking-subcategory" name="cooking-subcategory">
          <option value="">Bitte auswählen</option>
          <option value="hauptgericht">Hauptgerichte</option>
          <option value="beilage">Beilagen</option>
          <option value="salat">Salate</option>
          <option value="eintopf">Eintopf</option>
          <option value="custom">Benutzerdefiniert</option>
        </select>
      </label>

      <div id="custom-subcategory-wrap"></div>

      <label>
        Personenzahl
        <input type="number" name="servings" min="1" />
      </label>
    `;

    const subcategorySelect = document.querySelector("#cooking-subcategory");
    const customWrap = document.querySelector("#custom-subcategory-wrap");

    if (subcategorySelect && customWrap) {
      const updateCustomCategory = () => {
        if (subcategorySelect.value === "custom") {
          customWrap.innerHTML = `
            <label>
              Eigene Unterkategorie
              <input type="text" name="custom-subcategory" placeholder="z. B. Pasta" />
            </label>
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
      <label>
        Unterkategorie
        <select id="baking-subcategory" name="baking-subcategory">
          <option value="nachspeise">Nachspeisen</option>
          <option value="muffins">Muffins</option>
          <option value="kuchen">Kuchen</option>
          <option value="torten">Torten</option>
          <option value="custom">Benutzerdefiniert</option>
        </select>
      </label>

      <div id="custom-subcategory-wrap"></div>

      <label for="baking-shape">Art</label>
      <select id="baking-shape" name="baking-shape">
        <option value="">Bitte auswählen</option>
        <option value="round">Runde Backform</option>
        <option value="rectangular">Eckige Backform</option>
        <option value="pieces">Stückzahl</option>
      </select>
      <div id="baking-details"></div>
    `;

    const subcategorySelect = document.querySelector("#baking-subcategory");
    const customWrap = document.querySelector("#custom-subcategory-wrap");

    if (subcategorySelect && customWrap) {
      const updateCustomCategory = () => {
        if (subcategorySelect.value === "custom") {
          customWrap.innerHTML = `
            <label>
              Eigene Unterkategorie
              <input type="text" name="custom-subcategory" placeholder="z. B. Brownies" />
            </label>
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
          <label>
            Durchmesser (cm)
            <input type="number" name="diameter" min="1" />
          </label>
        `;
        return;
      }

      if (shape === "rectangular") {
        bakingDetails.innerHTML = `
          <label>
            Länge (cm)
            <input type="number" name="side-length" min="1" />
          </label>
          <label>
            Breite (cm)
            <input type="number" name="width" min="1" />
          </label>
        `;
        return;
      }

      if (shape === "pieces") {
        bakingDetails.innerHTML = `
          <label>
            Stückzahl
            <input type="number" name="pieces" min="1" />
          </label>
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
