import { defaultInstance, tokenInstance } from "@/api/instance"
import { myDepositType, mySavingType } from "@/types/student/apiReturnTypes"

type paramsType = {
    id: string
}

type responseType = {
    status: number
    data: mySavingType
}

export const getFinanceSavingsDetailAPI = async ({id}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/saving-product/student/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

