export function setupRecipeForm() {
  const formContainer = document.querySelector("#form-container");
  const recipeForm = document.querySelector("#recipe-form");
  const closeButton = document.querySelector("#close-form");
  const resetButton = document.querySelector("#reset-form");
  const categoryButtons = document.querySelectorAll("[data-category]");

  let activeCategory = null;

  if (!formContainer || !recipeForm || !closeButton || !resetButton) {
    return;
  }

  const hideForm = () => {
    formContainer.classList.add("hidden");
    categoryButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  };

  const showForm = (activeButton) => {
    formContainer.classList.remove("hidden");
    categoryButtons.forEach((button) => {
      button.setAttribute("aria-expanded", String(button === activeButton));
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

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      formContainer.classList.toggle("cooking", activeCategory === "cooking");
      formContainer.classList.toggle("baking", activeCategory === "baking");
      categoryButtons.forEach((categoryButton) => {
        categoryButton.classList.toggle("is-active", categoryButton === button);
      });
      showForm(button);
      renderForm(activeCategory);
      document.querySelector("#form-title")?.focus();
    });
  });

  closeButton.addEventListener("click", () => {
    categoryButtons.forEach((button) => {
      button.classList.remove("is-active");
    });
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
      <label for="subcategory">
        Unterkategorie </label>
        <select id="subcategory" name="subcategory">
          <option value="">Bitte auswählen</option>
          <option value="hauptgericht">Hauptgerichte</option>
          <option value="beilage">Beilagen</option>
          <option value="salat">Salate</option>
          <option value="eintopf">Eintopf</option>
          <option value="custom">Benutzerdefiniert</option>
        </select>
     

      <div id="custom-subcategory"></div>

      <label for="servings">
        Personenzahl</label>
        <input type="number" id="servings" name="servings" min="1" />
      
    `;

    const subcategorySelect = document.querySelector("#subcategory");
    const customWrap = document.querySelector("#custom-subcategory");

    if (subcategorySelect && customWrap) {
      const updateCustomCategory = () => {
        if (subcategorySelect.value === "custom") {
          customWrap.innerHTML = `
            <label for="custom-subcategory">
              Eigene Unterkategorie</label>
              <input type="text" id="custom-subcategory" name="custom-subcategory" placeholder="z. B. Pasta" />
            
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
  <label for="subcategory">Unterkategorie</label>
<select id="subcategory" name="subcategory">
  <option value="nachspeise">Nachspeisen</option>
  <option value="muffins">Muffins</option>
  <option value="kuchen">Kuchen</option>
  <option value="torten">Torten</option>
  <option value="custom">Benutzerdefiniert</option>
</select>

      <div id="custom-subcategory"></div>

      <label for="baking-shape">Art</label>
      <select id="baking-shape" name="baking-shape">
        <option value="">Bitte auswählen</option>
        <option value="round">Runde Backform</option>
        <option value="rectangular">Eckige Backform</option>
        <option value="pieces">Stückzahl</option>
      </select>
      <div id="baking-details"></div>
    `;

    const subcategorySelect = document.querySelector("#subcategory");
    const customWrap = document.querySelector("#custom-subcategory");

    if (subcategorySelect && customWrap) {
      const updateCustomCategory = () => {
        if (subcategorySelect.value === "custom") {
          customWrap.innerHTML = `
            <label for="custom-subcategory">
              Eigene Unterkategorie
            </label>
            <input type="text" id="custom-subcategory" name="custom-subcategory" placeholder="z. B. Brownies" />
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
          <label for="diameter">
            Durchmesser (cm)</label>
            <input type="number" id="diameter" name="diameter" min="1" />
          
        `;
        return;
      }

      if (shape === "rectangular") {
        bakingDetails.innerHTML = `
          <label for="length">
            Länge (cm)
          </label>
          <input type="number" id="length" name="length" min="1" />
          <label for="width">
            Breite (cm) </label>
            <input type="number" id="width" name="width" min="1" />
         
        `;
        return;
      }

      if (shape === "pieces") {
        bakingDetails.innerHTML = `
          <label for="pieces">
            Stückzahl</label>
            <input type="number" id="pieces" name="pieces" min="1" />
          
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
