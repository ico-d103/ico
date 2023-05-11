import { tokenInstance } from "@/api/instance"
import { getCouponListType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getCouponListType[]
}

export const getCouponListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/coupon-request/teacher")

		return response.data
	} catch (error) {
		throw error
	}
}
