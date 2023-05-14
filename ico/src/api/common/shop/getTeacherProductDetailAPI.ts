import { tokenInstance } from "@/api/instance"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	pid: string
}

type responseType = {
	status: number
	data: getTeacherProductDetailType[]
}

export const getTeacherProductDetailAPI = async ({ pid }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/teacher-product/${pid}`)
		return response.data

	} catch (error) {
		throw error
	}
}
