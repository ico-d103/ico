import { tokenInstance } from "@/api/instance"
import { getTreasuryHistoryType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	page: number
}

type responseType = {
	status: number
	data: getTreasuryHistoryType[]
}

export const getTreasuryHistoryAPI = async ({ page }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/treasury-history/teacher?page=${page}`)

		return response.data
	} catch (error) {
		throw error
	}
}
