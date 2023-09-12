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
        return response.data
    } catch (error:any) {
        if (error.response.data.code === '25') {
            return {
                school: '',
                room: 0,
                number: 0,
                name: '',
                account: 0,
                creditRating: 0,
                jobImage: '',
                jobName: '',
                color: '',
                deposit: 0,
                invest: 0
            }
        } else {
            throw error
        }
    }
}

