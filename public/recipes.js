import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";

import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";
import { showLogin } from "./login.js";

let recipesDiv = null;
let recipesTable = null;
let recipesTableHeader = null;

export const handleRecipes = () => {
  recipesDiv = document.getElementById("recipes");
  const logoff = document.getElementById("logoff");
  const addRecipe = document.getElementById("add-recipe");
  recipesTable = document.getElementById("recipes-table");
  recipesTableHeader = document.getElementById("recipes-table-header");

  recipesDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addRecipe) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      }
    }
  });
};

export const showRecipes = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [recipesTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        recipesTable.replaceChildren(...children);
      } else {
        for (let i = 0; i < data.recipes.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.recipes[i]._id}>edit</button></td>`;

          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.recipes[i]._id}>delete</button></td>`;

          let rowHTML = `
          <td>${data.recipes[i].title}</td>
          <td>${data.recipes[i].ingredients}</td>
          <td>${data.recipes[i].difficulty}</td>
          <div>${editButton} ${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        recipesTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.error(err);
    message.textContent = "A communications error occurred.";
  }
  enableInput(true);
  setDiv(recipesDiv);
};
