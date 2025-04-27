import axios from "axios";

export async function getUser(userId: string) {
  try {
    const resp = await axios.get(`http://localhost:3030/api/users/${userId}`);
    if (resp.status === 200) {
      return resp.data;
    } else {
      return 404;
    }
  } catch (error) {
    console.log(error);
    return 404;
  }
}
