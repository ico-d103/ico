import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    body: {
        title: string
        detail: string
        total: number
        wage: number
        color: string
        creditRating: number
        image: string
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const postGovJobAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.post(`/job/teacher`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

