import { tokenInstance } from "@/api/instance"
import { investItemType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: investItemType
}

export const getInvestTimeAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/stock/time")
		return response.data
	} catch (error) {
		throw error
	}
}
