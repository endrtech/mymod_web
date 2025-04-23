import axios from "axios";
import { v4 } from "uuid";

export const editCase = async (caseId:any, body: any) => {
    console.log(body);
    const resp = await axios.put(
        `http://localhost:3030/api/cases/${caseId}`,
        body,
    );

    if (resp.status === 200) {
        return 200;
    } else {
        return 400;
    }
}