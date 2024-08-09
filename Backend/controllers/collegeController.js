import e from "express";
import collegeModel from "../models/collegeModel.js";
import fs from "fs";

export const createCollegeController = async (req, res) => {
  const { name, state } = req.fields;
  const { photo } = req.files;
  try {
    const college = await collegeModel({
      name,
      state,
      photo,
    });

    if (photo) {
      college.photo.data = fs.readFileSync(photo.path);
      college.photo.contentType = photo.type;
    }

    college.save();
    res.status(200).send({
      success: true,
      message: "Successfully added new college",
      college,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating college data!!",
      error,
    });
  }
};

export const getPhotoCollegeController = async (req, res) => {
  try {
    const college = await collegeModel.findById(req.params.id);
    console.log(college);
    if (college.photo.data) {
      res.set("Content-type", college.photo.contentType);
      return res.status(200).send(college.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting college photo!!",
      error,
    });
  }
};

export const collegeSearchController = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const colleges = await collegeModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { state: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Successfully searched colleges",
      colleges,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in searching colleges",
      error,
    });
  }
};
