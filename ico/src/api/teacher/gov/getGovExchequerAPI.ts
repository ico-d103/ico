import { tokenInstance } from "@/api/instance"
import { getGovExchequerType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getGovExchequerType[]
}

export const getGovExchequerAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/tax`)
        return response.data
    } catch (error) {
        throw error
        console.log(error)
    }
}

