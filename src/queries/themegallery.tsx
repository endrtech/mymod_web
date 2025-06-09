import {queryOptions} from "@tanstack/react-query";
import {getThemes} from "@/app/actions/getThemes";

export const getAllThemes = () => {
    return queryOptions({
      queryKey: ['get_themes'],
      queryFn: async () => {
          return await getThemes();
      }
    })
}