import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceType
}

export const getFinanceDepositAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/deposit-product/student`)
        console.log('예금 리스트 : ', response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

