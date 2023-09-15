import { tokenInstance } from "@/api/instance"
import { getTokenStatusType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getTokenStatusType
}

export const getTokenStatusAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/status")
		console.log("토큰 상태", response.data)
		return response.data
	} catch (error) {
		throw error
	}
}
