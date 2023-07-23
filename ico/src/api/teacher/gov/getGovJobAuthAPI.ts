

import { tokenInstance } from "@/api/instance"
import { getGovJobAuthType } from "@/types/teacher/apiReturnTypes"

type paramsType = {}

type responseType = {
	status: number
	data: getGovJobAuthType[]
}

export const getGovJobAuthAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/power/teacher`)
		return response.data
	} catch (error) {
		throw error
	}
}
