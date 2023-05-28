import { tokenInstance } from "@/api/instance"
import { getGovEconomyType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getGovEconomyType[]
}

export const getGovEconomyAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/inflation/teacher`)
        return response.data
    } catch (error) {
        throw error
        console.log(error)
    }
}

