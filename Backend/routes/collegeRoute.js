import express from "express";
import {
  createCollegeController,
  getPhotoCollegeController,
  collegeSearchController,
} from "../controllers/collegeController.js";

import formidable from "express-formidable";

const router = express.Router();

router.post("/add", formidable(), createCollegeController);

router.get("/photo/:id", getPhotoCollegeController);

router.get("/search/:keyword", collegeSearchController);

export default router;
