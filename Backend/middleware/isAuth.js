export const isAuth = async (req, res, next) => {
  const { accessToken } = req.body;
  const userProfileResponse = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userProfileData = await userProfileResponse.json();
  res.json(userProfileData);
  console.log(first);
};
