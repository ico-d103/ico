import { defaultInstance } from "@/api/instance"
import { getGovRuleType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getGovRuleType[]
}

export const getGovRuleAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.get(`/rule`)
        return response.data
    } catch (error) {
        throw error
        console.log(error)
    }
}

