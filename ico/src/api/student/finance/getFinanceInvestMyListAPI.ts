import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestListMyItemType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceInvestListMyItemType[]
}

export const getFinanceInvestMyListAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/stock/student`)
        return response.data
    } catch (error) {
        throw error
    }
}

