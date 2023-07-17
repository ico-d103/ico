import { tokenInstance } from "@/api/instance"
import { getLicenseType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getLicenseType[]
}

export const getLicenseAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/license/teacher`)
		return response.data
	} catch (error) {
		throw error
		console.log(error)
	}
}
