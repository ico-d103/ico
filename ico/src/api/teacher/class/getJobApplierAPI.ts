import { tokenInstance } from "@/api/instance"
import { getJobApplierType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	id: number
}

type responseType = {
	status: number
	data: getJobApplierType[]
}

export const getJobApplierAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/resume/teacher/${id}`)

		return response.data
	} catch (error) {
		throw error
	}
}
