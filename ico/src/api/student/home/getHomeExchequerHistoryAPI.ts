import { defaultInstance, tokenInstance } from "@/api/instance"
import { getHomeExchequerHistoryType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getHomeExchequerHistoryType
}

export const getHomeExchequerHistoryAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/treasury-history/student`)
        return response.data
    } catch (error) {
        throw error
    }
}

