import { tokenInstance } from "@/api/instance"
import { investItemType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	id: number
}

type responseType = {
	status: number
	data: investItemType
}

export const getInvestItemAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/issue/teacher/${id}`)
		return response.data
	} catch (error) {
		throw error
	}
}
