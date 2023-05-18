import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    idx: number;
    body: {
        image: string
        title: string
        detail: string
        total: number
        wage: number
        color: string
        creditRating: number
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovJobAPI = async ({idx, body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/job/teacher/${idx}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

