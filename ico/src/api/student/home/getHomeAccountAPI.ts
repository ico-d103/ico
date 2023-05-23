import { defaultInstance, tokenInstance } from "@/api/instance"
import { getHomeAccountType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getHomeAccountType
}

export const getHomeAccountAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/student/account`)
        return response.data
    } catch (error) {
        throw error
    }
}

