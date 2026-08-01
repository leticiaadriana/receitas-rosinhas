import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import recipeRoutes from "./routes/recipeRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Reaceitas Rosinhas Rodando!");
})

app.listen(5001, () => console.log("Servidor rodando na porta 5001"))