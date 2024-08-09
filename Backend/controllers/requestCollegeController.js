import requestCollegeModel from "../models/requestCollegeModel.js";

export const requestCollegeController = async (req, res) => {
  const { useremail, name, state } = req.body;
  console.log(req.body);
  try {
    const userExist = await requestCollegeModel.findOne({ useremail });
    if (userExist) {
      res.status(500).send({
        success: false,
        message: "Your request is already in DB please wait for few hours!!",
      });
    }

    const newRequest = await new requestCollegeModel({
      useremail,
      name,
      state,
    }).save();

    res.status(500).send({
      success: true,
      message:
        "Successfully registered your request, Please wait for few hour!!",
      //   newRequest,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while adding request!!",
      error,
    });
  }
};
