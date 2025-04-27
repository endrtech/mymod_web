import axios from "axios";
import { v4 } from "uuid";

export const createCase = async (body: any) => {
  console.log(body);
  const resp = await axios.post(
    `https://api.mymod.endr.tech/api/cases/new`,
    body,
  );

  if (resp.status === 201) {
    return 200;
  } else {
    return 400;
  }
};
