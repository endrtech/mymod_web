import axios from "axios";

export async function rollbackCase (caseId: string) {
    const resp = await axios.get(
        `https://api.mymod.endr.tech/api/cases/rollback-case/${caseId}`,
    );

    if (resp.status === 200) {
        return 200;
    } else {
        return 400;
    }
};