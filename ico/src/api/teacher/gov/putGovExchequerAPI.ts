import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    idx: number
    body: {
        title: string
        detail: string
        amount: number
        type: number
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovExchequerAPI = async ({idx, body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/tax/teacher/${idx}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

