import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceInvestType
}

export const getFinanceInvestAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/stock/student`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

