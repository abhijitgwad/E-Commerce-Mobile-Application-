import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    useremail: {
      type: String,
      require: [true, "User email is required"],
    },
    name: {
      type: String,
      require: [true, "name is required"],
    },
    description: {
      type: String,
      require: [true, "description is required"],
    },
    price: {
      type: Number,
      require: [true, "price is required"],
    },
    count: {
      type: Number,
    },
    category: {
      type: String,
      require: [true, "category is required"],
    },
    location: {
      type: String,
      require: [true, "category is required"],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamp: true }
);

export const productModel = mongoose.model("Products", productSchema);

export default productModel;
