const Recipe = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllRecipes = async (req, res) => {
  res.send("get all recipes");
};

const getRecipe = async (req, res) => {
  res.send("get recipe");
};

const createRecipe = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

const updateRecipe = async (req, res) => {
  res.send("update recipe");
};

const deleteRecipe = async (req, res) => {
  res.send("delete recipe");
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
