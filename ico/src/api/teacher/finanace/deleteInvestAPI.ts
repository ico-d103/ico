import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: successReturnType
}

export const deleteInvestAPI = async () => {
	try {
		const response: responseType = await tokenInstance.delete("/stock/teacher")

		return response.data
	} catch (error) {
		throw error
	}
}
