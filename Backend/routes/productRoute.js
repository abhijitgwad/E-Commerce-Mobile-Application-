import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  getPhotoProductController,
  deleteProductController,
  updateProductController,
  getUserProductController,
  getCategoryProductController,
  productSearchController,
  getLocationProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-product", formidable(), isAuth, createProductController);

//get all product
router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:pid", getSingleProductController);

//get photo product
router.get("/get-photo/:pid", getPhotoProductController);

//get delete product
router.delete(
  "/delete-product/:pid",
  formidable(),
  isAuth,
  deleteProductController
);

//updating product
router.post(
  "/update-product/:pid",
  formidable(),
  isAuth,
  updateProductController
);

//Getting user listed product
router.post("/user-product", formidable(), isAuth, getUserProductController);

//Getting Cateogry product
router.get("/category-product/:category", getCategoryProductController);

//Getting search product
router.get("/search-product/:keyword", productSearchController);

//Getting Location-wise product
router.get("/location-product/:location", getLocationProductController);

export default router;
