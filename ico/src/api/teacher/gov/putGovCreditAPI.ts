import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    body: {
        creditUp: number
        creditDown: number
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovCreditAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/nation/teacher/credit`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

