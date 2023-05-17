import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
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

export const postGovExchequerAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.post(`/tax/teacher`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

