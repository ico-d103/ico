import { tokenInstance } from "@/api/instance"
import { interstType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: interstType
}

export const getDepositInterestListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/interest")

		return response.data
	} catch (error) {
		throw error
	}
}
