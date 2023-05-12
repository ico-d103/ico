import { tokenInstance } from "@/api/instance"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getGovJobType[]
}

export const getGovJobAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/job`)
		return response.data
	} catch (error) {
		throw error
	}
}
