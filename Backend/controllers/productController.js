import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    console.log(req.fields);
    const { name, description, price, category, photobase64, location } =
      req.fields;
    // const { photo } = req.files;

    const useremail = req.useremail;
    const count = 0;

    // const photo = {
    //   data: {
    //     $binary: {
    //       base64: photobase64,
    //       subType: "00",
    //     },
    //   },
    // };

    const photo = {
      data: Buffer.from(photobase64, "base64"), // Convert base64 to Buffer
      contentType: "image/jpeg", // Or other appropriate content type
    };

    // console.log("photo uploaded is : ", photo);
    //validation
    switch (true) {
      case !useremail:
        return res.status(500).send({ error: "User email is Required!!!" });
      case !name:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !location:
        return res.status(500).send({ error: "location is Required!!!" });

      case photo && photo.size > 10000000:
        return res.status(500).send({
          error: "Photo is Required or photo sould be less than 1mb!!!",
        });
    }

    const product = await new productModel({
      useremail,
      name,
      description,
      price,
      category,
      count,
      photo,
      location,
    });

    // if (photo) {
    //   product.photo.data = fs.readFileSync(photo.path);
    //   product.photo.contentType = photo.type;
    // }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while creating product!!",
    });
  }
};

//get product

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: product.length,
      message: "ALL products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while listing all Products!!",
      error: error.message,
    });
  }
};

//get single product

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "single products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product!!",
      error,
    });
  }
};

//get product photo

export const getPhotoProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo!!",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    console.log(product.useremail);
    console.log(req.useremail);
    if (product.useremail != req.useremail) {
      res.status(500).send({
        success: false,
        message:
          "Error while deleting product, mail did not matched login again!!",
        error,
      });
    } else {
      const result = await productModel.findByIdAndDelete(req.params.pid);
      res.status(200).send({
        success: true,
        message: "Product deleted successfully!!!",
        result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product!!",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  const product = await productModel.findById(req.params.pid);
  console.log(product.useremail);
  console.log(req.useremail);
  if (product.useremail != req.useremail) {
    res.status(500).send({
      success: false,
      message:
        "Error while Updating product, mail did not matched login again!!",
      error,
    });
  }

  try {
    console.log(req.fields);
    const { name, description, price, category } = req.fields;
    const { photo } = req.files;
    const useremail = req.useremail;
    // const count = 0;
    //validation
    switch (true) {
      case !useremail:
        return res.status(500).send({ error: "User email is Required!!!" });
      case !name:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!!!" });

      case photo && photo.size > 10000000:
        return res.status(500).send({
          error: "Photo is Required or photo sould be less than 1mb!!!",
        });
    }

    // if (photo) {
    //   photo.data = fs.readFileSync(photo.path);
    //   photo.contentType = photo.type;
    // }

    const product = await productModel.findByIdAndUpdate(req.params.pid, {
      useremail,
      name,
      description,
      price,
      category,
      photo,
    });

    product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully!!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product!!",
      error,
    });
  }
};

export const getUserProductController = async (req, res) => {
  const useremail = req.useremail;
  try {
    const products = await productModel.find({ useremail }).select("-photo");
    res.status(200).send({
      success: true,
      message: "User product accessed successfully!!!",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting user Product!!",
      error,
    });
  }
};

export const getCategoryProductController = async (req, res) => {
  const category = req.params.category;
  console.log("categroy ", category);
  try {
    const products = await productModel.find({ category }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Category wise product accessed successfully!!!",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Category wise Product!!",
      error,
    });
  }
};

export const productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Successfully searched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in searching product",
      error,
    });
  }
};

export const getLocationProductController = async (req, res) => {
  const location = req.params.location;
  // console.log("categroy ", category);
  try {
    const products = await productModel.find({ location }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Category wise product accessed successfully!!!",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Category wise Product!!",
      error,
    });
  }
};
