import axios from "axios";

export const setAppInfo = async (body: any) => {
  const response = await axios.post(
    `https://api.mymod.com.au/api/app_info`,
    {
      version: body.version,
      previousBuild: body.previousBuild,
      currentBuild: body.currentBuild,
      changelog: body.changelog,
    },
  );

  if (response.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
