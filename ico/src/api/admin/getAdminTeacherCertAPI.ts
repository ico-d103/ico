import { defaultInstance, tokenInstance } from "@/api/instance"
import { getAdminTeacherCertReturnType } from "@/types/admin/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getAdminTeacherCertReturnType
}

export const getAdminTeacherCertAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.get(`/certification/admin`)
        return response.data.content
    } catch (error) {
        throw error
    }
}

