import { tokenInstance } from "@/api/instance"
import { getStudentProductDetailType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	pid: string
}

type responseType = {
	status: number
	data: getStudentProductDetailType
}

export const getStudentProductDetailAPI = async ({ pid }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/student-product/${pid}`)
		return response.data
	} catch (error) {
		throw error
	}
}
