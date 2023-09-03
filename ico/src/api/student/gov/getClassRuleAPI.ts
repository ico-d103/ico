import { tokenInstance } from "@/api/instance"
import { getClassRuleType } from "@/types/student/apiReturnTypes"

type responseType = {
	status: number
	data: getClassRuleType[]
}

export const getClassRuleAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/news")

		return response.data
	} catch (error) {
		throw error
	}
}
