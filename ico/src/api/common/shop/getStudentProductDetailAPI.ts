import { tokenInstance } from "@/api/instance"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	body: {
		pid: string
	}
}

type responseType = {
	status: number
	data: getTeacherProductDetailType
}

export const getTeacherProductDetailAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/student-product/${body.pid}`)
		return response.data
	} catch (error) {
		throw error
	}
}
