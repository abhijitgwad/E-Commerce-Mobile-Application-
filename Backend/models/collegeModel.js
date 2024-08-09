import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

export const collegeModel = mongoose.model("college", collegeSchema);

export default collegeModel;
