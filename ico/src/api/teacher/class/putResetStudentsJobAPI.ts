import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: successReturnType
}

export const putResetStudentsJobAPI = async () => {
	try {
		const response: responseType = await tokenInstance.put(`/job/teacher/reset`)

		return response.data
	} catch (error) {
		throw error
	}
}
