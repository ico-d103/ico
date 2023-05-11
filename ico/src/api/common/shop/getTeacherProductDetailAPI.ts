import { tokenInstance } from "@/api/instance"
import { getTeacherProductsType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getTeacherProductsType[]
}

export const getTeacherProductsAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/teacher-product`)
		return response.data
	} catch (error) {
		throw error
	}
}
