import { Router } from "express";
import { login, resetPassword } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/login", login);
router.put("/reset-password", verifyToken, resetPassword);

export default router;