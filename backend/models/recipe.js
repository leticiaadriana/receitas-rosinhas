import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ["Doce", "Salgado"],
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    ingredients: {
        type: [String], 
        default: [""],
    },
    prepair: {
      type: [String],
      defualt: [""]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
}, { timestamps: true })

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
