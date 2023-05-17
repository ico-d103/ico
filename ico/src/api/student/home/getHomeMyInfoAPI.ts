import { defaultInstance, tokenInstance } from "@/api/instance"
import { getHomeMyInfoType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getHomeMyInfoType
}

export const getHomeMyInfoAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/student/student/my-page`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

