import { tokenInstance } from "@/api/instance"
import { getTokenStatusType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getTokenStatusType
}

export const getTokenStatusAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/status")

		return response.data
	} catch (error) {
		throw error
	}
}
