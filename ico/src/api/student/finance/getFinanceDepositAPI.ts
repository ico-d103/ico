import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceDepositType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceDepositType
}

export const getFinanceDepositAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/deposit-product/student`)
        return response.data
    } catch (error) {
        throw error
    }
}

