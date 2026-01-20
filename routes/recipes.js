const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes");

// CRUD functionality for Recipes API
router.get("/", getAllRecipes);
router.get("/:id", getRecipe);
router.post("/", createRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
