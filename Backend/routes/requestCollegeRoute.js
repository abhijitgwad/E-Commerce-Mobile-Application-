import express from "express";

import formidable from "express-formidable";
import { requestCollegeController } from "../controllers/requestCollegeController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", requestCollegeController);
export default router;
