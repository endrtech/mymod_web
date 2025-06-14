"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { v4 } from "uuid";

export const createCase = async (body: any) => {
  const sessionToken = (await cookies()).get("__session");
  console.log(body);
  const resp = await axios.post(
    `http://localhost:3030/api/cases/new`,
    body,
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  if (resp.status === 201) {
    return 200;
  } else {
    return 400;
  }
};
