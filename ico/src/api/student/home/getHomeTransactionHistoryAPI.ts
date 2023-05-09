import { defaultInstance } from "@/api/instance"
import { getHomeTransactionHistoryType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getHomeTransactionHistoryType
}

export const getHomeTransactionHistoryAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.get(`/transaction/student`)
        return response.data
    } catch (error) {
        throw error
    }
}

