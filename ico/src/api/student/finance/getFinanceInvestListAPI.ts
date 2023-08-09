import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestListType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceInvestListType
}

export const getFinanceInvestListAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/stock/student`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

