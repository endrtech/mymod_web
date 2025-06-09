import axios from "axios";

export const setAppInfo = async (body: any) => {
  const response = await axios.post(
    `http://localhost:3030/api/app_info`,
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
