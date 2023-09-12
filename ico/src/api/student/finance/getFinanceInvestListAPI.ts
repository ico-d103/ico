import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestListStockItemType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceInvestListStockItemType[]
}

export const getFinanceInvestListAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/stock`)
        return response.data
    } catch (error) {
        throw error
    }
}

