import mongoose from "mongoose";

const requestCollegeSchema = new mongoose.Schema({
  useremail: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  state: { type: String, required: true },
});

export const requestCollegeModel = mongoose.model(
  "Requests",
  requestCollegeSchema
);

export default requestCollegeModel;
