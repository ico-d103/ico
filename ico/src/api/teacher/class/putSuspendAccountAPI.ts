import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const putSuspendAccountAPI = async ({ studentId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/student/teacher/${studentId}/suspend-account`)

		return response.data
	} catch (error) {
		throw error
	}
}
