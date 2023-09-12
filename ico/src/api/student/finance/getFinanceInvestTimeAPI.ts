import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestTimeType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceInvestTimeType
}

export const getFinanceInvestTimeAPI = async () => {
    try {
        const response: responseType = await tokenInstance.get(`/stock/time`)
        return response.data
    } catch (error) {
        throw error
    }
}