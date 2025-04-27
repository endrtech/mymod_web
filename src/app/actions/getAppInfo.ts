import axios from "axios"

export const getAppInfo = async () => {
    const response = await axios.get(`https://api.mymod.endr.tech/api/app_info`);

    if(response.status === 200) {
        return {
            version: response.data.version,
            previousBuild: response.data.previousBuild,
            currentBuild: response.data.currentBuild,
            changelog: response.data.changelog,
        };
    } else {
        return {
            version: null,
            previousBuild: null,
            currentBuild: null,
        };
    }
}
