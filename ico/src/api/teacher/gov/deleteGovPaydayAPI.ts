import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	day: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteGovPaydayAPI = async ({ day }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/nation/teacher/payday/${day}`)
		return response.data
	} catch (error) {
		throw error
	}
}
