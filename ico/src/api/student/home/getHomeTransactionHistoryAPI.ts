import { defaultInstance, tokenInstance } from "@/api/instance"
import { getHomeTransactionHistoryType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getHomeTransactionHistoryType
}

export const getHomeTransactionHistoryAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/transaction/student`)
        return response.data
    } catch (error) {
        throw error
    }
}

