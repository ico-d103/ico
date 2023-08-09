import { tokenInstance } from "@/api/instance"
import { getGovPowerType, getGovJobType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getGovPowerType[]
}

export const getGovPowerAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/power/teacher`)
		console.log("power", response.data)
		return response.data
	} catch (error) {
		throw error
	}
}
