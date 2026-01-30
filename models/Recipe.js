const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a recipe title"],
      maxlength: 50,
    },
    ingredients: {
      type: [String],
      required: [true, "Please provide at least one ingredient"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
