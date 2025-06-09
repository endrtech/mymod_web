import {queryOptions} from "@tanstack/react-query";
import {getActiveCases} from "@/app/actions/cases/getActiveCases";
import {getCaseData} from "@/app/actions/cases/getCaseData";

export const getCases = (id: string) => {
    return queryOptions({
        queryKey: ['get_cases', id],
        queryFn: async () => {
            return await getActiveCases(id);
        }
    })
}

export const getCaseById = (id: string) => {
    return queryOptions({
        queryKey: ["get_case", id],
        queryFn: async () => {
            return await getCaseData(id);
        }
    })
}