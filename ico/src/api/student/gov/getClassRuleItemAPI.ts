import { tokenInstance } from "@/api/instance"
import { getGovRuleType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
  id: string
}

type responseType = {
	status: number
	data: getGovRuleType
}

export const getClassRuleItemAPI = async ({id}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/news/${id}`)

		return response.data
	} catch (error) {
		throw error
	}
}
