import express from "express";
// import { allMessages, sendMessage } from "../controller/messageController.js";

import { allMessages, sendMessage } from "../controllers/messageController.js";

import formidable from "express-formidable";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// router.post("/send", formidable(), isAuth, sendMessage);
router.post("/send", sendMessage);

router.get("/all/:chatId", allMessages);

export default router;
