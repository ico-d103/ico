import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestDetailType } from "@/types/student/apiReturnTypes"

type paramsType = {
    id: number
}

type responseType = {
    status: number
    data: getFinanceInvestDetailType
}

export const getFinanceInvestListItemAPI = async ({id}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/issue/student/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

