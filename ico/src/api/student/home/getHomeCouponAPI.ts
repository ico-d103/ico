import { defaultInstance } from "@/api/instance"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"

type paramsType = {
}

type responseType = {
    status: number
    data: getHomeCouponType[]
}

export const getHomeCouponAPI = async ({}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.get(`/coupon/student`)
        return response.data
    } catch (error) {
        throw error
    }
}

