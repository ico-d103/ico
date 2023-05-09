import { defaultInstance } from "@/api/instance"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getGovJobType[]
}

export const getGovJobAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.get(`/job`)
        return response.data
    } catch (error) {
        throw error
        console.log(error)
    }
}

