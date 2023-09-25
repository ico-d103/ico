import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceDepositType, getFinanceSavingType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getFinanceSavingType
}

export const getFinanceSavingsAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/saving-product/student`)
        console.log('예금 리스트 : ', response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

