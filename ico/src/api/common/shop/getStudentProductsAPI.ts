import { tokenInstance } from "@/api/instance"
import { getStudentProductsType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getStudentProductsType[]
}

export const getStudentProductsAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/student-product`)
		return response.data
	} catch (error) {
		throw error
	}
}
