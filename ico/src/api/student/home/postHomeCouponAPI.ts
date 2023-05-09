import { defaultInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    idx: number
}

type responseType = {
    status: number
    data: successReturnType
}

export const postHomeCouponAPI = async ({idx}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.post(`/coupon/student/${idx}`)
        return response.data
    } catch (error) {
        throw error
    }
}

