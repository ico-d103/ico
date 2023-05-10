import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    idx: number;
}

type responseType = {
    status: number
    data: successReturnType
}

export const deleteGovJobAPI = async ({idx}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.delete(`/job/teacher/${idx}`)
        return response.data
    } catch (error) {
        throw error
    }
}


