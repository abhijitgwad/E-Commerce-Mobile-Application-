import express from "express";
import { testcontroller } from "../controllers/testcontroller.js";

const router = express.Router();

router.get("/test", testcontroller);

export default router;
