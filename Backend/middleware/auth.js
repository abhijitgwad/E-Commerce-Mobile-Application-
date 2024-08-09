export const isAuth = async (req, res, next) => {
  const { accessToken } = req.fields;
  // const accessToken =
  //   "AQUnVuDBXBm0O3s0NT7aTHJIuJr9XLmjL7_q5B1Y7_EJo0C9DNKhte38AxzbFl3CZ8Z9VPrPhQ-uLTA8llqTmt-c-huoZDeeW7yapk0hpWKrSMPsejM31YZdd4La97BW-6zwMwUdTu_9GUeyHEVH87YBW88AvpbjewMgN04aWdTeFOsMQzgol8Ohek2QgOKqK2Qq8exDTHuJbIa9d1pgXVTxVe2BruSQc1oOYhOcijkcFec9RhkJweEI6wWGY75l_aJ1Oe8sdtC1I7qLCEHsG-yuFsYh738fFnUn8XP89h_rueL1LptEARNDhu3hIf4KPI0MrCV6K5yve88lsyrOajJkDjhZEg";

  console.log(accessToken);
  const userProfileResponse = await fetch(
    "https://api.linkedin.com/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const userProfileData = await userProfileResponse.json();
  console.log("user profile data : ", userProfileData);

  if (!userProfileData.email_verified) {
    res.status(500).send({
      success: false,
      message: "auth problem",
    });
  } else {
    req.useremail = userProfileData.email;
    next();
  }

  // res.json(userProfileData);
};
