import { formDataTokenInstance, tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: number
	body: {
		title: string
		amount: number
		detail: string
		count: number
		isCoupon: boolean
	}
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const putTeacherProductsAPI = async ({ id, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/teacher-product/${id}`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
