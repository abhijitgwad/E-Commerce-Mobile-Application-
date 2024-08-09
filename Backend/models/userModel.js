import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email number is required"],
      unique: [true, "email number already taken"],
    },
    college: {
      type: String,
      require: [true, "college is required"],
    },
  },
  { timestamp: true }
);

export const userModel = mongoose.model("users", userSchema);

export default userModel;
