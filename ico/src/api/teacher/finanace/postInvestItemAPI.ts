import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const postInvestItemAPI = async () => {
	try {
		const response: responseType = await tokenInstance.post("/nation/teacher/stock")
		return response.data
	} catch (error) {
		throw error
	}
}
