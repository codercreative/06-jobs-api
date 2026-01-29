import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showRecipes } from "./recipes.js";

let addEditDiv = null;
let title = null;
let ingredients = null;
let difficulty = null;
let addingRecipe = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-recipe");
  title = document.getElementById("title");
  ingredients = document.getElementById("ingredients");
  difficulty = document.getElementById("difficulty");
  addingRecipe = document.getElementById("adding-recipe");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingRecipe) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/recipes";

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              ingredients: ingredients.value
                .split(", ")
                .map((item) => item.trim()),
              difficulty: difficulty.value,
            }),
          });

          const data = await response.json();
          if (response.status === 201) {
            message.textContent = "The recipe was entered";

            title.value = "";
            ingredients.value = "";
            difficulty.value = "easy";

            showRecipes();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.error(err);
          message.textContent = " A communications error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showRecipes();
      }
    }
  });
};

export const showAddEdit = async (recipeId) => {
  if (!recipeId) {
    title.value = "";
    ingredients.value = "";
    difficulty.value = "easy";
    addingRecipe.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/recipes/${recipeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        title.value = data.recipe.title;
        ingredients.value = data.recipe.ingredients;
        difficulty.value = data.recipe.difficulty;
        addingRecipe.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = recipeId;

        setDiv(addEditDiv);
      } else {
        message.textContent = "The recipe entry was not found.";
        showRecipes();
      }
    } catch (err) {
      console.error(err);
      message.textContent = "A communications error has occurred.";
      showRecipes();
    }
    enableInput(true);
  }
};
