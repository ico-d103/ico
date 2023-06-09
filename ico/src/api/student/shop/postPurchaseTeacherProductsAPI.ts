import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	pid: string
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postPurchaseTeacherProductsAPI = async ({ pid }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/teacher-product/student/${pid}`)
		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
}
