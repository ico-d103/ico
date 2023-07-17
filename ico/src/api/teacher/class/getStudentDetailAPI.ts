import { tokenInstance } from "@/api/instance"
import { getStudentDetailType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	id: number
	page: number
}

type responseType = {
	status: number
	data: getStudentDetailType
}

export const getStudentDetailAPI = async ({ id, page }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/student/teacher/${id}?page=${page}`)

		return response.data
	} catch (error) {
		throw error
	}
}
