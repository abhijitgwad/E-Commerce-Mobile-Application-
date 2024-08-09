import express from "express";
import {
  accesschat,
  deleteController,
  fetchchat,
} from "../controllers/chatController.js";
import formidable from "express-formidable";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// router.get("/all", formidable(), isAuth, fetchchat);
router.get("/sample/:id", fetchchat);

// router.delete("/delete", formidable(), isAuth, deleteController);
// router.get("/:id", formidable(), isAuth, accesschat);
router.get("/:id", accesschat);

export default router;
