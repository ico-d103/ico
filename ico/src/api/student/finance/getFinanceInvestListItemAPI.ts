import { defaultInstance, tokenInstance } from "@/api/instance"
import { getFinanceInvestType } from "@/types/student/apiReturnTypes"

type paramsType = {
    id: number
}

type responseType = {
    status: number
    data: getFinanceInvestType
}

export const getFinanceInvestListItemAPI = async ({id}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/issue/student/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

