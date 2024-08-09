import { userModel } from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    console.log("sdf");
    const { college } = req.fields;
    const email = req.useremail;
    console.log(college);
    console.log(email);
    if (!email || !college) {
      return res.status(500).send({
        success: false,
        message: "Please provide all the field",
      });
    }

    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      const result = await userModel.findByIdAndUpdate(existinguser._id, {
        college,
      });

      result.save();
      return res.status(200).send({
        success: true,
        message: "College updated Successfully!!!",
        result,
      });
    }

    const user = await userModel.create({
      email,
      college,
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "Registeration success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { email, name, college } = res.body;

    if (!name || !email || !college) {
      return res.status(500).send({
        success: false,
        message: "Please provide all the field",
      });
    }

    const user = await userModel.findByIdAndUpdate(req.params.uid, {
      college,
    });
  } catch (error) {}
};

export const addLocationController = async (req, res) => {
  try {
    const { email, college } = req.body;
    if (!email || !college) {
      return res.status(500).send({
        success: false,
        message: "Please provide all the field",
      });
    }

    const existinguser = await userModel.find({ email });

    if (existinguser) {
    }
  } catch (error) {}
};
