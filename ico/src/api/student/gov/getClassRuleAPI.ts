import { tokenInstance } from "@/api/instance"
import { getGovRuleType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getGovRuleType[]
}

export const getClassRuleAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/news")

		return response.data
	} catch (error) {
		throw error
	}
}
