import { defaultInstance, tokenInstance } from "@/api/instance"
import { myInfoTypeForDeposit } from "@/types/student/apiReturnTypes"

type paramsType = {
    id: string
}

type responseType = {
    status: number
    data: myInfoTypeForDeposit
}

export const getFinanceDepositDetailAPI = async ({id}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/deposit-product/student/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

