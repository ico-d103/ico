import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"
import {} from "@/types/teacher/apiReturnTypes"

type paramsType = {
	id: number
}

type responseType = {
	status: number
	data: successReturnType // 임시
}

export const getJobApplierAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/resume/teacher/${id}`)

		return response.data
	} catch (error) {
		throw error
	}
}
