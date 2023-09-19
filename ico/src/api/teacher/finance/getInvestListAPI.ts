import { tokenInstance } from "@/api/instance"
import { investListType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: investListType[]
}

export const getInvestListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/stock")

		return response.data
	} catch (error) {
		throw error
	}
}
