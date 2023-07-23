import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: string
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteTreasuryHistoryAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/treasury-history/teacher/delete/${id}`)

		return response.data
	} catch (error) {
		throw error
	}
}
