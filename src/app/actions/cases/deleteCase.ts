import axios from "axios";

export const deleteCase = async (caseId: any) => {
    const resp = await axios.delete(
        `http://localhost:3030/api/cases/${caseId}`,
    );

    if (resp.status === 200) {
        return 200;
    } else {
        return 400;
    }
}