import { tokenInstance } from "@/api/instance"
import { getNationTreasuryType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getNationTreasuryType
}

export const getNationTreasuryAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/nation/treasury")

		return response.data
	} catch (error) {
		throw error
	}
}
