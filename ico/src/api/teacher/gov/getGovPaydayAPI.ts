import { tokenInstance } from "@/api/instance"
import { getGovPaydayType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getGovPaydayType
}

export const getGovPaydayAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/nation/teacher/payday`)
		console.log("power", response.data)
		return response.data
	} catch (error) {
		throw error
	}
}
