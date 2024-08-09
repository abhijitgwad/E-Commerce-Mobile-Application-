import express from "express";
import { registerController } from "../controllers/userController.js";
import { isAuth } from "../middleware/auth.js";
import Formidable from "express-formidable";

const router = express.Router();

router.post("/register", Formidable(), isAuth, registerController);

router.get("/auth", isAuth);

router.post("/addLocation", isAuth);

export default router;
