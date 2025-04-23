import axios from "axios";

export async function completeCase (caseId: string) {
    const resp = await axios.get(
        `https://api.mymod.endr.tech/api/cases/complete-case/${caseId}`,
    );

    if (resp.status === 200) {
        return 200;
    } else {
        return 400;
    }
};